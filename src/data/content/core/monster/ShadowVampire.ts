import ImageUrl from "@/assets/monster/big/ShadowVampireBig.webp";
import MiniatureUrl from "@/assets/monster/miniature/ShadowVampireMiniature.webp";
import { KnockDown, Stealth } from "@/data/conditions/Condition";
import type { MonsterData } from "@/data/store/MonsterData";
import type { ContentId } from "@/data/type/ContentId";
import type { MonsterColor } from "@/data/type/MonsterColor";
import type { VariantId } from "@/data/type/VariantId";
import RookieStandardUrl from "@/assets/monster/cards/gray-rookie-shadow-vampire-standard.jpg";
import RookieAlternateUrl from "@/assets/monster/cards/gray-rookie-shadow-vampire-alternate.jpg";

export class ShadowVampire implements MonsterData {
  id = "shadow-vampire";
  name = "Shadow Vampire";
  content: ContentId = "core";
  variants: VariantId[] = ["standard", "alternate"];
  images = {
    big: ImageUrl,
    miniature: MiniatureUrl,
    cards: [RookieStandardUrl,RookieAlternateUrl],
  };
  color: MonsterColor = "gray";
  size = "small";
  conditionImmunities = [ KnockDown, Stealth, ];
}
