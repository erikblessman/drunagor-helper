import type { ActiveMonsterData } from "@/data/store/MonsterData";
import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import type { ICondition } from "@/data/conditions/Condition";

export const MonsterStore = defineStore("monsters", () => {
    const activeMonsterData = useStorage("ActiveMonsters", [] as ActiveMonsterData[]);
    const monsterMaxHp = useStorage("MonsterMaxHp", {} as Record<string, number>);

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

    function getDefaultHpByColor(color:string) {
        switch (color) {
            case "white":
                return 9;
            case "gray":
                return 12;
            case "black":
                return 15;
            default:
                return 20;
        }
    }

    function getDefaultHpByName(name:string) : number | null {
        return monsterMaxHp.value[name];
    }

    function setDefaultHpByName(name:string, hp:number) {
        monsterMaxHp.value[name] = hp;
    }

    function unsetDefaultHpByName(name:string) {
        delete monsterMaxHp.value[name];
    }

    function getMonsterMaxHp(monster: ActiveMonsterData): number {
        console.log("getting max hp");
        let hpForMonsterName : number | null = getDefaultHpByName(monster.name);
        let hpForMonsterColor : number | null = getDefaultHpByColor(monster.color);
        let defaultHp : number = hpForMonsterName ?? hpForMonsterColor ?? 20;
        let promptHp : number = parseInt(prompt(`Enter max HP for ${monster.name}`, defaultHp.toString()));

        console.log({promptHp, hpForMonsterName, hpForMonsterColor});
        if (promptHp) {
            if (promptHp !== hpForMonsterName) {
                setDefaultHpByName(monster.name, promptHp);
            }
            return promptHp;
        } else {
            unsetDefaultHpByName(monster.name);
        }
        return hpForMonsterColor ?? 20;
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