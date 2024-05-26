import { ActionIcon, Center, TextInput } from "@mantine/core";
import { IconSend2 } from "@tabler/icons-react";

function Footer({
	input,
	handleInputChange,
	handleSubmit,
}: {
	input: string;
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
	return (
		<>
			<form onSubmit={handleSubmit}>
				<Center>
					<TextInput
						w={"100%"}
						mx={"xs"}
						className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
						my={"xs"}
						value={input}
						placeholder="Say something..."
						onChange={handleInputChange}
						rightSection={
							<ActionIcon variant="light" c={"gray"} type="submit">
								<IconSend2 />
							</ActionIcon>
						}
					/>
				</Center>
			</form>
		</>
	);
}

export default Footer;
