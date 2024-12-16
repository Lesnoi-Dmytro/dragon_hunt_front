import Battlefield from "@/components/combat/Battlefield";
import { TurnOptions } from "@/components/combat/TurnOptions";
import TurnSequence from "@/components/combat/TurnSequence";
import { CombatBattlefield } from "@/types/combat/combatBattlefield";
import { apiServer } from "@/utils/axios/api";
import { Box } from "@mui/material";

export default async function Combat({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const battlefield = await apiServer.get<CombatBattlefield>(
    `/combats/enemies/${id}`
  );

  return (
    <Box className="flex flex-col justify-between items-center h-full gap-4">
      <TurnSequence />
      <Battlefield initialBattlefield={battlefield.data} />
      <TurnOptions />
    </Box>
  );
}
