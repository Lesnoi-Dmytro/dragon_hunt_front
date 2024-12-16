import { Box } from "@mui/material";
import Image from "next/image";

export default function MainBackground({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box
      className="h-0 flex-1 relative p-4 md:p-12"
      sx={{ backgroundColor: "secondary.main" }}
    >
      <Box className="absolute bottom-4 left-4 mirror-x w-36 h-36 md:w-52 md:h-52">
        <Image
          className="w-full h-full"
          src="/images/dragon2.svg"
          alt="Dragon"
          sizes="(max-width: 768px) 208px, 144px"
          fill
        />
      </Box>
      <Box className="absolute top-4 right-4 w-36 h-36 md:w-52 md:h-52">
        <Image
          className="w-full h-full"
          src="/images/three_dragons.svg"
          alt="Dragon Breath"
          sizes="(max-width: 768px) 208px, 144px"
          fill
        />
      </Box>
      <Box className="absolute bottom-4 right-4 w-36 h-36 md:w-52 md:h-52">
        <Image
          className="w-full h-full"
          src="/images/goblin.svg"
          alt="Snake"
          sizes="(max-width: 768px) 208px, 144px"
          fill
        />
      </Box>
      <Box className="absolute top-4 left-4 w-36 h-36 md:w-52 md:h-52">
        <Image
          className="w-full h-full"
          src="/images/dragon3.svg"
          alt="Snake"
          sizes="(max-width: 768px) 208px, 144px"
          fill
        />
      </Box>
      <Box className="z-10 relative w-full h-full">{children}</Box>
    </Box>
  );
}
