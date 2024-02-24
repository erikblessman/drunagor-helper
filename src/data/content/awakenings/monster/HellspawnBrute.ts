import ImageUrl from "@/assets/monster/big/HellspawnBruteBig.webp";
import { Burning, KnockDown } from "@/data/conditions/Condition";
import type { MonsterData } from "@/data/store/MonsterData";
import type { ContentId } from "@/data/type/ContentId";
import type { MonsterColor } from "@/data/type/MonsterColor";
import type { VariantId } from "@/data/type/VariantId";
import RookieStandardUrl from "@/assets/monster/cards/gray-rookie-hellspawn-brute-standard.jpg";
import RookieAlternateUrl from "@/assets/monster/cards/gray-rookie-hellspawn-brute-alternate.jpg";

export class HellspawnBrute implements MonsterData {
  id = "hellspawn-brute";
  name = "Hellspawn Brute";
  content: ContentId = "awakenings";
  variants: VariantId[] = ["standard", "alternate"];
  images = {
    big: ImageUrl,
    miniature: "",
    cards: [RookieStandardUrl,RookieAlternateUrl],
  };
  color: MonsterColor = "gray";
  size = "small";
  conditionImmunities = [Burning, KnockDown, ];
}
