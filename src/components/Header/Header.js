"use client"
import React from 'react';
import clsx from 'clsx';
import { Rss, Sun, Moon } from 'react-feather';
import Cookie from "js-cookie";
import Logo from '@/components/Logo';
import VisuallyHidden from '@/components/VisuallyHidden';
import { LIGHT_TOKENS, DARK_TOKENS } from '@/constants';

import styles from './Header.module.css';
import Fire from '../Fire';

function Header({ initialTheme, className, ...delegated }) {
  const [theme, setTheme] = React.useState(initialTheme);

  function flipTheme() {

    const nextTheme = theme === "light"? "dark": "light"
    setTheme(nextTheme);
    Cookie.set("color-theme", nextTheme, {
      expires: 1000,
    });
    
    const root = document.documentElement;
    root.setAttribute("data-color-theme", nextTheme);
    const newTokens = nextTheme === 'light' ? LIGHT_TOKENS : DARK_TOKENS
    
    Object.entries(newTokens).forEach(([key, value]) => {root.style.setProperty(key,value);})
  }

  return (
    <header
      className={clsx(styles.wrapper, className)}
      {...delegated}
    >
      <Logo />
      <Fire />

      <div className={styles.actions}>
          <a href="/rss.xml" className={styles.action}>
          <Rss
            size="1.5rem"
            style={{
              // Optical alignment
              transform: 'translate(2px, -2px)',
            }}
          />
          <VisuallyHidden>
            View RSS feed
          </VisuallyHidden>
          </a>
        <button className={styles.action} onClick={flipTheme}>
          {theme == "light"? <Sun size="1.5rem" /> : <Moon size="1.5rem"/>}
          <VisuallyHidden>
            Toggle dark / light mode
          </VisuallyHidden>
        </button>
      </div>
    </header>
  );
}

export default Header;
