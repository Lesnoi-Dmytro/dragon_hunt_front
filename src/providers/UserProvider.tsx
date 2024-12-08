"use client";

import useUserStore from "@/stores/userStore";
import { UserInfo } from "@/types/user/UserInfo";
import { memo } from "react";

export default memo(function UserProvider({
  userInfo,
}: Readonly<{
  userInfo: UserInfo;
}>) {
  const setUserInfo = useUserStore((store) => store.setUserInfo);
  setUserInfo(userInfo);

  return null;
});
