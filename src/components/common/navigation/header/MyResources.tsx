import useUserStore from "@/stores/userStore";
import { Tooltip, Box, Typography } from "@mui/material";
import Image from "next/image";
import EnergyTimer from "./EnergyTimer";

export default function UserResources() {
  const energy = useUserStore((store) => store.energy);
  const gold = useUserStore((store) => store.gold);

  const energyElement = (
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
  );

  return (
    <>
      {energy === 5 ? (
        energyElement
      ) : (
        <Tooltip
          title={
            <Typography>
              <EnergyTimer /> left
            </Typography>
          }
          arrow={true}
          disableInteractive
        >
          {energyElement}
        </Tooltip>
      )}
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
