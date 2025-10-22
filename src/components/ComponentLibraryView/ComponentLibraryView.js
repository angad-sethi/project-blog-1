"use client";
import React from "react";
import SearchLight from "@/components/SearchLight";
import Fire from "@/components/Fire";
import StarPolygon from "@/components/StarPolygon";
import BoopyBoi from "@/components/BoopyBoi";
import MagneticFillings from "@/components/MagneticFillings";
import styles from "./ComponentLibraryView.module.css";

function ComponentLibraryView({ isActive, isAnimationComplete }) {
  return (
    <div className={styles.wrapper}>
      <SearchLight label="Search Light" />
      {isActive && (
        <MagneticFillings
          isActive={isActive}
          isAnimationComplete={isAnimationComplete}
        />
      )}
      <Fire width={70} height={70} left="0" />
      <StarPolygon />
      <BoopyBoi />
    </div>
  );
}

export default ComponentLibraryView;
