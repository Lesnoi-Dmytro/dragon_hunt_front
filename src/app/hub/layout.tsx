import MainBackground from "@/components/common/MainBackground";
import MainHeader from "@/components/common/navigation/header/MainHeader";

import { getServerSession } from "next-auth";
import React, { Suspense } from "react";
import { apiServer } from "@/utils/axios/api";
import { UserInfo, UserInfoResponse } from "@/types/user/UserInfo";
import AuthUser from "@/types/auth/AuthUser";
import UserProvider from "@/providers/UserProvider";
import HubSkeleton from "@/components/common/HubSkeleton";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";

async function getUserInfo(): Promise<UserInfo> {
  const session = await getServerSession(authOptions);
  const user = session?.user as AuthUser;

  const userInfo = (await apiServer.get<UserInfoResponse>("/users/me")).data;

  return {
    name: user?.name || "",
    email: user?.email || "",
    image: user?.image || undefined,
    ...userInfo,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userInfo = await getUserInfo();

  return (
    <Suspense fallback={<HubSkeleton />}>
      <UserProvider userInfo={userInfo} />

      <MainHeader />
      <MainBackground>{children}</MainBackground>
    </Suspense>
  );
}
