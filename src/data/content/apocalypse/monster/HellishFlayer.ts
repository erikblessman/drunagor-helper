import ImageUrl from "@/assets/monster/big/HellishFlayerBig.webp";
import { Burning, Intimidate } from "@/data/conditions/Condition";
import type { MonsterData } from "@/data/store/MonsterData";
import type { ContentId } from "@/data/type/ContentId";
import type { MonsterColor } from "@/data/type/MonsterColor";
import type { VariantId } from "@/data/type/VariantId";
import RookieStandardUrl from "@/assets/monster/cards/gray-rookie-hellish-flayer-standard.jpg";
import RookieAlternateUrl from "@/assets/monster/cards/gray-rookie-hellish-flayer-alternate.jpg";
import InitiativePlaces from "@/data/InitiativePlaces";

export class HellishFlayer implements MonsterData {
  id = "hellish-flayer";
  name = "Hellish Flayer";
  content: ContentId = "apocalypse";
  variants: VariantId[] = ["standard", "alternate"];
  images = {
    big: ImageUrl,
    miniature: "",
    cards: [RookieStandardUrl,RookieAlternateUrl],
  };
  color: MonsterColor = "gray";
  size = "small";
  initiative = InitiativePlaces.BOTTOM_GREEN;
  conditionImmunities = [ Intimidate, Burning, ];
}
