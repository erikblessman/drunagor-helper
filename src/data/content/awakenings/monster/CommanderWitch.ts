import ImageUrl from "@/assets/monster/big/GorgonessWitchBig.webp";
import Card from "@/assets/monster/cards/commanders-random/commander-witch.jpg";
import InitiativePlaces from "@/data/initiative/InitiativePlaces";
import type { MonsterData } from "@/data/store/MonsterData";
import type { ContentId } from "@/data/type/ContentId";
import type { MonsterColor } from "@/data/type/MonsterColor";
import type { VariantId } from "@/data/type/VariantId";

export class CommanderWitch implements MonsterData {
  id = "commander-witch";
  name = "Commander Witch";
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
  translation_key = "monster.commander-witch";
  size: string = "small";
  initiative: number = InitiativePlaces.TOP_GRAY;
}
