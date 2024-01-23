import * as React from "react";
import { useState, useEffect, useMemo, useCallback, useContext } from "react";
import { Map, Source, Layer, NavigationControl } from "react-map-gl";
import { AnimationEffect } from "./animation.jsx";
import ControlPanel from "./control-panel";
import Pin from "./pin";
import { DataContext } from "../../context/dataContext.js";
import type { CircleLayer } from "react-map-gl";
import type { FeatureCollection } from "geojson";

const eventNames = ["onDragStart", "onDrag", "onDragEnd"];
const initialViewState = {
  latitude: 52,
  longitude: -2,
  zoom: 0,
};

export default function MapComponent() {
  const [pointDatawe, setPointData] = useState(null);
  const { api, satMarkers, mapboxAccessToken, setState } =
    useContext(DataContext);

  const [events, logEvents] = useState<Record<string, LngLat>>({});

  const geojson: FeatureCollection = {
    type: "FeatureCollection",
    features: api.map((item, index) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [
          pointDatawe?.geometry[index]?.coordinates[0],
          pointDatawe?.geometry[index]?.coordinates[1],
        ],
      },
    })),
  };

  AnimationEffect(setPointData);

  const layerStyle: CircleLayer = {
    id: "point",
    type: "circle",
    paint: {
      "circle-radius": 10,
      "circle-color": "#007cbf",
    },
  };

  return (
    <>
      <Map
        mapboxAccessToken={mapboxAccessToken}
        initialViewState={initialViewState}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Source id="my-data" type="geojson" data={geojson}>
          <Layer {...layerStyle} />
        </Source>
      </Map>
      <ControlPanel events={events} />
    </>
  );
}
