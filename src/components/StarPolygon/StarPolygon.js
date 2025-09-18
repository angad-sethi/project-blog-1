import React from "react";
import styles from "./StarPolygon.module.css";

function StarPolygon() {
  return (
    <svg width="300" height="300" className={styles.starPolygon}>
      <polygon
        pathLength="100"
        points="140,55
163.5760664694511,127.55032835562085
239.8609342109911,127.55321559063051
178.1468768685986,172.39467164437914
201.71745149070966,244.94678440936949
140,200.11
78.28254850929034,244.94678440936949
101.85312313140139,172.39467164437914
40.13906578900887,127.55321559063054
116.4239335305489,127.55032835562086"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

export default StarPolygon;
