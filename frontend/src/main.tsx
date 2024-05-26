import "@mantine/core/styles.css";
import '@mantine/carousel/styles.css';
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { MantineProvider } from "@mantine/core";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import AuthScreen from "./views/Auth.tsx";
import { nanoid } from "nanoid";
import Profile from "./views/Profile.tsx";
import Logout from "./views/Logout.tsx";
import Home from "./views/Home.tsx";

window.localStorage.setItem("clientID", nanoid());

window.supabase = createClient(
	"https://nymrgsfngjuaohzgruqz.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55bXJnc2ZuZ2p1YW9oemdydXF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg2NTE2OTMsImV4cCI6MjAyNDIyNzY5M30.2R_9Ckjp12eSTOJqxofj_f-plocUEvBYik-PTXG-_-4",
);

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
        element: <Home/>
			},
      {
        path: "/account",
        element: <Profile/>
      }
		],
	},
  {
    path: "/auth",
    element: <AuthScreen />,
  },
  {
    path: "/logout",
    element: <Logout />,
  }
]);

// biome-ignore lint/style/noNonNullAssertion: the html element is never null
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<MantineProvider forceColorScheme="dark">
			<RouterProvider router={router} />
		</MantineProvider>
	</React.StrictMode>,
);
