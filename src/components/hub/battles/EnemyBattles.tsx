"use client";

import EnemyBattle from "@/components/hub/battles/EnemyBattle";
import EnemyBattleSketeton from "@/components/hub/battles/EnemyBattleSkeleton";
import type {
  BattleResponse,
  BattleType,
} from "@/types/battles/battleResponse";
import { apiClient } from "@/utils/axios/api";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

type Props = {
  type: BattleType;
  skeletonLength: number;
};

export default function EnemyBattles({ type, skeletonLength }: Props) {
  const [battles, setBattles] = useState<BattleResponse[]>([]);

  useEffect(() => {
    async function fetchBattles() {
      const battleResponse = await apiClient.get<BattleResponse[]>("/battles", {
        params: { type },
      });

      setBattles(battleResponse.data);
    }

    fetchBattles();
  }, [type]);

  return (
    <Box className="h-0 flex-1 overflow-auto flex flex-col gap-4">
      {battles.length
        ? battles.map((battle) => (
            <EnemyBattle battle={battle} key={battle.id} />
          ))
        : Array.from({ length: skeletonLength }).map((_, i) => (
            <EnemyBattleSketeton key={i} />
          ))}
    </Box>
  );
}
