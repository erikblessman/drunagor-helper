import ImageUrl from "@/assets/monster/big/BoneReaperBig.webp";
import MiniatureUrl from "@/assets/monster/miniature/BoneReaperMiniature.webp";
import { Intimidate, Poison } from "@/data/conditions/Condition";
import type { MonsterData } from "@/data/store/MonsterData";
import type { ContentId } from "@/data/type/ContentId";
import type { MonsterColor } from "@/data/type/MonsterColor";
import type { VariantId } from "@/data/type/VariantId";
import RookieStandardUrl from "@/assets/monster/cards/gray-rookie-bone-reaper-standard.jpg";
import RookieAlternateUrl from "@/assets/monster/cards/gray-rookie-bone-reaper-alternate.jpg";
import InitiativePlaces from "@/data/InitiativePlaces";

export class BoneReaper implements MonsterData {
  id = "bone-reaper";
  name = "Bone Reaper";
  content: ContentId = "spoils-of-war";
  variants: VariantId[] = ["standard", "alternate"];
  images = {
    big: ImageUrl,
    miniature: MiniatureUrl,
    cards: [RookieStandardUrl,RookieAlternateUrl],
  };
  color: MonsterColor = "gray";
  size = "small";
  initiative = InitiativePlaces.BOTTOM_GRAY;
  conditionImmunities = [ Intimidate, Poison, ];
}
