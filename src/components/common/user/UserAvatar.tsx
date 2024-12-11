import { Avatar, Box, Skeleton } from "@mui/material";
import { grey } from "@mui/material/colors";
import { memo } from "react";

type Props = {
  src: string | undefined;
  name: string;
  loaded: boolean;
};

export default memo(function UserAvatar({ src, name, loaded }: Props) {
  return loaded ? (
    <Box className="w-10 h-10 rounded-full" sx={{ backgroundColor: grey[300] }}>
      <Avatar src={src} alt={name}>
        {name.charAt(0)}
      </Avatar>
    </Box>
  ) : (
    <Skeleton variant="circular" width={40} height={40} />
  );
});