"use client";

import { Box, Card, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import MyAvatar from "../../user/MyAvatar";
import Sidebar from "../Sidebar";
import { memo, useState } from "react";
import UserResources from "./MyResources";
import useUserStore from "@/stores/userStore";
import MainHeaderSkeleton from "./HubHeaderSkeleton";

export default memo(function MainHeader() {
  const loaded = useUserStore((store) => store.loaded);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (!loaded) {
    return <MainHeaderSkeleton />;
  }

  return (
    <header>
      <Card className="flex items-center justify-between px-4 md:px-8 py-4 gap-4">
        <Box className="flex items-center gap-4">
          <IconButton onClick={toggleSidebar}>
            <MenuIcon fontSize="large" />
          </IconButton>
          <Box className="hidden md:flex items-center gap-4">
            <Image
              src="/images/three_dragons.svg"
              alt="Dragon"
              width={50}
              height={50}
              priority={true}
            />
            <Typography variant="h4">Dragon Hunt</Typography>
          </Box>
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
