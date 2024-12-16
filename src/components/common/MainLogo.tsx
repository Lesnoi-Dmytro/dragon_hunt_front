import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default function MainLogo() {
  return (
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
  );
}
