import ItemChip from "@/components/common/ItemChip";
import { CombatBattlefieldCharacter } from "@/types/combat/combatBattlefield";
import { firstUpperCase } from "@/utils/nameUrils";
import { Box, Tooltip, Typography } from "@mui/material";

type Props = {
  character: CombatBattlefieldCharacter;
  children: React.ReactElement;
};

export default function CharacterTooltip({ character, children }: Props) {
  return (
    <Tooltip
      title={
        <Box>
          <Box className="flex gap-1">
            <Typography fontWeight="bold" fontSize="large">
              {character.name}
            </Typography>
            <Typography fontWeight="bold" fontSize="large">
              Lv. {character.level}
            </Typography>
          </Box>
          <Typography>{firstUpperCase(character.class)}</Typography>
          <Typography>
            HP: {character.currentHp}/{character.hp}
          </Typography>
          <Typography>
            Def: {character.defense + character.armor.defense}
          </Typography>
          <Typography>
            Atk: {character.attack + character.weapon.attack}
          </Typography>
          <Typography>Range: {character.weapon.attackRange}</Typography>
          <Typography>Speed: {character.speed}</Typography>
          <Box className="flex gap-2">
            <ItemChip
              imageId={character.weapon.imageId}
              name={character.weapon.name}
              size={30}
            />
            <ItemChip
              imageId={character.armor.imageId}
              name={character.weapon.name}
              size={30}
            />
          </Box>
        </Box>
      }
      enterTouchDelay={1000}
      enterDelay={2000}
      placement="right"
    >
      {children}
    </Tooltip>
  );
}
