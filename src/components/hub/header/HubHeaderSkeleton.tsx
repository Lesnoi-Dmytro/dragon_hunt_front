"use client";

import { Box, Card, IconButton, Skeleton } from "@mui/material";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../../common/navigation/Sidebar";
import { useState } from "react";
import MyAvatarSkeleton from "../../common/user/MyAvatarSkeleton";
import MainLogo from "@/components/common/MainLogo";

export default function HubHeaderSkeleton() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

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
          <Box className="flex items-center gap-1">
            <Skeleton
              variant="text"
              width={"3rem"}
              sx={{ fontSize: "1.5rem" }}
            />
            <Image
              src="/images/energy.svg"
              alt="energy"
              width={24}
              height={24}
            />
          </Box>
          <Box className="flex items-center gap-2">
            <Skeleton
              variant="text"
              width={"3rem"}
              sx={{ fontSize: "1.5rem" }}
            />
            <Image
              src="/images/coin_bag.svg"
              alt="coin bag"
              width={24}
              height={24}
            />
          </Box>

          <MyAvatarSkeleton />
        </Box>
      </Card>
      <Sidebar open={sidebarOpen} onClose={toggleSidebar} />
    </header>
  );
}
