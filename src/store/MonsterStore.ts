import type { ActiveMonsterData } from "@/data/store/MonsterData";
import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import type { IMonster } from "@/data/monsters/Monster";
import type { ICondition } from "@/data/conditions/Condition";

export const MonsterStore = defineStore("monsters", () => {
    const activeMonsterData = useStorage("ActiveMonsters", [] as ActiveMonsterData[]);

    function addMonster(monster: ActiveMonsterData) {
        activeMonsterData.value.push(monster);
    }

    function removeMonster(index: number) {
        activeMonsterData.value.splice(index, 1);
    }

    function setMonsterHp(index: number, hp: number) {
        activeMonsterData.value[index].hp = hp;
    }

    function addCondition(index: number, condition: ICondition) {
        let monster = activeMonsterData.value[index];
        if (!monster.conditions) {
            monster.conditions = [];
        }
        monster.conditions.push(condition);
        activeMonsterData.value[index] = monster;
    }

    function removeCondition(monsterIndex: number, condition: ICondition) {
        let monster : ActiveMonsterData = activeMonsterData.value[monsterIndex];
        let conditionIndex : number = monster.conditions.map(c => c.name).indexOf(condition.name);
        if (conditionIndex === -1) {
            return;
        }
        monster.conditions.splice(conditionIndex, 1);
        activeMonsterData.value[monsterIndex] = monster;
    }

    function getActiveMonsters(): ActiveMonsterData[] {
        return activeMonsterData.value;
    }

    function clearActiveMonsters(): void {
        activeMonsterData.value = [];
    }

    function getMonsterMaxHp(monster: IMonster): number {
        // TODO: Check local storage for max hp or prompt user for max hp
        return 10;
    }

    return {
        activeMonsterData,
        addMonster,
        removeMonster,
        setMonsterHp,
        addCondition,
        removeCondition,
        getActiveMonsters,
        clearActiveMonsters,
        getMonsterMaxHp,
    };
});