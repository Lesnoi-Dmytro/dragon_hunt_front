import { Box } from "@mui/material";
import Image from "next/image";

type Props = {
  imageId: number;
  name?: string;
  size?: number;
};

export default function ItemChip({ imageId, name, size = 60 }: Props) {
  if (!name) {
    name = `item ${imageId}`;
  }

  return (
    <Box
      className="relative"
      sx={{
        width: size,
        height: size,
      }}
    >
      <Image
        src={`/api/images/${imageId}`}
        alt={name}
        className="bg-gray-200 rounded-lg"
        sizes={`${35}px, (max-width: 768px) ${size}px`}
        objectFit="cover"
        fill
      />
    </Box>
  );
}
