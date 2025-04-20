import ImageUrl from "@/assets/monster/big/ShadowVampireBig.webp";
import Card from "@/assets/monster/cards/commanders-special/commander-bane.jpg";
import InitiativePlaces from "@/data/initiative/InitiativePlaces";
import type { MonsterData } from "@/data/store/MonsterData";
import type { ContentId } from "@/data/type/ContentId";
import type { MonsterColor } from "@/data/type/MonsterColor";
import type { VariantId } from "@/data/type/VariantId";

export class CommanderBane implements MonsterData {
  id = "commander-bane";
  name = "Commander Bane";
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
  translation_key = "monster.commander-bane";
  size: string = "small";
  initiative: number = InitiativePlaces.TOP_GRAY;
}
