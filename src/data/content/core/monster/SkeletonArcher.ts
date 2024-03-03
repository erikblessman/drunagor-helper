import ImageUrl from "@/assets/monster/big/SkeletonArcherBig.webp";
import MiniatureUrl from "@/assets/monster/miniature/SkeletonArcherMiniature.webp";
import { Bleeding } from "@/data/conditions/Condition";
import type { MonsterData } from "@/data/store/MonsterData";
import type { ContentId } from "@/data/type/ContentId";
import type { MonsterColor } from "@/data/type/MonsterColor";
import type { VariantId } from "@/data/type/VariantId";
import RookieStandardUrl from "@/assets/monster/cards/white-rookie-skeleton-archer-standard.jpg";
import RookieAlternateUrl from "@/assets/monster/cards/white-rookie-skeleton-archer-alternate.jpg";
import InitiativePlaces from "@/data/InitiativePlaces";

export class SkeletonArcher implements MonsterData {
  id = "skeleton-archer";
  name = "Skeleton Archer";
  content: ContentId = "core";
  variants: VariantId[] = ["standard", "alternate"];
  images = {
    big: ImageUrl,
    miniature: MiniatureUrl,
    cards: [RookieStandardUrl,RookieAlternateUrl],
  };
  color: MonsterColor = "white";
  size = "small";
  initiative = InitiativePlaces.TOP_BLUE;
  conditionImmunities = [Bleeding];
}
