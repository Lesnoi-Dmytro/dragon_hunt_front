"use client";

import { Box, Card, Tab, Tabs } from "@mui/material";
import { redirect, usePathname } from "next/navigation";

export default function BattleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <Box className="h-full flex items-center justify-center">
      <Card
        className="w-80 h-full md:w-[600px] px-8 py-4 rounded-2xl flex flex-col gap-4"
        sx={{ borderRadius: "1.5rem" }}
      >
        <Tabs
          value={pathname}
          onChange={(_, value: string) => {
            redirect(value);
          }}
          variant="fullWidth"
        >
          <Tab value={"/hub/battles/resources"} label={"Resources"} />
          <Tab value={"/hub/battles/equipment"} label={"Equipment"} />
          <Tab value={"/hub/battles/arena"} label="Arena" />
          <Tab value={"/hub/battles/bosses"} label="Bosses" />
        </Tabs>
        {children}
      </Card>
    </Box>
  );
}
