"use client";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import styles from "./TabNavigation.module.css";

const tabs = [
  { id: 0, label: "Blog" },
  { id: 1, label: "Component Library" },
];

function TabNavigation({ activeTab, onTabChange }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read URL only on mount to set initial tab
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    let initialTab = 0; // Default to blog

    if (tabParam === "components") {
      initialTab = 1;
    } else if (tabParam === "blog") {
      initialTab = 0;
    }

    if (initialTab !== activeTab) {
      onTabChange(initialTab);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - run only once on mount

  const handleChange = (newValue) => {
    // Update parent state
    onTabChange(newValue);

    // Update URL with query param
    const tabNames = ["blog", "components"];
    router.push(`?tab=${tabNames[newValue]}`, { scroll: false });
  };

  return (
    <nav className={styles.container}>
      <ul className={styles.tabsContainer}>
        {tabs.map((tab, idx) => (
          <motion.li
            key={tab.id}
            className={styles.tabOuter}
            style={{
              padding:
                idx === 0
                  ? "4px 0px 4px 4px"
                  : idx === tabs.length - 1
                  ? "4px 4px 4px 0px"
                  : 4,
            }}
          >
            <motion.button
              className={styles.tabInner}
              style={{
                color:
                  activeTab === tab.id
                    ? "var(--color-primary-contrast)"
                    : "currentColor",
              }}
              whileFocus={{
                outline: "2px solid currentColor",
              }}
              onClick={() => handleChange(tab.id)}
              aria-label={tab.label}
              aria-current={activeTab === tab.id ? "page" : undefined}
            >
              <span className={styles.tabLabel}>{tab.label}</span>

              {tab.id === activeTab ? (
                <motion.span
                  layoutId="activeTab"
                  className={styles.activeTabBg}
                  transition={{
                    type: "spring",
                    stiffness: 600,
                    damping: 40,
                  }}
                />
              ) : null}
            </motion.button>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
}

export default TabNavigation;
