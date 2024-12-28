import { CellVariant } from "@/components/combat/FieldCell";
import { AttackType } from "@/interfaces/character/attackType";
import type {
  CombatBattlefield,
  CombatBattlefieldCharacter,
  CombatBattlefieldEnemy,
  CombatBattlefieldEntity,
} from "@/interfaces/combat/combatBattlefield";

import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

export interface GridCell {
  entity?: CombatBattlefieldEntity;
  variant: CellVariant;
}
interface currentActive {
  entity: CombatBattlefieldEntity;
  enemy?: CombatBattlefieldEnemy;
  character?: CombatBattlefieldCharacter;
}

interface CombatStore {
  battlefield?: CombatBattlefield;
  battleGrid: GridCell[][];
  currentActive: currentActive | null;
  turnSequence: CombatBattlefieldEntity[];
  setBattlefield: (battlefield: CombatBattlefield) => void;
  findCurrentActive: () => void;
  targetEnemy: (enemy: CombatBattlefieldEnemy) => void;
  targetAlly: (ally: CombatBattlefieldCharacter) => void;
  resetTarget: () => void;
}

const canReach = (
  currentActive: CombatBattlefieldEntity,
  target: CombatBattlefieldEntity,
  attackType: AttackType,
  attackRange: number
) => {
  if (attackType === AttackType.RANGED) {
    const distance =
      Math.abs(currentActive.x - target.x) +
      Math.abs(currentActive.y - target.y);

    return distance <= attackRange;
  } else {
    for (let i = -attackRange; i <= attackRange; i++) {
      for (let j = -attackRange - i; j <= attackRange + i; j++) {
        if (
          currentActive.x + i === target.x &&
          currentActive.y + j === target.y
        ) {
          return true;
        }
      }
    }

    return false;
  }
};

const combatStore: StateCreator<CombatStore, [["zustand/devtools", never]]> = (
  set
) => ({
  battleGrid: [],
  currentActive: null,
  turnSequence: [],
  setBattlefield: (battlefield: CombatBattlefield) => {
    const battleGrid = Array.from({ length: battlefield.ySize }).map(() =>
      Array.from({ length: battlefield.xSize }).map(() => ({
        variant: CellVariant.UNREACHABLE,
      }))
    );

    battlefield.characters.forEach((entity) => {
      battleGrid[entity.y][entity.x] = {
        entity,
        variant: CellVariant.UNREACHABLE,
      } as GridCell;
    });
    battlefield.enemies.forEach((entity) => {
      battleGrid[entity.y][entity.x] = {
        entity,
        variant: CellVariant.UNREACHABLE,
      } as GridCell;
    });

    set(
      {
        battlefield,
        battleGrid,
        turnSequence: [...battlefield.characters, ...battlefield.enemies].sort(
          (a, b) => b.speed - a.speed
        ),
      },
      false,
      "setBattlefield"
    );
  },
  findCurrentActive() {
    set(
      (prev) => {
        const active = [
          ...(prev.battlefield?.characters || []),
          ...(prev.battlefield?.enemies || []),
        ]
          .filter((entity) => !entity.action || entity.movement)
          .sort((a, b) => b.speed - a.speed)
          .shift();

        if (!active) {
          for (const array of prev.battleGrid) {
            for (const cell of array) {
              cell.variant = CellVariant.UNREACHABLE;
            }
          }

          return { currentActive: null };
        }

        const enemy = prev.battlefield?.enemies?.find(
          (enemy) => enemy.id === active?.id
        );
        const character = prev.battlefield?.characters?.find(
          (character) => character.id === active?.id
        );
        const currentActive = { entity: active, enemy, character };

        if (currentActive.enemy) {
          for (const array of prev.battleGrid) {
            for (const cell of array) {
              cell.variant = CellVariant.UNREACHABLE;
            }
          }

          return {
            currentActive: currentActive || null,
            battleGrid: [...prev.battleGrid],
          };
        } else {
          prev.battleGrid.forEach((array, i) => {
            array.forEach((cell, j) => {
              if (cell.entity) {
                prev.battleGrid[i][j].variant = CellVariant.UNREACHABLE;
                return;
              }

              const distance =
                Math.abs(i - currentActive.entity.y) +
                Math.abs(j - currentActive.entity.x);
              if (distance <= currentActive.entity.movement) {
                prev.battleGrid[i][j].variant = CellVariant.MOVE;
              } else {
                prev.battleGrid[i][j].variant = CellVariant.UNREACHABLE;
              }
            });
          });
        }

        return {
          currentActive,
          battleGrid: [...prev.battleGrid],
        };
      },
      false,
      "findCurrentActive"
    );
  },
  targetEnemy: (enemy: CombatBattlefieldEnemy) => {
    set(
      (prev) => {
        const currentActive = prev.currentActive;
        if (!currentActive?.character) {
          return {};
        }

        const character = currentActive.character;
        if (
          canReach(
            character,
            enemy,
            character.weapon.type,
            character.weapon.attackRange
          )
        ) {
          prev.battleGrid[enemy.y][enemy.x].variant = CellVariant.ENEMY_TARGET;

          return {
            battleGrid: [...prev.battleGrid],
          };
        }

        return {};
      },
      false,
      "targetEnemy"
    );
  },
  targetAlly: () => {},
  resetTarget: () => {
    set(
      (prev) => {
        const battleGrid = [...prev.battleGrid];
        let changed = false;
        for (const array of battleGrid) {
          for (const cell of array) {
            if (
              cell.variant === CellVariant.ENEMY_TARGET ||
              cell.variant === CellVariant.ALLY_TARGET
            ) {
              cell.variant = CellVariant.UNREACHABLE;
              changed = true;
            }
          }
        }

        if (changed) {
          return { battleGrid };
        } else {
          return {};
        }
      },
      false,
      "resetTarget"
    );
  },
});

const useCombatStore = create<CombatStore>()(
  devtools(combatStore, { name: "combatStore" })
);

export default useCombatStore;
