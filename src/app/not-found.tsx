"use client";

import MainBackground from "@/components/common/MainBackground";
import { Box, Button, Card, Typography } from "@mui/material";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function NotFound() {
  return (
    <MainBackground hideGoblin>
      <Box className="w-[250px] h-[200px] md:w-[500px] md:h-[401px] 2xl:w-[40vw] 2xl:h-[33.5vw] absolute top-1/3 2xl:top-1/3 right-0">
        <Image
          src="/images/tentacle_big_part.svg"
          alt="tentacle"
          sizes="(min-width: 1536px) 40vw, (min-width: 758px) 500px, 250px"
          className="animate-tentacle-fade-in fill-mode-forwards"
          fill
        />
      </Box>

      <Box className="flex items-center justify-center h-full">
        <Card
          className="p-8 flex flex-col items-center gap-6 w-80 sm:w-[600px] relative top-0 left-0 pull-right-small md:animate-pull-right"
          sx={{ overflow: "visible", animationFillMode: "forwards" }}
        >
          <Box className=" flex flex-col md:flex-row gap-4 items-center">
            <Image
              src="/images/fairy.svg"
              width={200}
              height={200}
              alt="fairy"
            />
            <Box className="flex flex-col gap-4 items-center">
              <Typography variant="h4" className="text-center">
                Dear travaler!
              </Typography>
              <Typography variant="h6" className="text-center">
                You have ventured too deep and lost your way in the dungeon. The
                shadows shift, and the Greater Depth watches — let me guide you
                out before its presence drives you mad!
              </Typography>
            </Box>
          </Box>
          <Button
            onClick={() => redirect("/hub/battles/resources")}
            className="animate-follow-button-fade-out fill-mode-forwards"
          >
            Follow the fairy
          </Button>

          <Box className="w-[150px] h-[127px] md:w-[200] md:h-[167px] absolute top-1/4 left-[-75px] fill-mode-forwards">
            <Image
              src="/images/tentacle_small_part.svg"
              alt="tentacle"
              sizes="(min-width: 758px) 200px, 150px"
              className="animate-tentacle-fade-in"
              fill
            />
          </Box>
        </Card>
      </Box>
    </MainBackground>
  );
}
