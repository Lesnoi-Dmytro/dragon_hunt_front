import EnemyBattles from "@/components/hub/battles/EnemyBattles";
import { RESOURCES_BATTLES } from "@/constants";
import { BattleType } from "@/interfaces/battles/battleResponse";

export default async function ResoursesBattle() {
  return (
    <EnemyBattles
      type={BattleType.RESOURCES}
      skeletonLength={RESOURCES_BATTLES}
    />
  );
}
