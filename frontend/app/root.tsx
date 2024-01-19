import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  redirect,
  useLoaderData,
} from "@remix-run/react";
import Map from "./components/map/map";
import Sidebar from "./components/sidebar/sidebar";
import { styled, createGlobalStyle } from "styled-components";
import { LinksFunction } from "@remix-run/node";
import stylesUrl from "./mapbox-gl.css";
import { MyContext } from "./context";
export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export const loader = async () => {
  const res = await fetch("http://localhost:1256/satellites");
  return {
    api: await res.json(),
    name: "SatelliteTrackerApp",
    mapboxAccessToken: process.env.TOKEN_SECRET,
    formEndPoint: process.env.FORM_ENDPOINT,
  };
};

export const action = async ({ request }) => {
  const form = await request.formData();
  // return redirect("/");
};

const GlobalStyle = createGlobalStyle`
  html body {
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }
`;

export default function App() {
  const data = useLoaderData();
  return (
    <html>
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body>
        <GlobalStyle />
        <Outlet />
        <Sidebar data={data} />
        <Map data={data} />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
