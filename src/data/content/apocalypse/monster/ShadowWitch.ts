import ImageUrl from "@/assets/monster/big/ShadowWitchBig.webp";
import { Intimidate } from "@/data/conditions/Condition";
import type { MonsterData } from "@/data/store/MonsterData";
import type { ContentId } from "@/data/type/ContentId";
import type { MonsterColor } from "@/data/type/MonsterColor";
import type { VariantId } from "@/data/type/VariantId";
import RookieStandardUrl from "@/assets/monster/cards/white-rookie-shadow-witch-standard.jpg";
import RookieAlternateUrl from "@/assets/monster/cards/white-rookie-shadow-witch-alternate.jpg";
import InitiativePlaces from "@/data/InitiativePlaces";

export class ShadowWitch implements MonsterData {
  id = "shadow-witch";
  name = "Shadow Witch";
  content: ContentId = "apocalypse";
  variants: VariantId[] = ["standard", "alternate"];
  images = {
    big: ImageUrl,
    miniature: "",
    cards: [RookieStandardUrl,RookieAlternateUrl],
  };
  color: MonsterColor = "white";
  size = "small";
  initiative = InitiativePlaces.TOP_BLUE;
  conditionImmunities = [ Intimidate, ];
}
