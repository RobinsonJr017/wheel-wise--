import {
	Button,
	Card,
	Center,
	Container,
	Divider,
	Group,
	NumberFormatter,
	ScrollArea,
	SimpleGrid,
	Stack,
	Text,
	ThemeIcon,
	Title,
} from "@mantine/core";
import { IconTrademark, IconCash, IconCoin, IconCalendarTime, IconEngine, IconManualGearbox } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

function Profile() {
	const navigate = useNavigate();
	const recommendations: any[] = JSON.parse(
		localStorage.getItem("recommendations") ?? "[]",
	);
	return (
		<Container mt={"xl"} pb={"2rem"}>
			<Title ta={"center"}>Recomendaciones Pasadas</Title>
			<Group grow my={"md"}>
				<Center>
					<Button onClick={() => navigate("/")} radius={"xl"}>
						Nueva Recomendacion
					</Button>
				</Center>
			</Group>
			<ScrollArea mb={"xl"} h={"70dvh"}>
				{recommendations.reverse().map((recommendation) => {
					return (
						<Card key={recommendation.id} mb={"md"}>
							<Text mb={"md"} size="xl" ff={"Inter"} fw={600} ta={"center"}>
								Presupuesto:{" "}
								<NumberFormatter
									prefix="$"
									thousandSeparator
									value={recommendation.presupuesto_min}
								/>{" "}
								-{" "}
								<NumberFormatter
									prefix="$"
									thousandSeparator
									value={recommendation.presupuesto_max}
								/>
							</Text>
							<Text mb={"md"} size="xl" ff={"Inter"} fw={600} ta={"center"}>
								Estilo: {recommendation.estilo}
							</Text>
							<SimpleGrid cols={3} pb={"3rem"}>
								{recommendation.recommendations.map((recommendation: any) => {
									return (
											<Card
												key={recommendation.id}
												withBorder
												shadow="md"
												p="md"
											>
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
																	<Text
																		size="sm"
																		ff={"Inter"}
																		fw={600}
																		ta={"left"}
																	>
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
																	<Text
																		size="sm"
																		ff={"Inter"}
																		fw={600}
																		ta={"left"}
																	>
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
																	<Text
																		size="sm"
																		ff={"Inter"}
																		fw={600}
																		ta={"left"}
																	>
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
																	<Text
																		size="sm"
																		ff={"Inter"}
																		fw={600}
																		ta={"left"}
																	>
																		Modelo: {recommendation.modelo}
																	</Text>
																</Group>
																<Group>
																	<ThemeIcon variant="light">
																		<IconEngine size={"1.5rem"} />
																	</ThemeIcon>
																	<Text
																		size="sm"
																		ff={"Inter"}
																		fw={600}
																		ta={"left"}
																	>
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
																	<Text
																		size="sm"
																		ff={"Inter"}
																		fw={600}
																		ta={"left"}
																	>
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
									);
								})}
							</SimpleGrid>
						</Card>
					);
				})}
			</ScrollArea>
		</Container>
	);
}

export default Profile;
