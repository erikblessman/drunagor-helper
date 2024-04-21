// #region external imports
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
// #endregion

// #region internal imports
import { Conditions } from "@/data/conditions/Condition";
import { FacelessConjurer } from "@/data/content/apocalypse/monster/FacelessConjurer";
// #endregion

export const useInitiativeStore = defineStore("initiative", () => {
    // #region store variables
    const autoConfirmDelete = useStorage("AutoConfirmDelete", false);
    const useDefaultHp = useStorage("UseDefaultHp", true);
    const _initiativeList = useStorage("Initiative List", [] as any[]);
    const _monsterMaxHp = useStorage("MonsterMaxHp", {} as Record<string, number>);
    // #endregion

    // #region store functions
    const addMonster = (monster: any) => {
        const maxHp = _getDefaultHp(monster);
        let newMonster = {
            ...monster,
            hp: maxHp,
            maxHp: maxHp,
            msTimestamp: Date.now(),
            conditions: JSON.parse(JSON.stringify(Conditions)),
            baseColor: _nextAvailableColor(monster),
            cardIndex: 0,
        };
        _initiativeList.value.push(newMonster);
    };
    const clearInitiative = () => {
        if (autoConfirmDelete.value || confirm("Are you sure you want to clear the initiative?")) {
            _initiativeList.value = [];
        }
    };
    const decrementHp = (monster: any) => {
        if (monster.hp > 1) {
            monster.hp -= 1;
            updateMonster(monster);
        } else {
            removeMonster(monster);
        }
    };
    const incrementHp = (monster: any) => {
        if (monster.hp < 0) {
            monster.hp = 0;
        }
        if (monster.hp < monster.maxHp || confirm(`Override Max HP: ${monster.maxHp}`)) {
            monster.hp++;
            updateMonster(monster);
        }
    };
    const getInitiativeList = () => {
        return _initiativeList.value.sort((a, b) => {
            return b.initiative - a.initiative;
        });
    };

    const removeMonster = (monster: any) => {
        if (autoConfirmDelete.value || confirm(`Delete ${monster.name} - ${monster.baseColor}?`)) {
            const index = _getMonsterIndex(monster);
            if (index > -1) {
                _initiativeList.value.splice(index, 1);
            }
        }
    };

    const updateMonster = (monster: any) => {
        const index = _getMonsterIndex(monster);
        _initiativeList.value[index] = monster;
    };
    // #endregion

    // #region non-exported variables
    const _ringColors: any = {
        small: [
            "Yellow",
            "Navy",
            "HotPink",
            "Green",
            "FireBrick",
            "Black",
            "DarkOrange",
            "Snow",
            "Aquamarine",
            "RoyalBlue",
            "Red",
            "SaddleBrown",
        ],
        large: ["Green", "HotPink", "Navy", "Yellow"],
    };
    // #endregion

    // #region non-exported functions
    const _nextAvailableColor = (monster: any): string => {
        let ringSize = monster.size;
        if (monster.name == FacelessConjurer.name) {
            ringSize = "small";
        }
        let takenColors = _initiativeList.value.filter((m) => m.size == monster.size).map((m) => m.baseColor);
        for (let color of _ringColors[ringSize]) {
            if (!takenColors.includes(color)) {
                return color;
            }
        }
        return "Black";
    };

    const _getDefaultHp = (monster: any): number => {
        let hpForMonsterName: number | null = _getDefaultHpByName(monster.name);
        let hpForMonsterColor: number | null = _getDefaultHpByColor(monster.color);
        let defaultHp: number = hpForMonsterName ?? hpForMonsterColor ?? 20;
        if (useDefaultHp.value) {
            return defaultHp;
        }
        let promptHp: number = parseInt(prompt(`Enter max HP for ${monster.name}`, defaultHp.toString()) || "");

        if (promptHp) {
            if (promptHp !== hpForMonsterName) {
                _setDefaultHpByName(monster.name, promptHp);
            }
            return promptHp;
        } else {
            _unsetDefaultHpByName(monster.name);
        }
        return hpForMonsterColor ?? 20;
    };

    const _getDefaultHpByColor = (color: string): number => {
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
    };

    const _getDefaultHpByName = (name: string): number => {
        return _monsterMaxHp.value[name];
    };

    const _getMonsterIndex = (monster: any): number => {
        return _initiativeList.value.findIndex((m) => m.msTimestamp == monster.msTimestamp);
    };

    const _setDefaultHpByName = (name: string, hp: number): void => {
        _monsterMaxHp.value[name] = hp;
    };

    const _unsetDefaultHpByName = (name: string): void => {
        delete _monsterMaxHp.value[name];
    };

    // #endregion

    return {
        // properties
        autoConfirmDelete,
        useDefaultHp,
        // functions
        addMonster,
        clearInitiative,
        decrementHp,
        getInitiativeList,
        incrementHp,
        removeMonster,
        updateMonster,
    };
});
