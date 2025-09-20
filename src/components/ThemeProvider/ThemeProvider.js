"use client";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiTabs: {
      styleOverrides: {
        root: {
          maxWidth: "var(--content-width)",
          margin: "0 auto 2rem auto",
          padding: "0 24px",
          "@media (max-width: 768px)": {
            padding: "0 1rem",
          },
        },
        indicator: {
          backgroundColor: "var(--color-primary)",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: "var(--font-family), sans-serif",
          fontWeight: 500,
          textTransform: "none",
          fontSize: "18px",
          "&.Mui-selected": {
            color: "var(--color-primary)",
          },
          "&:hover": {
            color: "var(--color-primary)",
          },
          color: "currentColor",
        },
      },
    },
  },
});

export default function ThemeProvider({ children }) {
  return <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>;
}
