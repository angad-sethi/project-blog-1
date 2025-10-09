import React from "react";
import TabNavigation from "@/components/TabNavigation";
import SearchLight from "@/components/SearchLight";
import styles from "./components.module.css";
import Fire from "@/components/Fire";
import StarPolygon from "@/components/StarPolygon";
import BoopyBoi from "@/components/BoopyBoi";

function ComponentLibraryPage() {
  return (
    <div>
      <TabNavigation />
      <div className={styles.wrapper}>
        <SearchLight label="Search Light" />
        <Fire width={70} height={70} left="0" />
        <StarPolygon />
        <BoopyBoi />
        {/* TODO add magnetic Shavings effect */}
      </div>
    </div>
  );
}

export default ComponentLibraryPage;
