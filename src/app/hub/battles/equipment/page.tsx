import EnemyBattles from "@/components/hub/battles/EnemyBattles";
import { EQUIPMENT_BATTLES } from "@/constants";
import { BattleType } from "@/types/battles/battleResponse";

export default async function EquipmentBattle() {
  return (
    <EnemyBattles
      type={BattleType.EQUIPMENT}
      skeletonLength={EQUIPMENT_BATTLES}
    />
  );
}
