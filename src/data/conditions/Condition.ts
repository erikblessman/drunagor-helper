import type { ActiveMonsterData } from "../store/MonsterData";
import BleedImageUrl from "@/assets/tokens/token-bleed.png";
import PoisonImageUrl from "@/assets/tokens/token-poison.png";
import BurnImageUrl from "@/assets/tokens/token-burn.png";
import StunImageUrl from "@/assets/tokens/token-stun.png";
import KnockDownImageUrl from "@/assets/tokens/token-knocked-down.png";
import SlowImageUrl from "@/assets/tokens/token-slow.png";
import RangersMarkImgUrl from "@/assets/tokens/token-rangers-mark.png";

export interface ICondition {
    name: string;
    count: number;
    description: string;
    image: string;
    apply: (monster: ActiveMonsterData) => void;
    incrementCount: () => number;
    decrementCount: () => number;
}

class Condition implements ICondition {
    constructor(object: any) {
        this.name = object.name;
        this.count = 0;
        this.maxCount = object.maxCount;
        this.description = object.description;
        this.image = object.image;
        this.apply = object.apply;
        this.incrementCount = object.incrementCount;
        this.decrementCount = object.decrementCount;
        this.incrementCount = () => {
            if (++(this.count) > this.maxCount) {
                this.count = this.maxCount;
            }
            return this.count;
        };
        this.decrementCount = () => {
            if (--(this.count) >= 0) {
                this.count = 0;
            }
            return this.count;
        };
    }
    name: string;
    count: number;
    maxCount: number;
    description: string;
    image: string;
    apply: (monster: ActiveMonsterData) => void;
    incrementCount: () => number;
    decrementCount: () => number;
}

const MAX_STACKABLE_COUNT : number = 4;
class StackableCondition extends Condition {
    constructor(object: any) {
        object.maxCount = MAX_STACKABLE_COUNT;
        super(object);
    }
}

const MAX_REDUNDANT_COUNT : number = 1;
class RedundantCondition extends Condition {
    constructor(object: any) {
        object.maxCount = MAX_REDUNDANT_COUNT;
        super(object);
    }
}

export const Bleeding : StackableCondition = new Condition({
    name: "Bleeding",
    image: BleedImageUrl,
    apply: function (monster: ActiveMonsterData): void {
        monster.hp -= this.count;
        this.remove();
    },
});

export const Poison : StackableCondition = new Condition({
    name: "Poison",
    image: PoisonImageUrl,
    apply: function (monster: ActiveMonsterData): void {
        monster.hp -= this.count;
    }
});

export const Burning : StackableCondition = new Condition({
    name: "Burning",
    image: BurnImageUrl,
    apply: function (monster: ActiveMonsterData): void {
        monster.hp -= this.count;
        this.decrementCount();
    }
});

export const Stun : RedundantCondition = new Condition({
    name: "Stun",
    image: StunImageUrl,
    apply: function (monster: ActiveMonsterData): void {}
});

export const KnockDown : RedundantCondition = new Condition({
    name: "Knock Down",
    image: KnockDownImageUrl,
    apply: function (monster: ActiveMonsterData): void {}
});

export const Slow : RedundantCondition = new Condition({
    name: "Slow",
    image: SlowImageUrl,
    apply: function (monster: ActiveMonsterData): void {}
});

export const RangersMark : RedundantCondition = new Condition({
    name: "Ranger's Mark",
    image: RangersMarkImgUrl,
    apply: function (monster: ActiveMonsterData): void {}
});

export const Conditions : ICondition[] = [Bleeding, Poison, Burning, Stun, KnockDown, Slow, RangersMark];