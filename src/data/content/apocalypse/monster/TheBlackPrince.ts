import ImageUrl from "@/assets/monster/big/the-black-prince.png";
import Card from "@/assets/monster/cards/commanders-scenario/the-black-prince.jpg";
import InitiativePlaces from "@/data/initiative/InitiativePlaces";
import type { MonsterData } from "@/data/store/MonsterData";
import type { ContentId } from "@/data/type/ContentId";
import type { MonsterColor } from "@/data/type/MonsterColor";
import type { VariantId } from "@/data/type/VariantId";

export class TheBlackPrince implements MonsterData {
  id = "the-black-prince";
  name = "The Black Prince";
  content: ContentId = "apocalypse";
  variants: VariantId[] = ["standard"];
  images = {
    big: ImageUrl,
    miniature: "",
    cards: {
      rookie: [Card],
      fighter: [Card],
      veteran: [Card],
      champion: [Card],
    },
  };
  color: MonsterColor = "other";
  translation_key = "monster.the-black-prince";
  size: string = "small";
  initiative: number = InitiativePlaces.TOP_GRAY;
}
