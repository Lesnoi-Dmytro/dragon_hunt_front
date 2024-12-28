"use client";

import EntityChip from "@/components/common/EntityChip";
import LoadingButton from "@/components/common/LoadingButton";
import { BATTLE_DIFICULTIES } from "@/constants";
import {
  BattleResponse,
  BattleDifficulty,
} from "@/interfaces/battles/battleResponse";
import useUserStore from "@/stores/userStore";
import { apiClient } from "@/utils/axios/api";
import {
  Card,
  Box,
  Tooltip,
  Typography,
  Skeleton,
  Select,
  MenuItem,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  battle: BattleResponse;
};

export default function EnemyBattle({ battle }: Props) {
  const router = useRouter();

  const userLevel = useUserStore((store) => store.level);
  const userEnergy = useUserStore((store) => store.energy);
  const disabled = battle.level > userLevel || battle.energy > userEnergy;

  const [difficulty, setDifficulty] = useState<BattleDifficulty>(
    BattleDifficulty.NORMAL
  );

  const [starting, setStarting] = useState(false);
  const startBattle = async (id: number) => {
    setStarting(true);
    try {
      const battleResponse = await apiClient.post(`/battles/${id}/start`, {
        difficulty,
      });

      router.push(`/combat/enemies/${battleResponse.data.combatId}`);
    } finally {
      setStarting(false);
    }
  };

  return (
    <Card
      variant="outlined"
      className="w-full p-4 flex flex-col gap-4 flex-shrink-0"
      sx={{ borderRadius: "1rem" }}
    >
      <Box className="flex gap-2">
        <Typography variant="h5">{battle.name}</Typography>
        <Typography
          variant="h5"
          color={battle.level > userLevel ? "error" : "primary"}
        >
          (Lv.{battle.level})
        </Typography>
      </Box>

      <Box className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Box className="flex gap-2">
          <Skeleton variant="rounded" width={60} height={60} />
          <Skeleton variant="rounded" width={60} height={60} />
          <Skeleton variant="rounded" width={60} height={60} />
        </Box>

        <Box className="flex gap-2">
          {battle.opponents.map((opponent) => (
            <Tooltip key={opponent.id} title={opponent.name} disableInteractive>
              <Box>
                <EntityChip
                  imageId={opponent.imageId}
                  name={opponent.name}
                  size={60}
                  battle={false}
                />
              </Box>
            </Tooltip>
          ))}
        </Box>
      </Box>

      <Box className="flex items-center justify-between gap-4">
        <Select
          value={difficulty}
          onChange={(event) =>
            setDifficulty(event.target.value as BattleDifficulty)
          }
          disabled={disabled}
          size="small"
          className="w-40"
        >
          {BATTLE_DIFICULTIES.map((difficulty) => (
            <MenuItem
              key={difficulty.difficulty}
              value={difficulty.difficulty}
              disabled={!difficulty.open}
            >
              <Box className="flex gap-1">
                {difficulty.difficulty}
                <Image
                  src={difficulty.image}
                  alt="Skull"
                  width={23}
                  height={23}
                />
              </Box>
            </MenuItem>
          ))}
        </Select>

        <LoadingButton
          className="w-20 md:w-36 h-10 text-lg self-end"
          variant="contained"
          disabled={disabled}
          sx={{ fontSize: "1.125rem" }}
          onClick={() => startBattle(battle.id)}
          loading={starting}
        >
          {battle.energy}
          <Image src="/images/energy.svg" alt="energy" width={18} height={18} />
        </LoadingButton>
      </Box>
    </Card>
  );
}
