import ImageUrl from "@/assets/monster/big/commander-thern.png";
import Card from "@/assets/monster/cards/commanders-special/commander-thern.jpg";
import InitiativePlaces from "@/data/initiative/InitiativePlaces";
import type { MonsterData } from "@/data/store/MonsterData";
import type { ContentId } from "@/data/type/ContentId";
import type { MonsterColor } from "@/data/type/MonsterColor";
import type { VariantId } from "@/data/type/VariantId";

export class CommanderThern implements MonsterData {
  id = "commander-thern";
  name = "Commander Thern";
  content: ContentId = "spoils-of-war";
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
  translation_key = "monster.commander-thern";
  size: string = "small";
  initiative: number = InitiativePlaces.TOP_GRAY;
}
