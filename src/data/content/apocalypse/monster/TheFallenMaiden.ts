import ImageUrl from "@/assets/monster/big/the-fallen-maiden.png";
import Card from "@/assets/monster/cards/commanders-scenario/the-fallen-maiden.jpg";
import InitiativePlaces from "@/data/initiative/InitiativePlaces";
import type { MonsterData } from "@/data/store/MonsterData";
import type { ContentId } from "@/data/type/ContentId";
import type { MonsterColor } from "@/data/type/MonsterColor";
import type { VariantId } from "@/data/type/VariantId";

export class TheFallenMaiden implements MonsterData {
  id = "the-fallen-maiden";
  name = "The Fallen Maiden";
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
  translation_key = "monster.the-fallen-maiden";
  size: string = "small";
  initiative: number = InitiativePlaces.TOP_GRAY;
}
