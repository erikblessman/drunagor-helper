import ImageUrl from "@/assets/monster/big/HellspawnBruteBig.webp";
import Card from "@/assets/monster/cards/commanders-random/commander-spawn.jpg";
import InitiativePlaces from "@/data/initiative/InitiativePlaces";
import type { MonsterData } from "@/data/store/MonsterData";
import type { ContentId } from "@/data/type/ContentId";
import type { MonsterColor } from "@/data/type/MonsterColor";
import type { VariantId } from "@/data/type/VariantId";

export class CommanderSpawn implements MonsterData {
  id = "commander-spawn";
  name = "Commander Spawn";
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
  translation_key = "monster.commander-spawn";
  size: string = "small";
  initiative: number = InitiativePlaces.TOP_GRAY;
}
