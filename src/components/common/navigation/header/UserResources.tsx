import useUserStore from "@/stores/userStore";
import { Tooltip, Box, Typography } from "@mui/material";
import Image from "next/image";

export default function UserResources() {
  const energy = useUserStore((store) => store.energy);
  const gold = useUserStore((store) => store.gold);

  return (
    <>
      <Tooltip title="21:29 left" arrow={true} disableInteractive>
        <Box className="flex items-center gap-1">
          <Typography variant="h5">{energy}/5</Typography>
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
        <Typography variant="h5">{gold}</Typography>
        <Image
          src="/images/coin_bag.svg"
          alt="coin bag"
          width={24}
          height={24}
          className="dark-invert"
        />
      </Box>
    </>
  );
}
