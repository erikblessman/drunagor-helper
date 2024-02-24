import ImageUrl from "@/assets/monster/big/ScoutOfDarknessBig.webp";
import MiniatureUrl from "@/assets/monster/miniature/ScoutOfDarknessMiniature.webp";
import { Stun } from "@/data/conditions/Condition";
import type { MonsterData } from "@/data/store/MonsterData";
import type { ContentId } from "@/data/type/ContentId";
import type { MonsterColor } from "@/data/type/MonsterColor";
import type { VariantId } from "@/data/type/VariantId";
import RookieStandardUrl from "@/assets/monster/cards/white-rookie-scout-of-darkness-standard.jpg";
import RookieAlternateUrl from "@/assets/monster/cards/white-rookie-scout-of-darkness-alternate.jpg";

export class ScoutOfDarkness implements MonsterData {
  id = "scout-of-darkness";
  name = "Scout Of Darkness";
  content: ContentId = "monster-pack-1";
  variants: VariantId[] = ["standard", "alternate"];
  images = {
    big: ImageUrl,
    miniature: MiniatureUrl,
    cards: [RookieStandardUrl,RookieAlternateUrl],
  };
  color: MonsterColor = "white";
  size = "small";
  conditionImmunities = [ Stun, ];
}
