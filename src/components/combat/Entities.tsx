import CharacterTooltip from "@/components/combat/CharacterTooltip";
import EnemyTooltip from "@/components/combat/EnemyTooltip";
import EntityChip, { EntityVariant } from "@/components/common/EntityChip";
import useCombatStore from "@/stores/combatStore";
import { Box } from "@mui/material";

export function Entities() {
  const enemies = useCombatStore((store) => store.battlefield?.enemies);
  const characters = useCombatStore((store) => store.battlefield?.characters);
  const currentActive = useCombatStore((store) => store.currentActive);
  const targerEnemy = useCombatStore((store) => store.targetEnemy);
  const resetTarget = useCombatStore((store) => store.resetTarget);

  return (
    <Box>
      {characters?.map((character) => (
        <CharacterTooltip character={character} key={character.id}>
          <Box
            className="absolute"
            sx={{ top: 2 + 44 * character.y, left: 2 + 44 * character.x }}
          >
            <EntityChip
              imageId={character.imageId}
              name={character.name}
              active={currentActive?.entity.id === character.id}
              hp={(character.currentHp / character.hp) * 100}
            />
          </Box>
        </CharacterTooltip>
      ))}
      {enemies?.map((enemy) => (
        <EnemyTooltip enemy={enemy} key={enemy.id}>
          <Box
            className="absolute"
            sx={{
              top: 2 + 44 * enemy.y,
              left: 2 + 44 * enemy.x,
              ":hover:": {
                backgroundColor: "error.dark",
              },
            }}
            key={enemy.id}
            onMouseEnter={() => targerEnemy(enemy)}
            onMouseLeave={resetTarget}
          >
            <EntityChip
              imageId={enemy.imageId}
              name={enemy.name}
              active={currentActive?.entity.id === enemy.id}
              hp={(enemy.currentHp / enemy.hp) * 100}
              dead={enemy.currentHp === 0}
              variant={EntityVariant.ENEMY}
            />
          </Box>
        </EnemyTooltip>
      ))}
    </Box>
  );
}
