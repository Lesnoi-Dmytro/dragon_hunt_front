import MainBackground from "@/components/common/MainBackground";
import { Card, Box } from "@mui/material";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MainBackground>
      <Box className="flex items-center justify-center h-full">
        <Card
          className="w-4/5 md:w-2/5 lg:w-1/4"
          sx={{ borderRadius: "1.5rem" }}
        >
          <Box className="p-10">{children}</Box>
        </Card>
      </Box>
    </MainBackground>
  );
}
