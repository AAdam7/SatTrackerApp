import { useState, useEffect, useMemo, useCallback, useContext } from "react";
import { DataContext } from "../../context/dataContext.js";

export const AnimationEffect = (setPointData) => {
  const { api } = useContext(DataContext);

  useEffect(() => {
    const animation = requestAnimationFrame(() =>
      setPointData({
        geometry: api.map((item, index) =>
          moveOnLine({
            center: [api[index].longitude, api[index].latitude],
            angle: Date.now() / 2000 / [index + 1],
            radius: 150,
          })
        ),
      })
    );
    return () => cancelAnimationFrame(animation);
  });
};

function moveOnCircle({ center, from, angle, radius }) {
  return {
    type: "Point",
    coordinates: [
      center[0] + Math.cos(angle) * radius,
      center[1] + Math.sin(angle) * radius,
    ],
  };
}

function moveOnLine({ center, angle, radius }) {
  return {
    type: "Point",
    coordinates: [
      center[0] + Math.cos(angle) * radius,
      center[1] + Math.sin(angle) * radius,
    ],
  };
}

function moveOnLine2({ center, angle, radius, index }) {
  return {
    type: "Point",
    coordinates: [
      center[0] > 180 ? (center[0] = -180) : (center[0] += 0.4),
      (center[1] += 0.033 + [index]),
    ],
  };
}
