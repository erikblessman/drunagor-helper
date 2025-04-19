import ImageUrl from "@/assets/monster/big/GremlinHordeBig.webp";
import Card from "@/assets/monster/cards/commanders-random/commander-horde.jpg";
import InitiativePlaces from "@/data/initiative/InitiativePlaces";
import type { MonsterData } from "@/data/store/MonsterData";
import type { ContentId } from "@/data/type/ContentId";
import type { MonsterColor } from "@/data/type/MonsterColor";
import type { VariantId } from "@/data/type/VariantId";

export class CommanderHorde implements MonsterData {
  id = "commander-horde";
  name = "Commander Horde";
  content: ContentId = "awakenings";
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
  translation_key = "monster.commander-horde";
  size: string = "small";
  initiative: number = InitiativePlaces.TOP_GRAY;
}
