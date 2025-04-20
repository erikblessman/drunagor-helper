import ImageUrl from "@/assets/monster/big/ShadowCultistBig.webp";
import Card from "@/assets/monster/cards/commanders-special/commander-archon.jpg";
import InitiativePlaces from "@/data/initiative/InitiativePlaces";
import type { MonsterData } from "@/data/store/MonsterData";
import type { ContentId } from "@/data/type/ContentId";
import type { MonsterColor } from "@/data/type/MonsterColor";
import type { VariantId } from "@/data/type/VariantId";

export class CommanderArchon implements MonsterData {
  id = "commander-archon";
  name = "Commander Archon";
  content: ContentId = "core";
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
  translation_key = "monster.commander-archon";
  size: string = "small";
  initiative: number = InitiativePlaces.TOP_GRAY;
}
