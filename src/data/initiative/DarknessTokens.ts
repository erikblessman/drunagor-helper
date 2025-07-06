import { InitiativeColors } from "./InitiativePlaces";
import TokenC from "@/assets/darkness/c.png";
import TokenCorner from "@/assets/darkness/corner.png";
import TokenL from "@/assets/darkness/l.png";
import TokenLineLg from "@/assets/darkness/line-large.png";
import TokenLineSm from "@/assets/darkness/line-small.png";
import TokenT from "@/assets/darkness/t.png";
import TokenY from "@/assets/darkness/y.png";
import TokenZSm from "@/assets/darkness/z-small.png";
import TokenZLg from "@/assets/darkness/z-large.png";
export { default as BlankToken } from "@/assets/darkness/blank.png";

export interface IToken {
  color: InitiativeColors,
  image: string,
  isDrawn: boolean
};

export const DarknessTokens: IToken[] = [
  { isDrawn: false, color: InitiativeColors.ORANGE, image: TokenCorner },
  { isDrawn: false, color: InitiativeColors.ORANGE, image: TokenL },
  { isDrawn: false, color: InitiativeColors.ORANGE, image: TokenT },
  { isDrawn: false, color: InitiativeColors.ORANGE, image: TokenZSm },
  { isDrawn: false, color: InitiativeColors.ORANGE, image: TokenLineSm },
  { isDrawn: false, color: InitiativeColors.ORANGE, image: TokenY },
  { isDrawn: false, color: InitiativeColors.ORANGE, image: TokenC },
  { isDrawn: false, color: InitiativeColors.BLUE, image: TokenLineLg },
  { isDrawn: false, color: InitiativeColors.BLUE, image: TokenL },
  { isDrawn: false, color: InitiativeColors.BLUE, image: TokenT },
  { isDrawn: false, color: InitiativeColors.BLUE, image: TokenZLg },
  { isDrawn: false, color: InitiativeColors.BLUE, image: TokenZSm },
  { isDrawn: false, color: InitiativeColors.BLUE, image: TokenY },
  { isDrawn: false, color: InitiativeColors.BLUE, image: TokenCorner },
  { isDrawn: false, color: InitiativeColors.BLUE, image: TokenC },
  { isDrawn: false, color: InitiativeColors.GREEN, image: TokenLineLg },
  { isDrawn: false, color: InitiativeColors.GREEN, image: TokenCorner },
  { isDrawn: false, color: InitiativeColors.GREEN, image: TokenZSm },
  { isDrawn: false, color: InitiativeColors.GREEN, image: TokenZLg },
  { isDrawn: false, color: InitiativeColors.GREEN, image: TokenLineSm },
  { isDrawn: false, color: InitiativeColors.GREEN, image: TokenY },
  { isDrawn: false, color: InitiativeColors.GREEN, image: TokenC },
  { isDrawn: false, color: InitiativeColors.GRAY, image: TokenLineLg },
  { isDrawn: false, color: InitiativeColors.GRAY, image: TokenL },
  { isDrawn: false, color: InitiativeColors.GRAY, image: TokenT },
  { isDrawn: false, color: InitiativeColors.GRAY, image: TokenZLg },
  { isDrawn: false, color: InitiativeColors.GRAY, image: TokenLineSm },
  { isDrawn: false, color: InitiativeColors.GRAY, image: TokenC },
  { isDrawn: false, color: InitiativeColors.GRAY, image: TokenCorner },
  { isDrawn: false, color: InitiativeColors.RED, image: TokenLineLg },
  { isDrawn: false, color: InitiativeColors.RED, image: TokenL },
  { isDrawn: false, color: InitiativeColors.RED, image: TokenT },
  { isDrawn: false, color: InitiativeColors.RED, image: TokenZLg },
  { isDrawn: false, color: InitiativeColors.RED, image: TokenLineSm },
  { isDrawn: false, color: InitiativeColors.RED, image: TokenY },
  { isDrawn: false, color: InitiativeColors.RED, image: TokenZSm },
];