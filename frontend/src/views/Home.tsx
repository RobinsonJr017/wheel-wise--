import { useOutletContext } from "react-router-dom";
import MessagesContainer from "../components/MessagesContainer";
import {
	ActionIcon,
	Affix,
	Button,
	Card,
	Divider,
	Drawer,
	Group,
	Image,
	Modal,
	NumberFormatter,
	RangeSlider,
	ScrollArea,
	Stack,
	Text,
	ThemeIcon,
} from "@mantine/core";
import classes from "./Home.module.css";
import { Carousel } from "@mantine/carousel";
import { useEffect, useState } from "react";
import gs from "../assets/gs.png";
import husq from "../assets/husq.png";
import nmax from "../assets/nmax.png";
import superleg from "../assets/super.png";
import xblade from "../assets/xblade.png";
import {
	IconCalendarTime,
	IconCash,
	IconCheck,
	IconCoin,
	IconEngine,
	IconManualGearbox,
	IconMenu2,
	IconTrademark,
} from "@tabler/icons-react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useDisclosure } from "@mantine/hooks";
import { useAtom, useAtomValue } from "jotai";
import { recommendations as recAtom } from "../state/recommendations";
import { clientID } from "../state/clientid";
import { nanoid } from "nanoid";
import type { Moto } from "../types";

function Home() {
	const [startQuestions, { close }] = useDisclosure(true);
	const [drawerOpen, { toggle: toggleDrawer }] = useDisclosure(false);
	// @ts-ignore
	const { messages, error } = useOutletContext();
	const clientId = useAtomValue(clientID);
	const [selectedMotoType, setSelectedMotoType] = useState<string>("");
	// const [selectedMaker, setSelectedMaker] = 	useState<string[]>([]);
	const [value, setValue] = useState<[number, number]>([
		4_000_000, 120_000_000,
	]);
	const [recommendations, setRecommendations] = useAtom<Moto[]>(recAtom);

	useEffect(() => {
		if (startQuestions) return;
		window.supabase
			.from("motos")
			.select("*")
			.eq("estilo", selectedMotoType)
			.lt("precio_moto", value[1])
			.gt("precio_moto", value[0])
			.order("precio_moto")
			.limit(6)
			.then((res) => {
				console.log(res);
				setRecommendations(res.data ?? []);
				localStorage.setItem(
					"recommendations",
					JSON.stringify(
						(
							JSON.parse(
								localStorage.getItem("recommendations") ?? "[]",
							) as unknown[]
						).concat({
							id: nanoid(),
							recommendations: res.data ?? [],
							presupuesto_max: value[1],
							presupuesto_min: value[0],
							estilo: selectedMotoType,
						}),
					),
				);
				fetch("http://localhost:3000/api/recommendations", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"client-id": clientId,
					},
					body: JSON.stringify(res.data ?? []),
				});
			});
	}, [startQuestions, selectedMotoType, value, setRecommendations, clientId]);

	useEffect(() => {
		console.log(messages);
	}, [messages]);

	return (
		<>
			<Modal
				opened={startQuestions}
				onClose={() => {}}
				centered
				withCloseButton={false}
				size={"xl"}
			>
				<Carousel
					height="100%"
					style={{ flex: 1 }}
					dragFree={false}
					draggable={false}
					classNames={classes}
				>
					<Carousel.Slide>{FirstQuestion(value, setValue)}</Carousel.Slide>
					<Carousel.Slide>
						{SecondQuestion(setSelectedMotoType, selectedMotoType, close)}
					</Carousel.Slide>
				</Carousel>
			</Modal>
			<Drawer opened={drawerOpen} onClose={toggleDrawer}>
				{recommendations.length > 0 &&
					recommendations.map((recommendation: Recommendation) => {
						return (
							<Stack pb={"3rem"} key={recommendation.id}>
								<Card key={recommendation.id} withBorder shadow="md" p="md">
									<img
										src={`/${recommendation.id}.png`}
										alt={"moto"}
										style={{ width: "100%", height: "100%" }}
									/>
									<Text size="md" ff={"Inter"} fw={600} ta={"center"}>
										{recommendation.nombre}
									</Text>
									<Card.Section>
										<Divider size={"md"} />
										<Group grow ml={"md"} mt={"sm"} pb={"sm"}>
											<Group justify="left">
												<Stack justify="left">
													<Group>
														<ThemeIcon variant="light">
															<IconTrademark size={"1.5rem"} />
														</ThemeIcon>
														<Text size="sm" ff={"Inter"} fw={600} ta={"left"}>
															Marca:{" "}
															<Text
																span
																size="sm"
																ff={"Inter"}
																fw={600}
																ta={"left"}
															>
																{recommendation.marca}
															</Text>
														</Text>
													</Group>
													<Group>
														<ThemeIcon variant="light">
															<IconCash size={"1.5rem"} />
														</ThemeIcon>
														<Text size="sm" ff={"Inter"} fw={600} ta={"left"}>
															Precio:{" "}
															<NumberFormatter
																prefix="$"
																thousandSeparator
																value={recommendation.precio_moto}
															/>
														</Text>
													</Group>
													<Group>
														<ThemeIcon variant="light">
															<IconCoin size={"1.5rem"} />
														</ThemeIcon>
														<Text size="sm" ff={"Inter"} fw={600} ta={"left"}>
															Precio Papeles:{" "}
															<NumberFormatter
																prefix="$"
																thousandSeparator
																value={recommendation.precio_papeles}
															/>
														</Text>
													</Group>
													<Group>
														<ThemeIcon variant="light">
															<IconCalendarTime size={"1.5rem"} />
														</ThemeIcon>
														<Text size="sm" ff={"Inter"} fw={600} ta={"left"}>
															Modelo: {recommendation.modelo}
														</Text>
													</Group>
													<Group>
														<ThemeIcon variant="light">
															<IconEngine size={"1.5rem"} />
														</ThemeIcon>
														<Text size="sm" ff={"Inter"} fw={600} ta={"left"}>
															Cilindraje:{" "}
															<NumberFormatter
																thousandSeparator
																value={recommendation.cilindraje}
															/>{" "}
															cc
														</Text>
													</Group>
													<Group>
														<ThemeIcon variant="light">
															<IconManualGearbox size={"1.5rem"} />
														</ThemeIcon>
														<Text size="sm" ff={"Inter"} fw={600} ta={"left"}>
															Torque:{" "}
															<NumberFormatter
																thousandSeparator
																value={recommendation.torque_maximo_nm}
															/>{" "}
															nm
															{" - "}
															<NumberFormatter
																thousandSeparator
																value={recommendation.torque_maximo_rpm}
															/>{" "}
															rpm
														</Text>
													</Group>
												</Stack>
											</Group>
										</Group>
									</Card.Section>
								</Card>
							</Stack>
						);
					})}
			</Drawer>
			{!startQuestions && (
				<Affix position={{ bottom: 500, right: 10 }}>
					<ActionIcon onClick={toggleDrawer} size={"lg"} color="gray">
						<IconMenu2 size={"1.5rem"} />
					</ActionIcon>
				</Affix>
			)}
			{!startQuestions && <MessagesContainer messages={messages} />}
			<Text>{error?.message}</Text>
		</>
	);
}

