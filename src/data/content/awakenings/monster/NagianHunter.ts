import ImageUrl from "@/assets/monster/big/NagianHunterBig.webp";
import { Stun } from "@/data/conditions/Condition";
import type { MonsterData } from "@/data/store/MonsterData";
import type { ContentId } from "@/data/type/ContentId";
import type { MonsterColor } from "@/data/type/MonsterColor";
import type { VariantId } from "@/data/type/VariantId";
import RookieStandardUrl from "@/assets/monster/cards/white-rookie-nagian-hunter-standard.jpg";
import RookieAlternateUrl from "@/assets/monster/cards/white-rookie-nagian-hunter-alternate.jpg";

export class NagianHunter implements MonsterData {
  id = "nagian-hunter";
  name = "Nagian Hunter";
  content: ContentId = "awakenings";
  variants: VariantId[] = ["standard", "alternate"];
  images = {
    big: ImageUrl,
    miniature: "",
    cards: [RookieStandardUrl,RookieAlternateUrl],
  };
  color: MonsterColor = "white";
  size = "small";
  conditionImmunities = [ Stun, ];
}
