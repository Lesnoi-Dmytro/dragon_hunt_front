"use client";

import { CssBaseline } from "@mui/material";
import { grey, purple } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { useMemo } from "react";

const AppThemeProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const theme = useMemo(
    () =>
      createTheme({
        cssVariables: {
          colorSchemeSelector: "class",
          disableCssColorScheme: true,
        },
        colorSchemes: {
          dark: {
            palette: {
              mode: "dark",
              primary: {
                main: purple[800],
                dark: purple[900],
                light: purple[700],
              },
              secondary: {
                main: "#111111",
                dark: "#000000",
                light: "#222222",
              },
            },
          },
          light: {
            palette: {
              mode: "light",
              primary: {
                main: purple[600],
                dark: purple[700],
                light: purple[500],
              },
              secondary: {
                main: grey[300],
                dark: grey[400],
                light: grey[200],
              },
            },
          },
        },
        typography: {
          fontFamily: `var(--font-roboto), sans-serif`,
          h4: {
            fontSize: "1.6rem",
            fontWeight: "bold",
            lineHeight: 1.2,
          },
        },
        components: {
          MuiTooltip: {
            styleOverrides: {
              tooltip: {
                fontSize: "1em",
              },
            },
          },
          MuiSkeleton: {
            defaultProps: {
              animation: "wave",
            },
          },
          MuiSnackbar: {
            defaultProps: {
              autoHideDuration: 3000,
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "center",
              },
              ContentProps: {
                sx: {
                  fontSize: "1em",
                },
              },
            },
          },
        },
      }),
    []
  );

  return (
    <ThemeProvider theme={theme} defaultMode="system" disableTransitionOnChange>
      <CssBaseline enableColorScheme />
      <InitColorSchemeScript attribute="class" defaultMode="system" />
      {children}
    </ThemeProvider>
  );
};

export default AppThemeProvider;
