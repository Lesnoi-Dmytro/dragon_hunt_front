import type { CombatBattlefieldEnemy } from "@/interfaces/combat/combatBattlefield";
import { Box, Tooltip, Typography } from "@mui/material";

type Props = {
  enemy: CombatBattlefieldEnemy;
  children: React.ReactElement;
};

export default function EnemyTooltip({ enemy, children }: Props) {
  return (
    <Tooltip
      title={
        <Box>
          <Box className="flex gap-1">
            <Typography fontWeight="bold" fontSize="large">
              {enemy.name}
            </Typography>
            <Typography fontWeight="bold" fontSize="large">
              Lv. {enemy.level}
            </Typography>
          </Box>
          <Typography>
            HP: {enemy.currentHp}/{enemy.hp}
          </Typography>
          <Typography>Def: {enemy.defense}</Typography>
          <Typography>Atk: {enemy.attack}</Typography>
          {/* <Typography>Range: {enemy.attackRange}</Typography> */}
          <Typography>Speed: {enemy.speed}</Typography>
        </Box>
      }
      enterTouchDelay={1000}
      enterDelay={2000}
      placement="right"
      disableInteractive
    >
      {children}
    </Tooltip>
  );
}
