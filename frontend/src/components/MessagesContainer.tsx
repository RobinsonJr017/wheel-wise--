import {
	ActionIcon,
	Affix,
	Card,
	Center,
	Code,
	Flex,
	Group,
	ScrollArea,
	Stack,
	Text,
} from "@mantine/core";
import type { Message } from "ai/react";
import { useEffect, useRef } from "react";
import classes from "./MessagesContainer.module.css";
import { IconArrowDown } from "@tabler/icons-react";
import {} from "@mdx-js/react";
function MessagesContainer({ messages }: { messages: Message[] }) {
	const viewport = useRef<HTMLDivElement>(null);
	const scrollToBottom = () => {
		viewport.current?.scrollTo({
			top: viewport.current?.scrollHeight,
			behavior: "smooth",
		});
	};
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		scrollToBottom();
		console.log("scrolled to bottom");
	}, [messages]);

	return (
		<Stack mx={"xl"} mt={"xl"}>
				<Flex direction={"column"} mah={"80dvh"} pb={"lg"}>
					<Flex
						className={classes.scrollbar}
						ref={viewport}
						direction={"column"}
						style={{
							overflowY: "auto",
						}}
					>
						{messages.length === 0 && (
							<Center h={"100dvh"}>
								<Text ff={"Inter"} size="3rem" fw={700}>
									Wheel Wise
								</Text>
							</Center>
						)}

						{messages.length > 0 &&
							messages.map((m) => (
								<Group
									wrap="wrap"
									key={m.id}
									grow
									justify={m.role === "user" ? "right" : "left"}
									ml={m.role === "user" ? "xl" : ""}
									mr={m.role === "user" ? "" : "xl"}
								>
									<Card
										bg={m.role === "user" ? "#84a59d" : "#f6bd60"}
										withBorder
										p={"xs"}
										maw={"50%"}
										key={m.id}
										className={
											m.role === "user"
												? classes.mensaje_enviado
												: classes.mensaje_recibido
										}
									>
										{/* {m.role === "user" ? "User: " : "AI: "} */}
										<ScrollArea w={"100%"}>
											<Code
												c={"dark"}
												fz={"md"}
												bg={m.role === "user" ? "#84a59d" : "#f6bd60"}
												block
												ff={"Inter"}
												fw={600}
											>
												{m.content}
											</Code>
										</ScrollArea>
									</Card>
								</Group>
							))}
					</Flex>
				</Flex>
			<Affix position={{ bottom: 70, right: 20 }}>
				<ActionIcon radius={"xl"} size={"lg"} onClick={scrollToBottom}>
					<IconArrowDown />
				</ActionIcon>
			</Affix>
		</Stack>
	);
}

export default MessagesContainer;
