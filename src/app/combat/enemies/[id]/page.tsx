import Battlefield from "@/components/combat/Battlefield";
import { TurnOptions } from "@/components/combat/TurnOptions";
import TurnSequence from "@/components/combat/TurnSequence";
import { Box } from "@mui/material";

export default async function Combat({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Box className="flex flex-col justify-between items-center h-full gap-4">
      <TurnSequence />
      <Battlefield id={id} />
      <TurnOptions />
    </Box>
  );
}
