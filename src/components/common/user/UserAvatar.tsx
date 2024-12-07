import styles from "@/styles/common/MainHeader.module.css";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import MailIcon from "@mui/icons-material/Mail";
import DraftsIcon from "@mui/icons-material/Drafts";

import {
  Avatar,
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Skeleton,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function UserAvatar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [unreadMails, setUnreadMails] = useState<number>(9);

  return (
    <>
      <IconButton onClick={handleClick}>
        {false ? (
          <Avatar src="/" alt="Name" />
        ) : (
          <Skeleton variant="circular" width={40} height={40} />
        )}
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem className="iconed-text">
          {unreadMails ? (
            <Box className="relative">
              <MailIcon />
              <Chip
                label={unreadMails < 10 ? unreadMails : "9+"}
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
        <MenuItem className="iconed-text">
          <PersonIcon />
          Profile
        </MenuItem>
        <MenuItem className="iconed-text">
          <LogoutIcon />
          Log Out
        </MenuItem>
      </Menu>
    </>
  );
}
