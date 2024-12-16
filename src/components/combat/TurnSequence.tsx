"use client";

import Entity from "@/components/common/EntityChip";
import useCombatStore from "@/stores/combatStore";
import { Box } from "@mui/material";

export default function TurnSequence() {
  const turnSequence = useCombatStore((store) => store.turnSequence);
  const currentActive = useCombatStore((store) => store.currentActive);

  return (
    <Box className="flex gap-2">
      {turnSequence.map((entity) => (
        <Entity
          key={entity.id}
          imageId={entity.imageId}
          name={entity.name}
          dead={entity.action && !entity.movement}
          active={entity.id === currentActive?.entity.id}
        />
      ))}
    </Box>
  );
}
