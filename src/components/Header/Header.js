"use client";
import React from "react";
import clsx from "clsx";
import { Rss, Sun, Moon, Coffee, Linkedin } from "react-feather";
import Cookie from "js-cookie";
import Logo from "@/components/Logo";
import VisuallyHidden from "@/components/VisuallyHidden";
import { LIGHT_TOKENS, DARK_TOKENS } from "@/constants";
import Tooltip from "@mui/material/Button";
import { animated } from "react-spring";

import styles from "./Header.module.css";
import Fire from "../Fire";
import useBoop from "@/hooks/useBoop";

const boopConfig = {
  rotation: -20,
};

function Header({ initialTheme, className, ...delegated }) {
  const [theme, setTheme] = React.useState(initialTheme);
  const [styleCoffee, triggerCoffee] = useBoop(boopConfig);
  const [styleRss, triggerRss] = useBoop(boopConfig);
  const [styleLinkedin, triggerLinkedin] = useBoop(boopConfig);
  const [styleToggle, triggerToggle] = useBoop(boopConfig);

  function flipTheme() {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    Cookie.set("color-theme", nextTheme, {
      expires: 1000,
    });

    const root = document.documentElement;
    root.setAttribute("data-color-theme", nextTheme);
    const newTokens = nextTheme === "light" ? LIGHT_TOKENS : DARK_TOKENS;

    Object.entries(newTokens).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }

  return (
    <header className={clsx(styles.wrapper, className)} {...delegated}>
      <div className={styles.logoAndfire}>
        <Logo />
        <Fire />
      </div>

      <div className={styles.actions}>
        <Tooltip
          title="Play Wordle on your coffee break"
          placement="bottom"
          arrow
          className={styles.alienMuiButton}
        >
          <animated.span onMouseEnter={triggerCoffee} style={styleCoffee}>
            <a
              href="https://wordle.angadsethi.dev/"
              className={styles.action}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Coffee
                size="1.5rem"
                style={{
                  // Optical alignment
                  transform: "translate(2px, -2px)",
                }}
              />
              <VisuallyHidden>Play Wordle on your coffee break</VisuallyHidden>
            </a>
          </animated.span>
        </Tooltip>
        <animated.span onMouseEnter={triggerRss} style={styleRss}>
          <a href="/rss.xml" className={styles.action}>
            <Rss
              size="1.5rem"
              style={{
                // Optical alignment
                transform: "translate(2px, -2px)",
              }}
            />
            <VisuallyHidden>View RSS feed</VisuallyHidden>
          </a>
        </animated.span>
        <animated.span onMouseEnter={triggerLinkedin} style={styleLinkedin}>
          <a
            href="https://www.linkedin.com/in/angad-sethi-2590b4174/"
            className={styles.action}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Linkedin
              size="1.5rem"
              style={{
                // Optical alignment
                transform: "translate(2px, -2px)",
              }}
            />
            <VisuallyHidden>LinkedIn</VisuallyHidden>
          </a>
        </animated.span>
        <animated.span onMouseEnter={triggerToggle} style={styleToggle}>
          <button className={styles.action} onClick={flipTheme}>
            {theme == "light" ? <Sun size="1.5rem" /> : <Moon size="1.5rem" />}
            <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
          </button>
        </animated.span>
      </div>
    </header>
  );
}

export default Header;
