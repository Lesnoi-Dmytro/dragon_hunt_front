"use client";

import { Card, Typography } from "@mui/material";
import Image from "next/image";

export default function MainHeader() {
  return (
    <header>
      <Card className="flex items-center gap-2 px-8 py-4">
        <Image src="/logo.svg" alt="Dragon" width={50} height={50} />
        <Typography variant="h4">Dragon Hunt</Typography>
      </Card>
    </header>
  );
}
