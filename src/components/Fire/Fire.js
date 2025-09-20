import React from "react";
import styles from "./Fire.module.css";

function Fire({
  left = "calc(7%)",
  width = "25px",
  height = "25px",
  ...props
}) {
  const normalizeValue = (value) => {
    if (typeof value === "number") {
      return `${value}px`;
    }
    return value;
  };

  const fireStyle = {
    "--fire-left": normalizeValue(left),
    "--fire-width": normalizeValue(width),
    "--fire-height": normalizeValue(height),
  };

  return (
    <div className={styles.fire} style={fireStyle} {...props}>
      <div className={styles.fireLeft}>
        <div className={styles.mainFire}></div>
        <div className={styles.particleFire}></div>
      </div>
      <div className={styles.fireCenter}>
        <div className={styles.mainFire}></div>
        <div className={styles.particleFire}></div>
      </div>
      <div className={styles.fireRight}>
        <div className={styles.mainFire}></div>
        <div className={styles.particleFire}></div>
      </div>
      <div className={styles.fireBottom}>
        <div className={styles.mainFire}></div>
      </div>
    </div>
  );
}

export default Fire;
