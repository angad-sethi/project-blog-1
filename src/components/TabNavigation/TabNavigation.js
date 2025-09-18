"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import styles from "./TabNavigation.module.css";

function TabNavigation() {
  const pathname = usePathname();

  const tabs = [
    {
      label: "Blog",
      href: "/",
      active: pathname === "/",
    },
    {
      label: "Component Library",
      href: "/components",
      active: pathname === "/components",
    },
  ];

  return (
    <nav className={styles.wrapper}>
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={clsx(styles.tab, {
              [styles.active]: tab.active,
            })}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default TabNavigation;