export default Home;
function SecondQuestion(
	setSelectedMotoType: any,
	selectedMotoType: string,
	close: unknown,
) {
	return (
		<Stack justify="center" h={"100%"}>
			<Card withBorder h={"80dvh"}>
				<Text ta={"center"} fw={600} size="2.5rem" ff={"Inter"} mb={"2.5rem"}>
					¿Te gusta un estilo en especifico?
				</Text>
				<ScrollArea>
					<Stack>
						<MotoTypeCard
							motoType="Adventure"
							image={gs}
							onClick={() => setSelectedMotoType("Adventure")}
							selected={selectedMotoType === "Adventure"}
						/>
						<MotoTypeCard
							motoType="Deportivas"
							image={superleg}
							onClick={() => setSelectedMotoType("Deportivas")}
							selected={selectedMotoType === "Deportivas"}
						/>
						<MotoTypeCard
							motoType="Todo terreno"
							image={husq}
							onClick={() => setSelectedMotoType("Todo terreno")}
							selected={selectedMotoType === "Todo terreno"}
						/>
						<MotoTypeCard
							motoType="Urbanas y trabajo"
							image={xblade}
							onClick={() => setSelectedMotoType("Urbanas y trabajo")}
							selected={selectedMotoType === "Urbanas y trabajo"}
						/>
						<MotoTypeCard
							motoType="Auto y semiautomáticas"
							image={nmax}
							onClick={() => setSelectedMotoType("Auto y semiautomáticas")}
							selected={selectedMotoType === "Auto y semiautomáticas"}
						/>
					</Stack>
					<Button
						onClick={close as unknown}
						disabled={!selectedMotoType}
						w={"100%"}
						mt={"xl"}
					>
						<Text>Continuar</Text>
					</Button>
				</ScrollArea>
			</Card>
		</Stack>
	);
}

function MotoTypeCard({
	motoType,
	image,
	onClick,
	selected,
}: {
	motoType: string;
	onClick?: () => void;
	image: string;
	selected: boolean;
}) {
	const [animationParent] = useAutoAnimate();

	return (
		<Card withBorder onClick={onClick}>
			<Group justify="space-between" grow>
				<Group grow justify="right">
					<Image
						src={image}
						alt="gs"
						width={"90rem"}
						height={"70rem"}
						fit="contain"
					/>
				</Group>
				<Group grow>
					<Text ta={"left"} ff={"Inter"} fw={800} size="2rem">
						{motoType}
					</Text>
				</Group>
			</Group>
			<Card.Section ref={animationParent}>
				{selected && (
					<ThemeIcon w={"100%"} color="dark">
						<IconCheck size={"1.5rem"} />
					</ThemeIcon>
				)}
			</Card.Section>
		</Card>
	);
}

function FirstQuestion(value: [number, number], setValue: any) {
	return (
		<Card withBorder h={"80dvh"}>
			<Stack justify="center" h={"100%"}>
				<Text ta={"center"} fw={600} size="2.5rem" ff={"Inter"} mb={"2.5rem"}>
					¿Cual es tu rango de precio?
				</Text>
				<Text ff={"Inter"} fw={800} size="xl" ta={"center"}>
					Precio Maximo:{" "}
					<NumberFormatter prefix="$ " value={value[1]} thousandSeparator />
				</Text>
				<Text ff={"Inter"} fw={800} size="xl" ta={"center"}>
					Precio Minimo:{" "}
					<NumberFormatter prefix="$ " value={value[0]} thousandSeparator />
				</Text>
				<RangeSlider
					mx="xl"
					mt={"xl"}
					min={4_000_000}
					max={120_000_000}
					value={value}
					onChange={setValue}
				/>
			</Stack>
		</Card>
	);
}
