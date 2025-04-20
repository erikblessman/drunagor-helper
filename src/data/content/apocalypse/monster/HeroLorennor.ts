import ImageUrl from "@/assets/monster/big/hero-lorennor.png";
import Card from "@/assets/monster/cards/commanders-scenario/hero-lorennor.jpg";
import InitiativePlaces from "@/data/initiative/InitiativePlaces";
import type { MonsterData } from "@/data/store/MonsterData";
import type { ContentId } from "@/data/type/ContentId";
import type { MonsterColor } from "@/data/type/MonsterColor";
import type { VariantId } from "@/data/type/VariantId";

export class HeroLorennor implements MonsterData {
  id = "hero-lorennor";
  name = "Hero Lorennor";
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
  translation_key = "monster.hero-lorennor";
  size: string = "small";
  initiative: number = InitiativePlaces.TOP_GRAY;
}
