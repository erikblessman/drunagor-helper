import ImageUrl from "@/assets/monster/big/ExecutionerBig.webp";
import MiniatureUrl from "@/assets/monster/miniature/ExecutionerMiniature.webp";
import { Intimidate, Slow } from "@/data/conditions/Condition";
import type { MonsterData } from "@/data/store/MonsterData";
import type { ContentId } from "@/data/type/ContentId";
import type { MonsterColor } from "@/data/type/MonsterColor";
import type { VariantId } from "@/data/type/VariantId";
import RookieStandardUrl from "@/assets/monster/cards/gray-rookie-executioner-standard.jpg";
import RookieAlternateUrl from "@/assets/monster/cards/gray-rookie-executioner-alternate.jpg";
import InitiativePlaces from "@/data/InitiativePlaces";

export class Executioner implements MonsterData {
  id = "executioner";
  name = "Executioner";
  content: ContentId = "core";
  variants: VariantId[] = ["standard", "alternate"];
  images = {
    big: ImageUrl,
    miniature: MiniatureUrl,
    cards: [RookieStandardUrl,RookieAlternateUrl],
  };
  color: MonsterColor = "gray";
  size = "small";
  initiative = InitiativePlaces.BOTTOM_GREEN;
  conditionImmunities = [ Intimidate, Slow, ];
}
