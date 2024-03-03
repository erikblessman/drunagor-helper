import ImageUrl from "@/assets/monster/big/FacelessConjurerBig.webp";
import type { MonsterData } from "@/data/store/MonsterData";
import type { ContentId } from "@/data/type/ContentId";
import type { MonsterColor } from "@/data/type/MonsterColor";
import type { VariantId } from "@/data/type/VariantId";
import RookieStandardUrl from "@/assets/monster/cards/gray-rookie-faceless-conjurer-standard.jpg";
import RookieAlternateUrl from "@/assets/monster/cards/gray-rookie-faceless-conjurer-alternate.jpg";
import InitiativePlaces from "@/data/InitiativePlaces";

export class FacelessConjurer implements MonsterData {
  id = "faceless-conjurer";
  name = "Faceless Conjurer";
  content: ContentId = "apocalypse";
  variants: VariantId[] = ["standard", "alternate"];
  images = {
    big: ImageUrl,
    miniature: "",
    cards: [RookieStandardUrl,RookieAlternateUrl],
  };
  color: MonsterColor = "gray";
  size = "large";
  initiative = InitiativePlaces.BOTTOM_ORANGE;
}
