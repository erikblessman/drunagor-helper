import ImageUrl from "@/assets/monster/big/GorgonessWitchBig.webp";
import { KnockDown } from "@/data/conditions/Condition";
import type { MonsterData } from "@/data/store/MonsterData";
import type { ContentId } from "@/data/type/ContentId";
import type { MonsterColor } from "@/data/type/MonsterColor";
import type { VariantId } from "@/data/type/VariantId";
import RookieStandardUrl from "@/assets/monster/cards/white-rookie-gorgoness-witch-standard.jpg";
import RookieAlternateUrl from "@/assets/monster/cards/white-rookie-gorgoness-witch-alternate.jpg";
import InitiativePlaces from "@/data/InitiativePlaces";

export class GorgonessWitch implements MonsterData {
  id = "gorgoness-witch";
  name = "Gorgoness Witch";
  content: ContentId = "awakenings";
  variants: VariantId[] = ["standard", "alternate"];
  images = {
    big: ImageUrl,
    miniature: "",
    cards: [RookieStandardUrl,RookieAlternateUrl],
  };
  color: MonsterColor = "white";
  size = "small";
  initiative = InitiativePlaces.BOTTOM_GREEN;
  conditionImmunities = [ KnockDown, ];
}
