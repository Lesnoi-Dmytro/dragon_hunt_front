"use client";

import { Box, Card, IconButton, Skeleton, Typography } from "@mui/material";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../Sidebar";
import { useState } from "react";
import UserAvatarSkeleton from "../user/MyAvatarSkeleton";

export default function MainHeaderSkeleton() {
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
          <Box className="hidden md:flex items-center gap-4">
            <Image
              src="/images/three_dragons.svg"
              alt="Dragon"
              width={50}
              height={50}
              className="dark-invert"
            />
            <Typography variant="h4">Dragon Hunt</Typography>
          </Box>
        </Box>
        <Box className="flex items-center gap-4">
          <Box className="flex items-center gap-1">
            <Skeleton
              variant="text"
              width={"1rem"}
              sx={{ fontSize: "1.5rem" }}
            />
            <Typography variant="h5">/5</Typography>
            <Image
              src="/images/energy.svg"
              alt="energy"
              width={24}
              height={24}
              className="dark-invert"
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
              className="dark-invert"
            />
          </Box>

          <UserAvatarSkeleton />
        </Box>
      </Card>
      <Sidebar open={sidebarOpen} onClose={toggleSidebar} />
    </header>
  );
}
