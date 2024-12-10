"use client";

import useUserStore from "@/stores/userStore";
import { apiClient } from "@/utils/axios/api";
import { Button } from "@mui/material";

export default function Combat() {
  const updateEnergy = useUserStore((store) => store.updateEnergy);

  return (
    <Button
      variant="contained"
      onClick={async () => {
        await apiClient.post("users/me/spend");
        updateEnergy();
      }}
    >
      Spend Energy
    </Button>
  );
}
