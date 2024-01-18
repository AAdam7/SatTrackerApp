import * as React from "react";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Map, Marker, NavigationControl } from "react-map-gl";

import ControlPanel from "./control-panel";
import Pin from "./pin";

const eventNames = ["onDragStart", "onDrag", "onDragEnd"];

const geojson = {
  type: "Feature",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-37.032, 68.913],
      },
      properties: {
        title: "Satellite",
        description: "Washington",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-12.414, 17.776],
      },
      properties: {
        title: "Satellite",
        description: "California",
      },
    },
  ],
};

const initialViewState = {
  latitude: 52,
  longitude: -2,
  zoom: 0,
};

export default function MapComponent({ token }) {
  const [marker, setMarker] = useState({
    latitude: initialViewState.latitude,
    longitude: initialViewState.longitude,
  });
  const [events, logEvents] = useState<Record<string, LngLat>>({});

  const onMarkerDragStart = useCallback((event: MarkerDragEvent) => {
    logEvents((_events) => ({ ..._events, onDragStart: event.lngLat }));
  }, []);

  const onMarkerDrag = useCallback((event: MarkerDragEvent) => {
    logEvents((_events) => ({ ..._events, onDrag: event.lngLat }));

    setMarker({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
    });
  }, []);

  const onMarkerDragEnd = useCallback((event: MarkerDragEvent) => {
    logEvents((_events) => ({ ..._events, onDragEnd: event.lngLat }));
  }, []);

  return (
    <>
      <Map
        mapboxAccessToken={token}
        initialViewState={initialViewState}
        // style={{ width: "100%", height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker
          longitude={marker.longitude}
          latitude={marker.latitude}
          anchor="bottom"
          draggable
          onDragStart={onMarkerDragStart}
          onDrag={onMarkerDrag}
          onDragEnd={onMarkerDragEnd}
        >
          <Pin size={20} />
        </Marker>
        <NavigationControl />
      </Map>
      <ControlPanel events={events} />
    </>
  );
}
