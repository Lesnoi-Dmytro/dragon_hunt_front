import styles from "@/styles/common/MainLayout.module.css";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import MailIcon from "@mui/icons-material/Mail";
import DraftsIcon from "@mui/icons-material/Drafts";
import GroupIcon from "@mui/icons-material/Group";

import {
  Avatar,
  Box,
  Chip,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Skeleton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

export default function UserAvatar() {
  const { status, data: user } = useSession();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [unreadMails] = useState<number>(9);

  return (
    <>
      <IconButton onClick={handleClick}>
        {status !== "loading" && user ? (
          <Avatar src={user?.user?.image || ""}>
            {user?.user?.name?.charAt(0) || ""}
          </Avatar>
        ) : (
          <Skeleton variant="circular" width={40} height={40} />
        )}
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <Box className="px-4 pt-1 pb-2">
          {user?.user?.name ? (
            <Typography className="text-center">{user.user.name}</Typography>
          ) : (
            <Skeleton
              variant="rounded"
              width={"100%"}
              sx={{ fontSize: "1rem" }}
            />
          )}
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
          {unreadMails ? (
            <Box className="relative">
              <MailIcon />
              <Chip
                label={unreadMails < 10 ? unreadMails : 9}
                size="small"
                color="primary"
                className={styles["mail-unread"]}
              />
            </Box>
          ) : (
            <DraftsIcon />
          )}
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
