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
  CircularProgress,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { signOut } from "next-auth/react";
import useUserStore from "@/stores/userStore";

export default function UserAvatar() {
  const image = useUserStore((store) => store.image);
  const name = useUserStore((store) => store.name);
  const level = useUserStore((store) => store.level);
  const exp = useUserStore((store) => store.exp);
  const expNeeded = useUserStore((store) => store.expNeeded);
  const unreadMails = useUserStore((store) => store.unreadMails);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick} className="relative">
        <Avatar src={image}>{name.charAt(0)}</Avatar>
        <CircularProgress
          className="absolute"
          size={40}
          variant="determinate"
          thickness={4}
          value={(exp / expNeeded) * 100}
        />
        <Chip
          label={level}
          size="small"
          color="primary"
          sx={{
            color: "white",
          }}
          className="absolute bottom-0"
        />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <Box className="flex flex-col gap-2 px-4 pt-1 pb-2">
          <Typography className="text-center">{`${exp}/${expNeeded} exp`}</Typography>
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
