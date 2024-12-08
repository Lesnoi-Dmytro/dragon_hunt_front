"use client";

import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import DraftsIcon from "@mui/icons-material/Drafts";
import GroupIcon from "@mui/icons-material/Group";

import {
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Skeleton,
} from "@mui/material";
import { useState } from "react";
import { signOut } from "next-auth/react";

export default function UserAvatarSkeleton() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <Skeleton variant="circular" width={40} height={40} />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <Box className="px-4 pt-1 pb-2">
          <Skeleton
            variant="rounded"
            width={"100%"}
            sx={{ fontSize: "1rem" }}
          />
        </Box>

        <Divider flexItem />
        <MenuItem className="iconed-text">
          <PersonIcon />
          Profile
        </MenuItem>
        <MenuItem className="iconed-text">
          <GroupIcon />
          Friends
        </MenuItem>
        <MenuItem className="iconed-text">
          <DraftsIcon />
          Mail
        </MenuItem>
        <MenuItem className="iconed-text" onClick={() => signOut()}>
          <LogoutIcon />
          Log Out
        </MenuItem>
      </Menu>
    </>
  );
}
