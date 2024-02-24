import ImageUrl from "@/assets/monster/big/DeathMessengerBig.webp";
import MiniatureUrl from "@/assets/monster/miniature/DeathMessengerMiniature.webp";
import { Bleeding, Slow } from "@/data/conditions/Condition";
import type { MonsterData } from "@/data/store/MonsterData";
import type { ContentId } from "@/data/type/ContentId";
import type { MonsterColor } from "@/data/type/MonsterColor";
import type { VariantId } from "@/data/type/VariantId";
import RookieStandardUrl from "@/assets/monster/cards/gray-rookie-death-messenger-standard.jpg";
import RookieAlternateUrl from "@/assets/monster/cards/gray-rookie-death-messenger-alternate.jpg";

export class DeathMessenger implements MonsterData {
  id = "death-messenger";
  name = "Death Messenger";
  content: ContentId = "monster-pack-1";
  variants: VariantId[] = ["standard", "alternate"];
  images = {
    big: ImageUrl,
    miniature: MiniatureUrl,
    cards: [RookieStandardUrl,RookieAlternateUrl],
  };
  color: MonsterColor = "gray";
  size = "small";
  conditionImmunities = [Bleeding, Slow, ];
}
