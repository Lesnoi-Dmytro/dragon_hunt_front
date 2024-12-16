"use client";

import { Entities } from "@/components/combat/Entities";
import { FieldCell } from "@/components/combat/FieldCell";
import useCombatStore from "@/stores/combatStore";
import { CombatBattlefield } from "@/types/combat/combatBattlefield";
import { Box, Skeleton } from "@mui/material";
import { useEffect } from "react";

type Props = {
  initialBattlefield: CombatBattlefield;
};

export default function Battlefield({ initialBattlefield }: Props) {
  const battleGrid = useCombatStore((store) => store.battleGrid);
  const setBattlefield = useCombatStore((store) => store.setBattlefield);
  const findCurrentActive = useCombatStore((store) => store.findCurrentActive);

  useEffect(() => {
    setBattlefield(initialBattlefield);
    findCurrentActive();
  }, [findCurrentActive, initialBattlefield, setBattlefield]);

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
        <Skeleton variant="rectangular" width={704} height={440} />
      )}
    </Box>
  );
}
