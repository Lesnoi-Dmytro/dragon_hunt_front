"use client";

import useUserStore from "@/stores/userStore";
import { memo, useEffect } from "react";

export default memo(function UserProvider() {
  const fetchUserInfo = useUserStore((store) => store.fetchUserInfo);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  return null;
});
