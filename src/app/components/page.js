import React from "react";
import TabNavigation from "@/components/TabNavigation";
import SearchLight from "@/components/SearchLight";
import styles from "./components.module.css";
import Fire from "@/components/Fire";
import StarPolygon from "@/components/StarPolygon";

function ComponentLibraryPage() {
  return (
    <div>
      <TabNavigation />
      <div className={styles.wrapper}>
        <SearchLight />
        <Fire />
        <StarPolygon />
        {/* TODO add magnetic Shavings effect */}
      </div>
    </div>
  );
}

export default ComponentLibraryPage;
