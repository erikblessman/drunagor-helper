import ImageUrl from "@/assets/monster/big/WalkingHorrorBig.webp";
import MiniatureUrl from "@/assets/monster/miniature/WalkingHorrorMiniature.webp";
import { KnockDown } from "@/data/conditions/Condition";
import type { MonsterData } from "@/data/store/MonsterData";
import type { ContentId } from "@/data/type/ContentId";
import type { MonsterColor } from "@/data/type/MonsterColor";
import type { VariantId } from "@/data/type/VariantId";
import RookieStandardUrl from "@/assets/monster/cards/white-rookie-walking-horror-standard.jpg";
import RookieAlternateUrl from "@/assets/monster/cards/white-rookie-walking-horror-alternate.jpg";
import InitiativePlaces from "@/data/InitiativePlaces";

export class WalkingHorror implements MonsterData {
  id = "walking-horror";
  name = "Walking Horror";
  content: ContentId = "spoils-of-war";
  variants: VariantId[] = ["standard", "alternate"];
  images = {
    big: ImageUrl,
    miniature: MiniatureUrl,
    cards: [RookieStandardUrl,RookieAlternateUrl],
  };
  color: MonsterColor = "white";
  size = "small";
  initiative = InitiativePlaces.BOTTOM_RED;
  conditionImmunities = [ KnockDown, ];
}
