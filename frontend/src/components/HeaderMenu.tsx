import { Group, Burger, Container, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./HeaderMenu.module.css";

const links = [
	{ link: "/account", label: "Mi Cuenta" },
	{ link: "/logout", label: "Cerrar Sesión" },
];

export function HeaderMenu() {
	const [opened, { toggle }] = useDisclosure(false);
	const items = links.map((link) => {
		return (
			<a key={link.label} href={link.link} className={classes.link}>
				{link.label}
			</a>
		);
	});

	return (
		<header className={classes.header}>
			<Container size="md">
				<div className={classes.inner}>
					<Text ff={"Inter"} fw={700}>
						Wheel Wise
					</Text>
					<Group gap={5} visibleFrom="sm">
						{items}
					</Group>
					<Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
				</div>
			</Container>
		</header>
	);
}
