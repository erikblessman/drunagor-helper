import type { ContentId } from "@/data/type/ContentId";
import type { MonsterColor } from "@/data/type/MonsterColor";
import type { VariantId } from "@/data/type/VariantId";
import type { ICondition } from "../conditions/Condition";

export interface MonsterData {
  id: string;
  content: ContentId;
  name: string;
  variants: VariantId[];
  size: "small" | "large" | undefined;
  initiative: string | undefined;
  images: {
    big: string;
    miniature: string;
    cards: string[] | undefined;
  };
  color: MonsterColor;
  conditionImmunities: ICondition[];
}

export interface ActiveMonsterData extends MonsterData {
  hp: number;
  conditions: ICondition[];
  maxHp: number;
  baseColor: string;
}