import ImageUrl from "@/assets/monster/big/underworld-flayer.png";
import Card from "@/assets/monster/cards/commanders-scenario/underworld-flayer.jpg";
import InitiativePlaces from "@/data/initiative/InitiativePlaces";
import type { MonsterData } from "@/data/store/MonsterData";
import type { ContentId } from "@/data/type/ContentId";
import type { MonsterColor } from "@/data/type/MonsterColor";
import type { VariantId } from "@/data/type/VariantId";

export class UnderworldFlayer implements MonsterData {
  id = "underworld-flayer";
  name = "Underworld Flayer";
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
  translation_key = "monster.underworld-flayer";
  size: string = "small";
  initiative: number = InitiativePlaces.TOP_GRAY;
}
