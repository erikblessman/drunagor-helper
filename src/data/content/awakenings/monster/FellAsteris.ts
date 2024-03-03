import ImageUrl from "@/assets/monster/big/FellAsterisBig.webp";
import { Intimidate, Stun } from "@/data/conditions/Condition";
import type { MonsterData } from "@/data/store/MonsterData";
import type { ContentId } from "@/data/type/ContentId";
import type { MonsterColor } from "@/data/type/MonsterColor";
import type { VariantId } from "@/data/type/VariantId";
import RookieStandardUrl from "@/assets/monster/cards/gray-rookie-fell-asteris-standard.jpg";
import RookieAlternateUrl from "@/assets/monster/cards/gray-rookie-fell-asteris-alternate.jpg";
import InitiativePlaces from "@/data/InitiativePlaces";

export class FellAsteris implements MonsterData {
  id = "fell-asteris";
  name = "Fell Asteris";
  content: ContentId = "awakenings";
  variants: VariantId[] = ["standard", "alternate"];
  images = {
    big: ImageUrl,
    miniature: "",
    cards: [RookieStandardUrl,RookieAlternateUrl],
  };
  color: MonsterColor = "gray";
  size = "small";
  initiative = InitiativePlaces.TOP_GREEN;
  conditionImmunities = [Intimidate, Stun, ];
}
