import styles from "@/styles/common/MainLayout.module.css";
import { Box } from "@mui/material";
import Image from "next/image";

export default function MainBackground({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box className="flex-1 relative" sx={{ backgroundColor: "secondary.main" }}>
      <Image
        className={`absolute bottom-4 left-4 mirror-x dark-invert ${styles["background-image"]}`}
        src="/images/dragon2.svg"
        alt="Dragon"
        width={200}
        height={200}
        priority={true}
      />
      <Image
        className={`absolute top-4 right-4 dark-invert ${styles["background-image"]}`}
        src="/images/three_dragons.svg"
        alt="Dragon Breath"
        width={200}
        height={200}
        priority={true}
      />
      <Image
        className={`absolute bottom-4 right-4 dark-invert ${styles["background-image"]}`}
        src="/images/goblin.svg"
        alt="Snake"
        width={200}
        height={200}
        priority={true}
      />
      <Image
        className={`absolute top-4 left-4 dark-invert ${styles["background-image"]}`}
        src="/images/dragon3.svg"
        alt="Snake"
        width={200}
        height={200}
        priority={true}
      />
      <Box className="z-10 relative w-full h-full">{children}</Box>
    </Box>
  );
}
