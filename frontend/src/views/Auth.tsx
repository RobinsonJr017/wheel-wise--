import { Center, Container, Text } from "@mantine/core";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import es from "../assets/es.json";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function AuthScreen() {
  const navigate = useNavigate();
  useEffect(() => {
    window.supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        navigate("/");
      }
    })
  })
	return (
		<Center>
			<Container w={"100dvh"} m={"3rem"} mx={"10rem"}>
				<Text
					ff={"Inter"}
					size={"3rem"}
					ta={"center"}
					fw={700}
					mt={"xl"}
					mb={"xl"}
				>
					Wheel Wise
				</Text>
				<Auth

					supabaseClient={window.supabase}
					appearance={{ theme: ThemeSupa }}
					providers={[]}
					localization={{ variables: es }}
					theme="dark"
				/>
			</Container>
		</Center>
	);
}

export default AuthScreen;
