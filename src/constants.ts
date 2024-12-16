import { BattleDifficulty } from "@/types/battles/battleResponse";

export const RESOURCES_BATTLES = 3;
export const EQUIPMENT_BATTLES = 3;

export const BATTLE_DIFICULTIES = [
  {
    difficulty: BattleDifficulty.NORMAL,
    image: "/images/skull.svg",
    open: true,
  },
  {
    difficulty: BattleDifficulty.HARD,
    image: "/images/skull.svg",
    open: false,
  },
  {
    difficulty: BattleDifficulty.EXTREME,
    image: "/images/skull.svg",
    open: false,
  },
];
