import "@/styles/globals.css";
import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

import { Roboto } from "next/font/google";
import AppThemeProvider from "@/providers/AppThemeProvider";
import AppAuthProvider from "@/providers/AppAuthProvider";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${roboto.className} antialiased`}
        suppressHydrationWarning
      >
        <AppRouterCacheProvider>
          <AppAuthProvider>
            <AppThemeProvider>{children}</AppThemeProvider>
          </AppAuthProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
