import "dotenv/config";
import {
	OpenAIStream,
	StreamData,
	StreamingTextResponse,
	type Tool,
	type ToolCallPayload,
} from "ai";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import Keyv = require("keyv");
import OpenAI from "openai";
const keyv = new Keyv();
const app = new Hono();
app.use(cors());
app.use(logger());

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

app.get(
  '*',
  serveStatic({
    root: './webdist',
    rewriteRequestPath: (path) => path.replace(/^(?!.*\/assets\/)(?!.*\.png$).*/, '/index.html'),
  })
)
app.post("/api/chat", async (c) => {
	const { messages } = await c.req.json();

	const response = await openai.chat.completions.create({
		model: "gpt-3.5-turbo-0613",
		stream: true,
		messages,
		tools,
		tool_choice: "auto",
	});

	const data = new StreamData();

	const stream = OpenAIStream(response, {
		experimental_onToolCall: async (
			call: ToolCallPayload,
			appendToolCallMessage,
		) => {
			for (const toolCall of call.tools) {
				if (toolCall.func.name === "getRecommendations") {
					const newMessage = appendToolCallMessage({
						tool_call_id: toolCall.id,
						function_name: "getRecommendations",
						tool_call_result: {
							recommendations: await keyv.get(
								`${c.req.header("client-id")}:recommendation`,
							),
						},
					});

					return openai.chat.completions.create({
						messages: [...messages, ...newMessage],
						model: "gpt-3.5-turbo",
						stream: true,
						tools,
						tool_choice: "auto",
					});
				}
			}
		},
		onCompletion(completion) {
			console.log(completion);
		},
		onFinal() {
			data.close();
		},
	});

	return new StreamingTextResponse(stream, {}, data);
});

app.post("/api/recommendations", async (c) => {
	const recommendation = await c.req.json();
	// get client id from header
	const clientId = c.req.header("client-id");
	console.log(clientId);
	// set recommendation in keyv
	await keyv.set(`${clientId}:recommendation`, recommendation, 60 * 60 * 1000);
	return c.json(recommendation);
});

serve(app);

const systemMessage = `
Eres un asistente que recomienda motocicletas dependiendo de ciertos parametros como el presupuesto, la preferencia de marcas y el estilo de moto que mas le guste al cliente, no respondas preguntas que no tengan que ver con tu trabajo o seras despedido, usa solo las motos que te da la funcion que se te provee (nota: los precios son en COP ya que los usuarios son colombianos)
formatea tu respuesta como texto plano, no con markdown, cada 75 caracteres inserta un salto de línea
las preguntas que te hagan respondelas sobre las recomendaciones que se te han dado, no respondas a las que no te han dado
`;

const tools: Tool[] = [
	{
		type: "function",
		function: {
			name: "getRecommendations",
			description: "Get the recommendations for that user",
			parameters: {
				type: "object",
				properties: {},
			},
		},
	},
];
