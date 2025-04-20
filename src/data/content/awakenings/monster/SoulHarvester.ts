import ImageUrl from "@/assets/monster/big/soul-harvester.png";
import Card from "@/assets/monster/cards/commanders-scenario/soul-harvester.jpg";
import InitiativePlaces from "@/data/initiative/InitiativePlaces";
import type { MonsterData } from "@/data/store/MonsterData";
import type { ContentId } from "@/data/type/ContentId";
import type { MonsterColor } from "@/data/type/MonsterColor";
import type { VariantId } from "@/data/type/VariantId";

export class SoulHarvester implements MonsterData {
  id = "soul-harvester";
  name = "Soul Harvester";
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
  translation_key = "monster.soul-harvester";
  size: string = "small";
  initiative: number = InitiativePlaces.TOP_ORANGE;
}
