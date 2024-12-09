import MainBackground from "@/components/common/MainBackground";
import MainHeader from "@/components/common/navigation/header/MainHeader";

import { getServerSession } from "next-auth";
import React, { Suspense } from "react";
import { apiServer } from "@/utils/axios/api";
import { MyInfo, MyInfoResponse } from "@/types/user/MyInfo";
import AuthUser from "@/types/auth/AuthUser";
import UserProvider from "@/providers/MeProvider";
import HubSkeleton from "@/components/common/HubSkeleton";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";

async function getUserInfo(): Promise<MyInfo | undefined> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return undefined;
  }

  const user = session?.user as AuthUser;

  const userInfo = (await apiServer.get<MyInfoResponse>("/users/me")).data;

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
  let userInfo;
  try {
    userInfo = await getUserInfo();
  } catch (err) {
    console.log(err);
  }

  return (
    <Suspense fallback={<HubSkeleton />}>
      <UserProvider userInfo={userInfo} />

      <MainHeader />
      <MainBackground>{children}</MainBackground>
    </Suspense>
  );
}
