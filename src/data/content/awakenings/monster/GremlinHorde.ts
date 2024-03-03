import ImageUrl from "@/assets/monster/big/GremlinHordeBig.webp";
import type { MonsterData } from "@/data/store/MonsterData";
import type { ContentId } from "@/data/type/ContentId";
import type { MonsterColor } from "@/data/type/MonsterColor";
import type { VariantId } from "@/data/type/VariantId";
import RookieStandardUrl from "@/assets/monster/cards/white-rookie-gremlin-horde-standard.jpg";
import RookieAlternateUrl from "@/assets/monster/cards/white-rookie-gremlin-horde-alternate.jpg";
import InitiativePlaces from "@/data/InitiativePlaces";

export class GremlinHorde implements MonsterData {
  id = "gremlin-horde";
  name = "Gremlin Horde";
  content: ContentId = "awakenings";
  variants: VariantId[] = ["standard", "alternate"];
  images = {
    big: ImageUrl,
    miniature: "",
    cards: [RookieStandardUrl,RookieAlternateUrl],
  };
  color: MonsterColor = "white";
  size = "large";
  initiative = InitiativePlaces.BOTTOM_RED;
}
