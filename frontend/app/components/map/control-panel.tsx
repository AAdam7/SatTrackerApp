import * as React from "react";
import type { LngLat } from "react-map-gl";
import { styled } from "styled-components";

const eventNames = ["onDragStart", "onDrag", "onDragEnd"];

const ControlPanelBlock = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  max-width: 320px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  padding: 12px 24px;
  margin: 20px;
  font-size: 13px;
  line-height: 2;
  color: #6b6b76;
  text-transform: uppercase;
  outline: none;
`;

function round5(value) {
  return (Math.round(value * 1e5) / 1e5).toFixed(5);
}

function ControlPanel(props: { events: Record<string, LngLat> }) {
  return (
    <ControlPanelBlock>
      <h3>Satellite Markers</h3>
      <p>Try dragging the Satellite to another location.</p>
      <div>
        {eventNames.map((eventName) => {
          const { events = {} } = props;
          const lngLat = events[eventName];
          return (
            <div key={eventName}>
              <strong>{eventName}:</strong>{" "}
              {lngLat ? (
                `${round5(lngLat.lng)}, ${round5(lngLat.lat)}`
              ) : (
                <em>null</em>
              )}
            </div>
          );
        })}
      </div>
    </ControlPanelBlock>
  );
}

export default React.memo(ControlPanel);
