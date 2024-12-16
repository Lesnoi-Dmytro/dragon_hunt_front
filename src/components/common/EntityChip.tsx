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
  active?: boolean;
  hp?: number;
  dead?: boolean;
  size?: number;
};

export default function Entity({
  imageId,
  name = "",
  variant = EntityVariant.REGULAR,
  battle = true,
  active = false,
  hp,
  dead = false,
  size = 40,
}: Props) {
  return (
    <Box
      className={`relative ${dead ? "opacity-50" : ""}`}
      sx={{
        width: size,
        height: size,
      }}
    >
      <Image
        src={`/api/images/${imageId}`}
        alt={name}
        className="bg-gray-200 rounded-full"
        style={{
          boxShadow: active ? "0 0 10px 2px black" : "",
        }}
        sizes={`${35}px, (max-width: 768px) ${size}px`}
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
