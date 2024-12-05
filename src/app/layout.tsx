import "@/styles/globals.css";
import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

import { ThemeProvider } from "@mui/material/styles";
import { Roboto } from "next/font/google";
import { darkTheme, lightTheme } from "@/theme";
import { CssBaseline } from "@mui/material";
import MainHeader from "@/components/common/MainHeader";

export const metadata: Metadata = {
  title: "Dragon Hunt",
  description: "Turn-based strategy game",
  icons: {
    icon: "/favicon.png",
  },
};

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <MainHeader />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
