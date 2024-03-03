import ImageUrl from "@/assets/monster/big/ShadowCultistBig.webp";
import MiniatureUrl from "@/assets/monster/miniature/ShadowCultistMiniature.webp";
import { Poison } from "@/data/conditions/Condition";
import type { MonsterData } from "@/data/store/MonsterData";
import type { ContentId } from "@/data/type/ContentId";
import type { MonsterColor } from "@/data/type/MonsterColor";
import type { VariantId } from "@/data/type/VariantId";
import RookieStandardUrl from "@/assets/monster/cards/white-rookie-shadow-cultist-standard.jpg";
import RookieAlternateUrl from "@/assets/monster/cards/white-rookie-shadow-cultist-alternate.jpg";
import RookieSideAUrl from "@/assets/monster/cards/white-rookie-shadow-cultist-sidea.jpg";
import RookieSideBUrl from "@/assets/monster/cards/white-rookie-shadow-cultist-sideb.jpg";
import InitiativePlaces from "@/data/InitiativePlaces";

export class ShadowCultist implements MonsterData {
  id = "shadow-cultist";
  name = "Shadow Cultist";
  content: ContentId = "core";
  variants: VariantId[] = ["standard", "alternate", "complex"];
  images = {
    big: ImageUrl,
    miniature: MiniatureUrl,
    cards: [RookieStandardUrl,RookieAlternateUrl,RookieSideAUrl,RookieSideBUrl,],
  };
  color: MonsterColor = "white";
  size = "small";
  initiative = InitiativePlaces.TOP_RED;
  conditionImmunities = [ Poison, ];
}
