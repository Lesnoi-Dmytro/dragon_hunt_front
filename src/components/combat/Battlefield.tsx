"use client";

import { Entities } from "@/components/combat/Entities";
import { FieldCell } from "@/components/combat/FieldCell";
import useCombatStore from "@/stores/combatStore";
import { CombatBattlefield } from "@/types/combat/combatBattlefield";
import { apiClient } from "@/utils/axios/api";
import { Box, CircularProgress } from "@mui/material";
import { useEffect } from "react";

type Props = {
  id: string;
};

export default function Battlefield({ id }: Props) {
  const battleGrid = useCombatStore((store) => store.battleGrid);
  const setBattlefield = useCombatStore((store) => store.setBattlefield);
  const findCurrentActive = useCombatStore((store) => store.findCurrentActive);

  useEffect(() => {
    async function fetchBattlefield() {
      const battlefield = await apiClient.get<CombatBattlefield>(
        `/combats/enemies/${id}`
      );
      setBattlefield(battlefield.data);
      findCurrentActive();
    }

    fetchBattlefield();
  }, [id, setBattlefield, findCurrentActive]);

  return (
    <Box className="relative">
      {battleGrid.length ? (
        <>
          {battleGrid.map((array, i) => (
            <Box className="flex" key={i}>
              {array.map((variant, j) => (
                <FieldCell key={j} variant={variant.variant} />
              ))}
            </Box>
          ))}
          <Entities />
        </>
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
}
