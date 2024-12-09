"use client";

import useUserStore from "@/stores/userStore";
import AuthUser from "@/types/auth/AuthUser";
import { MyInfo, MyInfoResponse } from "@/types/user/MyInfo";
import { apiClient } from "@/utils/axios/api";
import { useSession } from "next-auth/react";
import { memo, useEffect } from "react";

export default memo(function UserProvider() {
  const session = useSession();
  const setUserInfo = useUserStore((store) => store.setUserInfo);

  useEffect(() => {
    const getUserInfo = async (): Promise<MyInfo | undefined> => {
      if (!session) {
        return;
      }

      const user = session?.data?.user as AuthUser;

      const userInfo = (await apiClient.get<MyInfoResponse>("/users/me")).data;

      if (userInfo) {
        setUserInfo({
          name: user?.name || "",
          email: user?.email || "",
          image: user?.image || undefined,
          ...userInfo,
        });
      }
    };

    getUserInfo();
  }, [session, setUserInfo]);

  return null;
});
