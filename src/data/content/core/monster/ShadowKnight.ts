import ImageUrl from "@/assets/monster/big/ShadowKnightBig.webp";
import MiniatureUrl from "@/assets/monster/miniature/ShadowKnightMiniature.webp";
import type { MonsterData } from "@/data/store/MonsterData";
import type { ContentId } from "@/data/type/ContentId";
import type { MonsterColor } from "@/data/type/MonsterColor";
import type { VariantId } from "@/data/type/VariantId";
import RookieStandardUrl from "@/assets/monster/cards/black-rookie-shadow-knight-standard.jpg";
import RookieAlternateUrl from "@/assets/monster/cards/black-rookie-shadow-knight-alternate.jpg";
import RookieSidaAUrl from "@/assets/monster/cards/black-rookie-shadow-knight-sidea.jpg";
import RookieSideBUrl from "@/assets/monster/cards/black-rookie-shadow-knight-sideb.jpg";
import InitiativePlaces from "@/data/InitiativePlaces";

export class ShadowKnight implements MonsterData {
  id = "shadow-knight";
  name = "Shadow Knight";
  content: ContentId = "core";
  variants: VariantId[] = ["standard", "alternate", "complex"];
  images = {
    big: ImageUrl,
    miniature: MiniatureUrl,
    cards: [RookieStandardUrl,RookieAlternateUrl,RookieSidaAUrl,RookieSideBUrl,],
  };
  color: MonsterColor = "black";
  size = "large";
  initiative = InitiativePlaces.TOP_GRAY;
}
