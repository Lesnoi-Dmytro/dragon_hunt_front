"use client";

import { purple } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const commonTheme = {
  typography: {
    fontFamily: `var(--font-roboto), sans-serif`,
    h4: {
      fontSize: "1.6rem",
      fontWeight: "bold",
      lineHeight: 1.2,
    },
  },
};

const darkTheme = createTheme({
  ...commonTheme,
  palette: {
    mode: "dark",
    primary: {
      main: purple[800],
      dark: purple[900],
      light: purple[700],
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        img: {
          filter: "invert(100%)",
        },
      },
    },
  },
});

const lightTheme = createTheme({
  ...commonTheme,
  palette: {
    mode: "light",
    primary: {
      main: purple[600],
      dark: purple[700],
      light: purple[500],
    },
  },
  components: {},
});

export { darkTheme, lightTheme };
