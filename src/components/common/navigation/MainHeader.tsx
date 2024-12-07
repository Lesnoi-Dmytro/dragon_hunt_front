"use client";

import { Box, Card, IconButton, Tooltip, Typography } from "@mui/material";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import UserAvatar from "../user/UserAvatar";
import Sidebar from "./Sidebar";
import { memo, useState } from "react";

export default memo(function MainHeader() {
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
              src="/logo.svg"
              alt="Dragon"
              width={50}
              height={50}
              className="dark-invert"
            />
            <Typography variant="h4">Dragon Hunt</Typography>
          </Box>
        </Box>
        <Box className="flex items-center gap-4">
          <Tooltip title="21:29 left" arrow={true} disableInteractive>
            <Box className="flex items-center gap-1">
              <Typography variant="h5">5/5</Typography>
              <Image
                src="/images/energy.svg"
                alt="energy"
                width={24}
                height={24}
                className="dark-invert"
              />
            </Box>
          </Tooltip>
          <Box className="flex items-center gap-2">
            <Typography variant="h5">1000</Typography>
            <Image
              src="/images/coin_bag.svg"
              alt="coin bag"
              width={24}
              height={24}
              className="dark-invert"
            />
          </Box>

          <UserAvatar />
        </Box>
      </Card>
      <Sidebar open={sidebarOpen} onClose={toggleSidebar} />
    </header>
  );
});
