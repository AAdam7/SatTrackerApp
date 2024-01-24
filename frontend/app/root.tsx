import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  useLoaderData,
} from "@remix-run/react";
import Map from "./components/map/map";
import Sidebar from "./components/sidebar/sidebar";
import { createGlobalStyle } from "styled-components";
import { LinksFunction } from "@remix-run/node";
import stylesUrl from "mapbox-gl/src/css/mapbox-gl.css";
import { MapProvider } from "react-map-gl";
import { useState, useContext } from "react";
import { DataContext } from "./context/dataContext.js";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export const loader = async () => {
  const res = await fetch("http://localhost:1256/satellites");
  return {
    api: await res.json(),
    mapboxAccessToken: process.env.TOKEN_SECRET,
    formEndPoint: process.env.FORM_ENDPOINT,
  };
};

const GlobalStyle = createGlobalStyle`
  html body {
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
    font-family: Open-Sans, Helvetica, Sans-Serif;
		font-size: 12px;
		text-transform: uppercase;
  }
`;

export default function App() {
  const allData = useLoaderData();
  const [state, setState] = useState({
    name: "SatelliteTrackerApp",
    satMarkers: {
      [0]: {
        longitude: 0.01233,
        latitude: 0.01233,
      },
      [1]: {
        longitude: 20.01233,
        latitude: 0.01233,
      },
      [2]: {
        longitude: 30.01233,
        latitude: 0.01233,
      },
    },
    pointData: {
      [0]: {
        longitude: 0,
        latitude: 0,
      },
    },
    formAdditionalData: false,
    satelliteRun: false,
    isClicked: false,
    collision: {
      detect: false,
      colour: {
        normal: "#007cbf",
        detect: "#bf0000",
      },
    },
  });

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
        <DataContext.Provider
          value={{
            ...allData,
            ...state,
            setState: (data) => setState({ ...state, ...data }),
          }}
        >
          <Sidebar />
          <Map />
        </DataContext.Provider>
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
