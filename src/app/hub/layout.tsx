import MainBackground from "@/components/common/MainBackground";
import MainHeader from "@/components/hub/header/HubHeader";
import MeProvider from "@/providers/MeProvider";

import React from "react";

export default async function HubLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MeProvider />

      <MainHeader />
      <MainBackground>{children}</MainBackground>
    </>
  );
}
