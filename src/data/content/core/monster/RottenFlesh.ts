import ImageUrl from "@/assets/monster/big/RottenFleshBig.webp";
import MiniatureUrl from "@/assets/monster/miniature/RottenFleshMiniature.webp";
import { Stun } from "@/data/conditions/Condition";
import type { MonsterData } from "@/data/store/MonsterData";
import type { ContentId } from "@/data/type/ContentId";
import type { MonsterColor } from "@/data/type/MonsterColor";
import type { VariantId } from "@/data/type/VariantId";
import RookieStandardUrl from "@/assets/monster/cards/gray-rookie-rotten-flesh-standard.jpg";
import RookieAlternateUrl from "@/assets/monster/cards/gray-rookie-rotten-flesh-alternate.jpg";
import RookieSideaUrl from "@/assets/monster/cards/gray-rookie-rotten-flesh-sidea.jpg";
import RookieSidebUrl from "@/assets/monster/cards/gray-rookie-rotten-flesh-sideb.jpg";
import InitiativePlaces from "@/data/InitiativePlaces";

export class RottenFlesh implements MonsterData {
  id = "rotten-flesh";
  name = "Rotten Flesh";
  content: ContentId = "core";
  variants: VariantId[] = ["standard", "alternate", "complex"];
  images = {
    big: ImageUrl,
    miniature: MiniatureUrl,
    cards: [RookieStandardUrl,RookieAlternateUrl,RookieSideaUrl,RookieSidebUrl,],
  };
  color: MonsterColor = "gray";
  size = "small";
  initiative = InitiativePlaces.BOTTOM_RED;
  conditionImmunities = [ Stun, ];
}
