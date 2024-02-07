import type { ActiveMonsterData } from "@/data/store/MonsterData";
import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";

export const MonsterStore = defineStore("monsters", () => {
    const activeMonsterData = useStorage("ActiveMonsters", [] as ActiveMonsterData[]);

    function addMonster(monster: ActiveMonsterData) {
        activeMonsterData.value.push(monster);
    }

    function removeMonster(monster: ActiveMonsterData) {
        activeMonsterData.value = activeMonsterData.value.filter((m) => m.id !== monster.id);
    }

    function getActiveMonsters(): ActiveMonsterData[] {
        return activeMonsterData.value;
    }

    function clear(): void {
        activeMonsterData.value = [];
    }

    return {
        activeMonsterData,
        addMonster,
        removeMonster,
        getActiveMonsters,
        clear,
    };
});