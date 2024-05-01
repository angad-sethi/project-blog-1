import React from 'react';
import {
  Work_Sans,
  Spline_Sans_Mono,
} from 'next/font/google';
import clsx from 'clsx';

import { LIGHT_TOKENS, DARK_TOKENS } from '@/constants';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './styles.css';
import {cookies} from "next/headers"

export const metadata = {
  title: `Angad's blog`,
  description:"A blood ripper frontend engineering blog"
};

const mainFont = Work_Sans({
  subsets: ['latin'],
  display: 'fallback',
  weight: 'variable',
  variable: '--font-family',
});
const monoFont = Spline_Sans_Mono({
  subsets: ['latin'],
  display: 'fallback',
  weight: 'variable',
  variable: '--font-family-mono',
});


function RootLayout({ children }) {

  const savedTheme = cookies().get("color-theme");
  const initialTheme = savedTheme?.value ?? "dark";
 

  return (
    <html
      lang="en"
      className={clsx(mainFont.variable, monoFont.variable)}
      data-color-theme={savedTheme}
      style={initialTheme === 'light' ? LIGHT_TOKENS : DARK_TOKENS}
    >
      <body>
        <Header initialTheme={initialTheme} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

export default RootLayout;
