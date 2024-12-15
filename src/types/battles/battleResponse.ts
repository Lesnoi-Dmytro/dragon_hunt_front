export interface BattleResponse {
  id: number;
  level: number;
  name: string;
  type: BattleType;
  energy: number;
  opponents: BattleOpponent[];
}

export enum BattleType {
  RESOURCES,
  EQUIPMENT,
}

export enum BattleDifficulty {
  NORMAL = "Normal",
  HARD = "Hard",
  EXTREME = "Extreme",
}

export interface BattleOpponent {
  id: number;
  name: string;
  imageId: number;
}
