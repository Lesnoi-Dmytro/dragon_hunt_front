import MainBackground from "@/components/common/MainBackground";
import MainHeader from "@/components/common/navigation/header/HubHeader";

import React from "react";
import UserProvider from "@/providers/MeProvider";

export default async function HubLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <UserProvider />

      <MainHeader />
      <MainBackground>{children}</MainBackground>
    </>
  );
}
