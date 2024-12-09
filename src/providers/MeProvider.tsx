"use client";

import useUserStore from "@/stores/userStore";
import { MyInfo } from "@/types/user/MyInfo";
import { memo, useEffect } from "react";

export default memo(function UserProvider({
  userInfo,
}: Readonly<{
  userInfo: MyInfo | undefined;
}>) {
  const setUserInfo = useUserStore((store) => store.setUserInfo);

  useEffect(() => {
    if (userInfo) {
      setUserInfo(userInfo);
    }
  }, [userInfo, setUserInfo]);

  return null;
});
