import * as React from "react";
import { useState, useContext } from "react";
import { Map, Source, Layer, CircleLayer } from "react-map-gl";
import { AnimationEffect } from "./animation.jsx";
import ControlPanel from "./control-panel";
import Pin from "./pin";
import { DataContext } from "../../context/dataContext.js";
import type { FeatureCollection } from "geojson";

const eventNames = ["onDragStart", "onDrag", "onDragEnd"];
const initialViewState = {
  latitude: 52,
  longitude: -2,
  zoom: 0,
};

export default function MapComponent() {
  const [pointDataAnim, setPointDataAnim] = useState(null);
  const { api, collision, mapboxAccessToken } = useContext(DataContext);

  const [events, logEvents] = useState<Record<string, LngLat>>({});

  AnimationEffect(setPointDataAnim, pointDataAnim);

  const geojson: FeatureCollection = {
    type: "FeatureCollection",
    features: api.map((item, index) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [
          pointDataAnim?.geometry[index]?.coordinates[0],
          pointDataAnim?.geometry[index]?.coordinates[1],
        ],
      },
    })),
  };

	//collision is only for two first satellites, and layers change for all satellites... for test/etc
  const layerStyle: CircleLayer = {
    id: "point",
    type: "circle",
    paint: {
      "circle-radius": 5,
      "circle-color": collision.detect
        ? collision.colour.detect
        : collision.colour.normal,
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
