import { Links, LiveReload, Meta, Outlet, Scripts, redirect, useLoaderData } from "@remix-run/react";
import Map from './components/map/map'
import Sidebar from './components/sidebar/sidebar'
import { createGlobalStyle } from 'styled-components';

import { LinksFunction } from "@remix-run/node"; 
import stylesUrl from './mapbox-gl.css';
export const links:LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export const loader = async () => {
  return { name: 'SatelliteTrackerApp', mapboxAccessToken: process.env.TOKEN_SECRET }
}

export const action = async ({ request }) => {
  const form = await request.formData();
  const name = form.get("name");
  const owner = form.get("owner");
  const longitude = form.get("longitude");
  const latitude = form.get("latitude");

  console.log({ name, owner, longitude, latitude });
  return redirect("/");
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
	const data = useLoaderData()
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
        <Scripts />
				<LiveReload />
				<Sidebar/>
				<Map token={data.mapboxAccessToken}/>
      </body>
    </html>
  );
}
