import ImageUrl from "@/assets/monster/big/commander-golem.png";
import Card from "@/assets/monster/cards/commanders-special/commander-golem.jpg";
import InitiativePlaces from "@/data/initiative/InitiativePlaces";
import type { MonsterData } from "@/data/store/MonsterData";
import type { ContentId } from "@/data/type/ContentId";
import type { MonsterColor } from "@/data/type/MonsterColor";
import type { VariantId } from "@/data/type/VariantId";

export class CommanderGolem implements MonsterData {
  id = "commander-golem";
  name = "Commander Golem";
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
  translation_key = "monster.commander-golem";
  size: string = "small";
  initiative: number = InitiativePlaces.TOP_GRAY;
}
