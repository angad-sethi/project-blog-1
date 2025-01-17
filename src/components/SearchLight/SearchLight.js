"use client";
import React from "react";
import styles from "./SearchLight.module.css";

function SearchLight() {
  return (
    <div className={styles.app}>
      <div className={styles.wrapper}>
        <div className={styles.bulbcover}>
          <div className={styles.bulb}>❘</div>
        </div>
        <div className={styles.light}></div>
        <h1 className={styles.text}>Recently published</h1>
      </div>
    </div>
  );
}

export default SearchLight;
