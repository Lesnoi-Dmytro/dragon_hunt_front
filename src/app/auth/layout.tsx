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
      <Box className="flex flex-col items-center justify-center h-full">
        <Suspense
          fallback={
            <Skeleton
              className="w-96"
              height={460}
              sx={{ borderRadius: "1.5rem" }}
            />
          }
        >
          <Card
            className="w-[350px] md:w-[400px]"
            sx={{ borderRadius: "1.5rem" }}
          >
            <Box className="h-full overflow-auto p-10">{children}</Box>
          </Card>
        </Suspense>
      </Box>
    </MainBackground>
  );
}
