import ImageUrl from "@/assets/monster/big/HellishFlayerBig.webp";
import CardStandard from "@/assets/monster/cards/hellish-flayer/rookie/standard.jpg";
import CardAlternate from "@/assets/monster/cards/hellish-flayer/rookie/alternate.jpg";
import InitiativePlaces from "@/data/initiative/InitiativePlaces";
import type { MonsterData } from "@/data/store/MonsterData";
import type { ContentId } from "@/data/type/ContentId";
import type { MonsterColor } from "@/data/type/MonsterColor";
import type { VariantId } from "@/data/type/VariantId";

export class HellishFlayer implements MonsterData {
  id = "hellish-flayer";
  name = "Hellish Flayer";
  content: ContentId = "apocalypse";
  variants: VariantId[] = ["standard", "alternate"];
  images = {
    big: ImageUrl,
    miniature: "",
    cards: [CardStandard, CardAlternate,],
  };
  color: MonsterColor = "gray";
  size: string = "small";
  initiative: number = InitiativePlaces.BOTTOM_GREEN;
  translation_key = "monster.hellish-flayer";
}
