"use client";

import useUserStore from "@/stores/userStore";
import { apiClient } from "@/utils/axios/api";
import { Box, Button } from "@mui/material";

export default function Combat() {
  const updateEnergy = useUserStore((store) => store.updateEnergy);

  return (
    <Box className="h-full overflow-auto flex items-center justify-center">
      <Button
        variant="contained"
        onClick={async () => {
          await apiClient.post("users/me/spend");
          updateEnergy();
        }}
      >
        Spend Energy
      </Button>
    </Box>
  );
}
