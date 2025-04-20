import ImageUrl from "@/assets/monster/big/radoslaw-radek.png";
import Card from "@/assets/monster/cards/commanders-scenario/radoslaw-radek.jpg";
import InitiativePlaces from "@/data/initiative/InitiativePlaces";
import type { MonsterData } from "@/data/store/MonsterData";
import type { ContentId } from "@/data/type/ContentId";
import type { MonsterColor } from "@/data/type/MonsterColor";
import type { VariantId } from "@/data/type/VariantId";

export class RadoslawRadek implements MonsterData {
  id = "radoslaw-radek";
  name = "Radoslaw Radek";
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
  translation_key = "monster.radoslaw-radek";
  size: string = "small";
  initiative: number = InitiativePlaces.TOP_GRAY;
}
