import { useState, useEffect, useMemo, useCallback, useContext } from "react";
import { DataContext } from "../../context/dataContext.js";

export const AnimationEffect = (setPointDataAnim, pointDataAnim) => {
  const { api, collision, satelliteRun, setState } = useContext(DataContext);

  useEffect(() => {
    const animation =
      !satelliteRun.stop &&
      requestAnimationFrame(() =>
        setPointDataAnim({
          ...pointDataAnim,
          geometry: api.map((item, index) =>
            moveOnLine({
              center: [item.longitude, item.latitude],
              angle: (Date.now() / 2000) * [index + 3],
              radius: 1 * [index + 1],
            })
          ),
        })
      );
    distance(pointDataAnim, collision, setState);
    return () => cancelAnimationFrame(animation);
  });
};

// instead distance() use turf tool/lib...
function distance(pointDataAnim, collision, setState) {
  let lat1 = pointDataAnim?.geometry[0]?.coordinates[0];
  let lat2 = pointDataAnim?.geometry[1]?.coordinates[0];
  let lon1 = pointDataAnim?.geometry[0]?.coordinates[1];
  let lon2 = pointDataAnim?.geometry[1]?.coordinates[1];
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    var radius1lt = (Math.PI * lat1) / 180;
    var radius2lt = (Math.PI * lat2) / 180;
    var lg2diff = lon1 - lon2;
    var radiusDiff = (Math.PI * lg2diff) / 180;
    var measure =
      Math.sin(radius1lt) * Math.sin(radius2lt) +
      Math.cos(radius1lt) * Math.cos(radius2lt) * Math.cos(radiusDiff);
    if (measure > 1) {
      measure = 1;
    }
    measure = Math.acos(measure);
    measure = (measure * 180) / Math.PI;
    measure = measure * 60 * 1.1515; // M
    measure = measure * 1.609344;
    if (measure <= 1000 && collision.detect === false) {
      setState({ collision: { ...collision, detect: true } });
      return measure.toFixed(2);
    } else {
      if (measure >= 1000 && collision.detect === true) {
        setState({ collision: { ...collision, detect: false } });
      }
    }
  }
}

function moveOnCircle({ center, angle, radius }) {
  return {
    type: "Point",
    coordinates: [
      center[0] + Math.cos(angle) * radius,
      center[1] + Math.sin(angle) * radius,
    ],
  };
}

function moveOnLine({ center, angle, radius, index }) {
  return {
    type: "Point",
    coordinates: [
      (center[1] += center[1] * angle) % 360,
      (center[0] += 1.5 * angle) % 360,
    ],
  };
}
