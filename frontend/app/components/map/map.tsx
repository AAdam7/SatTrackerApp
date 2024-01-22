import * as React from "react";
import { useState, useEffect, useMemo, useCallback, useContext } from "react";
import { Map, Marker, NavigationControl } from "react-map-gl";
import ControlPanel from "./control-panel";
import Pin from "./pin";
import { DataContext } from "../../context/dataContext.js";

const eventNames = ["onDragStart", "onDrag", "onDragEnd"];

const initialViewState = {
  latitude: 52,
  longitude: -2,
  zoom: 0,
};

export default function MapComponent() {
  const { api, satMarkers, mapboxAccessToken, setState } =
    useContext(DataContext);
  const [events, logEvents] = useState<Record<string, LngLat>>({});

  const onMarkerDragStart = useCallback((event: MarkerDragEvent) => {
    logEvents((_events) => ({ ..._events, onDragStart: event.lngLat }));
  }, []);

  const onMarkerDrag = useCallback((event: MarkerDragEvent ) => {
    logEvents((_events) => ({ ..._events, onDrag: event.lngLat }));

    setState({
      satMarkers: {
        [0]: {
          longitude: event.lngLat.lng,
          latitude: event.lngLat.lat,
        },
      },
    });

  }, []);

  const onMarkerDragEnd = useCallback((event: MarkerDragEvent) => {
    logEvents((_events) => ({ ..._events, onDragEnd: event.lngLat }));
  }, []);

  const multipleMarkers = api.map((item, index) => (
    <Marker
      key={index}
      longitude={item.longitude}
      latitude={item.latitude}
      anchor="bottom"
      draggable
      // onDragStart={onMarkerDragStart}
      // onDrag={onMarkerDrag}
      // onDragEnd={onMarkerDragEnd}
    >
      <Pin size={20} />
      {item.name}
    </Marker>
  ));

  return (
    <>
      <Map
        mapboxAccessToken={mapboxAccessToken}
        initialViewState={initialViewState}
        // style={{ width: "100%", height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        {multipleMarkers}
        <NavigationControl />
      </Map>
      <ControlPanel events={events} />
    </>
  );
}
