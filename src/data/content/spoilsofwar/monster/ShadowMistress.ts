import ImageUrl from "@/assets/monster/big/ShadowMistressBig.webp";
import MiniatureUrl from "@/assets/monster/miniature/ShadowMistressMiniature.webp";
import { Stun } from "@/data/conditions/Condition";
import type { MonsterData } from "@/data/store/MonsterData";
import type { ContentId } from "@/data/type/ContentId";
import type { MonsterColor } from "@/data/type/MonsterColor";
import type { VariantId } from "@/data/type/VariantId";
import RookieStandardUrl from "@/assets/monster/cards/white-rookie-shadow-mistress-standard.jpg";
import RookieAlternateUrl from "@/assets/monster/cards/white-rookie-shadow-mistress-alternate.jpg";
import InitiativePlaces from "@/data/InitiativePlaces";

export class ShadowMistress implements MonsterData {
  id = "shadow-mistress";
  name = "Shadow Mistress";
  content: ContentId = "spoils-of-war";
  variants: VariantId[] = ["standard", "alternate"];
  images = {
    big: ImageUrl,
    miniature: MiniatureUrl,
    cards: [RookieStandardUrl,RookieAlternateUrl],
  };
  color: MonsterColor = "white";
  size = "small";
  initiative = InitiativePlaces.TOP_ORANGE;
  conditionImmunities = [ Stun, ];
}
