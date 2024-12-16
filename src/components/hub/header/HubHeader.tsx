"use client";

import { Box, Card, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MyAvatar from "../../common/user/MyAvatar";
import Sidebar from "../../common/navigation/Sidebar";
import { memo, useState } from "react";
import UserResources from "./MyResources";
import useUserStore from "@/stores/userStore";
import HubHeaderSkeleton from "./HubHeaderSkeleton";
import MainLogo from "@/components/common/MainLogo";

export default memo(function HubHeader() {
  const loaded = useUserStore((store) => store.loaded);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (!loaded) {
    return <HubHeaderSkeleton />;
  }

  return (
    <header>
      <Card className="flex items-center justify-between px-4 md:px-8 py-4 gap-4">
        <Box className="flex items-center gap-4">
          <IconButton onClick={toggleSidebar}>
            <MenuIcon fontSize="large" />
          </IconButton>
          <MainLogo />
        </Box>
        <Box className="flex items-center gap-4">
          <UserResources />
          <MyAvatar />
        </Box>
      </Card>
      <Sidebar open={sidebarOpen} onClose={toggleSidebar} />
    </header>
  );
});
