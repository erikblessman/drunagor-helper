import ImageUrl from "@/assets/monster/big/CorruptedWormBig.webp";
import { KnockDown, Stealth } from "@/data/conditions/Condition";
import type { MonsterData } from "@/data/store/MonsterData";
import type { ContentId } from "@/data/type/ContentId";
import type { MonsterColor } from "@/data/type/MonsterColor";
import type { VariantId } from "@/data/type/VariantId";
import RookieStandardUrl from "@/assets/monster/cards/gray-rookie-corrupted-worm-standard.jpg";
import RookieAlternateUrl from "@/assets/monster/cards/gray-rookie-corrupted-worm-alternate.jpg";
import InitiativePlaces from "@/data/InitiativePlaces";

export class CorruptedWorm implements MonsterData {
  id = "corrupted-worm";
  name = "Corrupted Worm";
  content: ContentId = "desert-of-hellscar";
  variants: VariantId[] = ["standard", "alternate"];
  images = {
    big: ImageUrl,
    miniature: "",
    cards: [RookieStandardUrl,RookieAlternateUrl],
  };
  color: MonsterColor = "gray";
  size = "small";
  initiative = InitiativePlaces.TOP_GREEN;
  conditionImmunities = [ KnockDown, Stealth, ];
}
