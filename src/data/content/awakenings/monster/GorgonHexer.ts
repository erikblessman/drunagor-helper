import ImageUrl from "@/assets/monster/big/GorgonHexerBig.webp";
import { Intimidate, KnockDown } from "@/data/conditions/Condition";
import type { MonsterData } from "@/data/store/MonsterData";
import type { ContentId } from "@/data/type/ContentId";
import type { MonsterColor } from "@/data/type/MonsterColor";
import type { VariantId } from "@/data/type/VariantId";
import RookieStandardUrl from "@/assets/monster/cards/gray-rookie-gorgon-hexer-standard.jpg";
import RookieAlternateUrl from "@/assets/monster/cards/gray-rookie-gorgon-hexer-alternate.jpg";
import InitiativePlaces from "@/data/InitiativePlaces";

export class GorgonHexer implements MonsterData {
  id = "gorgon-hexer";
  name = "Gorgon Hexer";
  content: ContentId = "awakenings";
  variants: VariantId[] = ["standard", "alternate"];
  images = {
    big: ImageUrl,
    miniature: "",
    cards: [RookieStandardUrl,RookieAlternateUrl],
  };
  color: MonsterColor = "gray";
  size = "small";
  initiative = InitiativePlaces.BOTTOM_BLUE;
  conditionImmunities = [ Intimidate, KnockDown, ];
}
