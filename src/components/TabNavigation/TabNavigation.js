"use client";
import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Tabs, Tab, Box } from "@mui/material";
import ThemeProvider from "@/components/ThemeProvider";

// Custom LinkTab component for Next.js integration
function LinkTab({ href, ...other }) {
  return <Tab component={Link} href={href} {...other} />;
}

function TabNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  // Map pathname to tab index
  const getTabValue = (path) => {
    if (path === "/") return 0;
    if (path === "/components") return 1;
    return 0; // fallback
  };

  const tabValue = getTabValue(pathname);

  const handleChange = (event, newValue) => {
    const routes = ["/", "/components"];
    router.push(routes[newValue]);
  };

  return (
    <ThemeProvider>
      <Box component="nav">
        <Tabs
          value={tabValue}
          onChange={handleChange}
          aria-label="navigation tabs"
        >
          <LinkTab label="Blog" href="/" />
          <LinkTab label="Component Library" href="/components" />
        </Tabs>
      </Box>
    </ThemeProvider>
  );
}

export default TabNavigation;
