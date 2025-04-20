import ImageUrl from "@/assets/monster/big/maya-the-ranger.png";
import Card from "@/assets/monster/cards/commanders-scenario/maya-the-ranger.jpg";
import InitiativePlaces from "@/data/initiative/InitiativePlaces";
import type { MonsterData } from "@/data/store/MonsterData";
import type { ContentId } from "@/data/type/ContentId";
import type { MonsterColor } from "@/data/type/MonsterColor";
import type { VariantId } from "@/data/type/VariantId";

export class MayaTheRanger implements MonsterData {
  id = "maya-the-ranger";
  name = "Maya, the Ranger";
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
  translation_key = "monster.maya-the-ranger";
  size: string = "small";
  initiative: number = InitiativePlaces.TOP_GRAY;
}
