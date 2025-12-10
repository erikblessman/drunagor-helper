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

export const TOKEN_BAG = 'Token Bag';
export const INITIATIVE_TRACK = 'Initiative Track';

export interface IToken {
  color: InitiativeColors,
  image: string,
  isFaceUp: boolean,
  label: string,
  timestamp: number | null
};

interface TokenSet {
  color: InitiativeColors,
  images: string[],
};

const TokenSetup: TokenSet[] = [
  { color: InitiativeColors.ORANGE, images: [TokenCorner, TokenL, TokenT, TokenZSm, TokenLineSm, TokenY, TokenC,]},
  { color: InitiativeColors.BLUE, images: [TokenLineLg, TokenL, TokenT, TokenZLg, TokenZSm, TokenY, TokenCorner, TokenC,]},
  { color: InitiativeColors.GREEN, images: [TokenLineLg, TokenCorner, TokenZSm, TokenZLg, TokenLineSm, TokenY, TokenC,]},
  { color: InitiativeColors.GRAY, images: [TokenLineLg, TokenL, TokenT, TokenZLg, TokenLineSm, TokenC, TokenCorner,]},
  { color: InitiativeColors.RED, images: [TokenLineLg, TokenL, TokenT, TokenZLg, TokenLineSm, TokenY, TokenZSm,]},
];

export const DarknessTokens: IToken[] = TokenSetup.flatMap((set: TokenSet): IToken[] => {
  return set.images.map((img: string) => {
    const token: IToken = {
      color: set.color,
      image: img,
      isFaceUp: false,
      label: '',
      timestamp: null,
    }
    return token;
  })
});