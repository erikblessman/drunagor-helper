import ImageUrl from "@/assets/monster/big/NightStalkerBig.webp";
import { Bleeding, Slow, Stealth } from "@/data/conditions/Condition";
import type { MonsterData } from "@/data/store/MonsterData";
import type { ContentId } from "@/data/type/ContentId";
import type { MonsterColor } from "@/data/type/MonsterColor";
import type { VariantId } from "@/data/type/VariantId";
import RookieStandardUrl from "@/assets/monster/cards/gray-rookie-night-stalker-standard.jpg";
import RookieAlternateUrl from "@/assets/monster/cards/gray-rookie-night-stalker-alternate.jpg";
import InitiativePlaces from "@/data/InitiativePlaces";

export class NightStalker implements MonsterData {
  id = "night-stalker";
  name = "Night Stalker";
  content: ContentId = "awakenings";
  variants: VariantId[] = ["standard", "alternate"];
  images = {
    big: ImageUrl,
    miniature: "",
    cards: [RookieStandardUrl,RookieAlternateUrl],
  };
  color: MonsterColor = "gray";
  size = "small";
  initiative = InitiativePlaces.TOP_RED;
  conditionImmunities = [ Bleeding, Slow, Stealth, ];
}
