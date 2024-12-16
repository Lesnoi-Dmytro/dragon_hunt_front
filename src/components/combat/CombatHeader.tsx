import MainLogo from "@/components/common/MainLogo";
import { Box, Card } from "@mui/material";

export default function CombatHeader() {
  return (
    <header>
      <Card className="flex items-center justify-between px-4 md:px-8 py-4 gap-4">
        <Box className="flex items-center gap-4">
          <MainLogo />
        </Box>
      </Card>
    </header>
  );
}
