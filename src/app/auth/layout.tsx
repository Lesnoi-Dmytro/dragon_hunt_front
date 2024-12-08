import MainBackground from "@/components/common/MainBackground";
import { Card, Box, Skeleton } from "@mui/material";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MainBackground>
      <Box className="flex items-center justify-center h-full">
        <Suspense
          fallback={
            <Skeleton
              className="w-4/5 md:w-2/5"
              height={460}
              sx={{ borderRadius: "1.5rem" }}
            />
          }
        >
          <Card
            className="w-4/5 md:w-2/5 lg:w-1/4"
            sx={{ borderRadius: "1.5rem" }}
          >
            <Box className="p-10">{children}</Box>
          </Card>
        </Suspense>
      </Box>
    </MainBackground>
  );
}
