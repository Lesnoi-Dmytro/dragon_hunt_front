import { Box, CircularProgress } from "@mui/material";
import { red } from "@mui/material/colors";
import Image from "next/image";

export enum EntityVariant {
  REGULAR,
  ENEMY,
}

type Props = {
  imageId: number;
  variant?: EntityVariant;
  name?: string;
  battle?: boolean;
  hp?: number;
  size?: number;
};

export default function Entity({
  imageId,
  name = "",
  variant = EntityVariant.REGULAR,
  battle = true,
  hp = 100,
  size = 60,
}: Props) {
  return (
    <Box
      className={`relative ${battle && hp === 0 ? "opacity-50" : ""}`}
      sx={{ width: size, height: size }}
    >
      <Image
        src={`/api/images/${imageId}`}
        alt={name}
        className="bg-gray-200 rounded-full overflow-hidden"
        sizes="35px, (max-width: 768px) 60px"
        fill
      />
      {battle && (
        <CircularProgress
          value={hp}
          size="100%"
          variant="determinate"
          className="absolute top-0 left-0 w-full h-full"
          sx={
            variant === EntityVariant.ENEMY
              ? {
                  ".MuiCircularProgress-svg": {
                    color: red[900],
                  },
                }
              : {}
          }
        />
      )}
    </Box>
  );
}
