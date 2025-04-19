import ImageUrl from "@/assets/monster/big/GorgonHexerBig.webp";
import Card from "@/assets/monster/cards/commanders-random/commander-hexer.jpg";
import InitiativePlaces from "@/data/initiative/InitiativePlaces";
import type { MonsterData } from "@/data/store/MonsterData";
import type { ContentId } from "@/data/type/ContentId";
import type { MonsterColor } from "@/data/type/MonsterColor";
import type { VariantId } from "@/data/type/VariantId";

export class CommanderHexer implements MonsterData {
  id = "commander-hexer";
  name = "Commander Hexer";
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
  translation_key = "monster.commander-hexer";
  size: string = "small";
  initiative: number = InitiativePlaces.TOP_GRAY;
}
