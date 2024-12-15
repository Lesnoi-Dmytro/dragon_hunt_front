import EnemyBattle from "@/components/battles/EnemyBattle";
import EnemyBattleSketeton from "@/components/battles/EnemyBattleSkeleton";
import { RESOURCES_BATTLES } from "@/constants";
import { BattleResponse, BattleType } from "@/types/battles/battleResponse";
import { apiServerCached } from "@/utils/axios/api";
import { Box } from "@mui/material";
import { Suspense } from "react";

export default async function Combat() {
  const battlesResponse = await apiServerCached.get<BattleResponse[]>(
    "/battles",
    {
      params: {
        type: BattleType.RESOURCES,
      },
    }
  );
  const battles = battlesResponse.data;

  return (
    <Box className="h-0 flex-1 overflow-auto flex flex-col gap-4">
      <Suspense
        fallback={
          <>
            {Array.from({ length: RESOURCES_BATTLES }).map((_, i) => (
              <EnemyBattleSketeton key={i} />
            ))}
          </>
        }
      >
        {battles.map((battle) => (
          <EnemyBattle battle={battle} key={battle.id} />
        ))}
      </Suspense>
    </Box>
  );
}

export const dynamic = "force-dynamic";
export const revalidate = 86400;
