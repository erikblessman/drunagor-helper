import ImageUrl from "@/assets/monster/big/AbominationBig.webp";
import Card from "@/assets/monster/cards/commanders-special/commander-brute--side-b.jpg";
import InitiativePlaces from "@/data/initiative/InitiativePlaces";
import type { MonsterData } from "@/data/store/MonsterData";
import type { ContentId } from "@/data/type/ContentId";
import type { MonsterColor } from "@/data/type/MonsterColor";
import type { VariantId } from "@/data/type/VariantId";

export class CommanderBruteSideB implements MonsterData {
  id = "commander-brute";
  name = "Commander Brute (Side B)";
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
  translation_key = "monster.commander-brute";
  size: string = "large";
  initiative: number = InitiativePlaces.TOP_GREEN;
}
