import type { ContentId } from "@/data/type/ContentId";
import type { MonsterColor } from "@/data/type/MonsterColor";
import type { VariantId } from "@/data/type/VariantId";
import type { ICondition } from "@/data/conditions/Condition";

export interface MonsterData {
  id: string;
  content: ContentId;
  name: string;
  variants: VariantId[];
  images: {
    big: string;
    miniature: string;
    cards: {
      rookie: string[];
      fighter: string[];
      veteran: string[];
      champion: string[];
    };
  };
  color: MonsterColor;
  size: string;
  initiative: number;
  translation_key: string;
}

export interface ActiveMonsterData extends MonsterData {
  hp: number;
  maxHp: number;
  baseColor: string;
  msTimestamp: number;
  initiative: number;
  active: boolean;
  conditions: ICondition[];
  rank: null | "rookie" | "fighter" | "veteran" | "champion";
}
