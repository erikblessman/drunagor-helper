import ImageUrl from "@/assets/monster/big/scavenger.png";
import Card from "@/assets/monster/cards/commanders-scenario/scavenger.jpg";
import InitiativePlaces from "@/data/initiative/InitiativePlaces";
import type { MonsterData } from "@/data/store/MonsterData";
import type { ContentId } from "@/data/type/ContentId";
import type { MonsterColor } from "@/data/type/MonsterColor";
import type { VariantId } from "@/data/type/VariantId";

export class Scavenger implements MonsterData {
  id = "scavenger";
  name = "Scavenger";
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
  translation_key = "monster.scavenger";
  size: string = "small";
  initiative: number = InitiativePlaces.TOP_GRAY;
}
