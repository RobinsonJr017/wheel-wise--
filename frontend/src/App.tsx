import { AppShell } from "@mantine/core";
import { useChat } from "ai/react";
import Footer from "./components/Footer";
import { HeaderMenu } from "./components/HeaderMenu";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { clientID } from "./state/clientid";
import { useEffect } from "react";
import { nanoid } from "nanoid";

function App() {
	const [clientId, setClientID] = useAtom(clientID);
	const location = useLocation();
	const navigate = useNavigate();
	useEffect(() => {
		setClientID(localStorage.getItem("clientID") ?? "");
	});

	useEffect(() => {
		window.supabase.auth.getUser().then((user) => {
			if (!user.data.user) {
				navigate("/auth");
			}
		});
		window.supabase.auth.onAuthStateChange((event) => {
			if (event === "SIGNED_OUT") {
				navigate("/auth");
			}
		});
	}, [navigate]);

	const { input, handleInputChange, handleSubmit, messages } = useChat({
		headers: {
			"client-id": clientId,
		},
		api: "http://localhost:3000/api/chat",
		initialMessages: [
			{
				role: "assistant",
				content: `¡Hola! Estoy aquí para ayudarte a encontrar la motocicleta perfecta para ti.
Puedes solicitar ya tus recomendaciones personalizadas basadas en tus necesidades y preferencias.
Para acceder a tus recomendaciones puedes hacer la siguiente pregunta:
¿Hola, podrías darme las recomendaciones?
Y si tienes alguna duda sobre las recomendaciones puedes hacerme preguntas así:
De esas recomendaciones, ¿qué motocicleta sería la mejor opción para viajar?
Si tienes alguna otra pregunta sobre motocicletas o cualquier otro tema relacionado, no dudes en preguntar.
Estoy aquí para ayudarte y si deseas ver las recomendaciones guardadas puedes dar clic en el botón que
se encuentra en la barra de navegación que dice: Mi cuenta.`,
				id: nanoid(),
			},
		],
	});

	return (
		<AppShell
			header={{
				height: 56,
			}}
		>
			<AppShell.Header>
				<HeaderMenu />
			</AppShell.Header>
			<AppShell.Main>
				<Outlet
					context={{ input, handleInputChange, handleSubmit, messages }}
				/>
			</AppShell.Main>
			<AppShell.Footer>
				{location.pathname === "/" && (
					<Footer
						input={input}
						handleInputChange={handleInputChange}
						handleSubmit={handleSubmit}
					/>
				)}
			</AppShell.Footer>
		</AppShell>
	);
}

export default App;
