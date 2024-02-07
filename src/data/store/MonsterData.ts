import type { ContentId } from "@/data/type/ContentId";
import type { MonsterColor } from "@/data/type/MonsterColor";
import type { VariantId } from "@/data/type/VariantId";
import type { ICondition } from "../conditions/Condition";

export interface MonsterData {
  id: string;
  content: ContentId;
  name: string;
  variants: VariantId[];
  images: {
    big: string;
    miniature: string;
  };
  color: MonsterColor;
}

export interface ActiveMonsterData extends MonsterData {
  hp: number;
  conditions: ICondition[];
  maxHp: number;
  baseColor: string;
}