"use client";

import useUserStore from "@/stores/userStore";
import { UserInfo } from "@/types/user/UserInfo";
import { memo, useEffect } from "react";

export default memo(function UserProvider({
  userInfo,
}: Readonly<{
  userInfo: UserInfo;
}>) {
  const setUserInfo = useUserStore((store) => store.setUserInfo);

  useEffect(() => {
    setUserInfo(userInfo);
  }, [userInfo, setUserInfo]);

  return null;
});
