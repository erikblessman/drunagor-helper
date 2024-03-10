import ImageUrl from "@/assets/monster/big/DreamTitanBig.webp";
import { Intimidate, Stealth, } from "@/data/conditions/Condition";
import type { MonsterData } from "@/data/store/MonsterData";
import type { ContentId } from "@/data/type/ContentId";
import type { MonsterColor } from "@/data/type/MonsterColor";
import type { VariantId } from "@/data/type/VariantId";
import RookieStandardUrl from "@/assets/monster/cards/black-rookie-dream-titan-standard.jpg";
import RookieAlternateUrl from "@/assets/monster/cards/black-rookie-dream-titan-alternate.jpg";
import InitiativePlaces from "@/data/InitiativePlaces";

export class DreamTitan implements MonsterData {
  id = "dream-titan";
  name = "Dream Titan";
  content: ContentId = "apocalypse";
  variants: VariantId[] = ["standard", "alternate"];
  images = {
    big: ImageUrl,
    miniature: "",
    cards: [RookieStandardUrl,RookieAlternateUrl],
  };
  color: MonsterColor = "black";
  size = "large";
  initiative = InitiativePlaces.TOP_GRAY;
  conditionImmunities = [Intimidate, Stealth];
}
