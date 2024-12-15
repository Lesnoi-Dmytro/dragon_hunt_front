"use client";

import Entity from "@/components/common/Entity";
import useUserStore from "@/stores/userStore";
import {
  BattleDifficulty,
  BattleResponse,
} from "@/types/battles/battleResponse";
import {
  Card,
  Box,
  Tooltip,
  Typography,
  Button,
  Skeleton,
  Select,
  MenuItem,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";

type Props = {
  battle: BattleResponse;
};

export default function EnemyBattle({ battle }: Props) {
  const userLevel = useUserStore((store) => store.level);
  const userEnergy = useUserStore((store) => store.energy);

  const [difficulty, setDifficulty] = useState<BattleDifficulty>(
    BattleDifficulty.NORMAL
  );

  const dissabled = battle.level > userLevel || battle.energy > userEnergy;

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
                <Entity
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
          disabled={dissabled}
          size="small"
          className="w-40"
        >
          <MenuItem value={BattleDifficulty.NORMAL}>
            <Box className="flex gap-1">
              {BattleDifficulty.NORMAL}
              <Image
                src="/images/skull.svg"
                alt="Skull"
                width={18}
                height={18}
              />
            </Box>
          </MenuItem>
          <MenuItem value={BattleDifficulty.HARD} disabled={true}>
            <Box className="flex gap-1">
              {BattleDifficulty.HARD}
              <Image
                src="/images/skull.svg"
                alt="Skull"
                width={18}
                height={18}
              />
            </Box>
          </MenuItem>
          <MenuItem value={BattleDifficulty.EXTREME} disabled={true}>
            <Box className="flex gap-1">
              {BattleDifficulty.EXTREME}
              <Image
                src="/images/skull.svg"
                alt="Skull"
                width={18}
                height={18}
              />
            </Box>
          </MenuItem>
        </Select>

        <Button
          className="w-20 md:w-36 h-10 text-lg self-end"
          variant="contained"
          disabled={dissabled}
          sx={{ fontSize: "1.125rem" }}
        >
          {battle.energy}
          <Image src="/images/energy.svg" alt="energy" width={18} height={18} />
        </Button>
      </Box>
    </Card>
  );
}
