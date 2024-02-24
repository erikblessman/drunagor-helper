import ImageUrl from "@/assets/monster/big/GrimDoctorBig.webp";
import { Stealth } from "@/data/conditions/Condition";
import type { MonsterData } from "@/data/store/MonsterData";
import type { ContentId } from "@/data/type/ContentId";
import type { MonsterColor } from "@/data/type/MonsterColor";
import type { VariantId } from "@/data/type/VariantId";
import RookieStandardUrl from "@/assets/monster/cards/white-rookie-grim-doctor-standard.jpg";
import RookieAlternateUrl from "@/assets/monster/cards/white-rookie-grim-doctor-alternate.jpg";

export class GrimDoctor implements MonsterData {
  id = "grim-doctor";
  name = "Grim Doctor";
  content: ContentId = "awakenings";
  variants: VariantId[] = ["standard", "alternate"];
  images = {
    big: ImageUrl,
    miniature: "",
    cards: [RookieStandardUrl,RookieAlternateUrl],
  };
  color: MonsterColor = "white";
  size = "small";
  conditionImmunities = [ Stealth, ];
}
