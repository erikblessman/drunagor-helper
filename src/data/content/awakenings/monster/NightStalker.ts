import ImageUrl from "@/assets/monster/big/NightStalkerBig.webp";
import { Bleeding, Slow, Stealth } from "@/data/conditions/Condition";
import type { MonsterData } from "@/data/store/MonsterData";
import type { ContentId } from "@/data/type/ContentId";
import type { MonsterColor } from "@/data/type/MonsterColor";
import type { VariantId } from "@/data/type/VariantId";

export class NightStalker implements MonsterData {
  id = "night-stalker";
  name = "Night Stalker";
  content: ContentId = "awakenings";
  variants: VariantId[] = ["standard", "alternate"];
  images = {
    big: ImageUrl,
    miniature: "",
  };
  color: MonsterColor = "gray";
  size = "small";
  conditionImmunities = [ Bleeding, Slow, Stealth, ];
}
