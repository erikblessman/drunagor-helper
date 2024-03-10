import type { ActiveMonsterData } from "@/data/store/MonsterData";
import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import type { ICondition } from "@/data/conditions/Condition";
import type { MonsterData } from "@/data/store/MonsterData";

export const MonsterStore = defineStore("monsters", () => {
    const activeMonsterData = useStorage("ActiveMonsters", [] as ActiveMonsterData[]);
    const monsterMaxHp = useStorage("MonsterMaxHp", {} as Record<string, number>);
    const autoConfirmDelete = useStorage("AutoConfirmDelete", false);
    const useDefaultHp = useStorage("UseDefaultHp", true);

    /// activeMonsterData management --------------------------------------------------------------

    /// private list of ring colors available for monster miniatures
    const _availableRingColors: string[] = [
      "Yellow", "Navy", "HotPink", "Green", "FireBrick", "Black",
      "DarkOrange", "Snow", "Aquamarine", "RoyalBlue", "Red", "SaddleBrown",
    ];

    /// private list of ring colors available for large monster miniatures
    const _availableRingColorsLarge: string[] = [
      "Yellow", "Navy", "HotPink", "Green",
    ];

    /// private function to get the next available ring color
    function _nextAvailableColor(monster: MonsterData) {
        let takenColors = activeMonsterData.value.filter(m => m.size == monster.size).map(m => m.baseColor);
        let availableColors = monster.size == "large" ? _availableRingColorsLarge : _availableRingColors;
        for (let color of availableColors) {
            if (!takenColors.includes(color)) {
                return color;
            }
        }
        return "Black";
    }
    
    /// private function to get the index of a monster in the active monsters list
    /// @param monster: ActiveMonsterData - the monster to get the index of
    /// @returns number - the index of the monster in the active monsters list
    const _getMonsterIndex = (monster: ActiveMonsterData) : number => {
        return activeMonsterData.value.findIndex((m) => m.msTimestamp === monster.msTimestamp);
    }

    /// private function to update a monster in the active monsters list
    /// @param monster: ActiveMonsterData - the monster to update
    const _updateMonster = (monster: ActiveMonsterData) : void => {
        let index = _getMonsterIndex(monster);
        activeMonsterData.value[index] = monster;
    }

    /// public function to add a monster to the active monsters list
    /// @param monster: MonsterData - the monster to add
    /// @remarks - Returns the first ring color not already in use
    /// @todo - Make allowances for large monsters with limited ring colors
    function addMonster(monster: MonsterData) : void {
        let newMonster: ActiveMonsterData = {
            ...monster,
        } as ActiveMonsterData;
        newMonster.conditions = [];
        newMonster.hp = getMonsterMaxHp(newMonster);
        newMonster.baseColor = _nextAvailableColor(monster);
        newMonster.msTimestamp = Date.now();
        activeMonsterData.value.push(newMonster);
    }

    /// public function to remove a monster from the active monsters list
    /// @param monster: ActiveMonsterData - the monster to remove
    /// @remarks - Prompts the user for confirmation
    function removeMonster(monster: ActiveMonsterData) : void {
        if (!autoConfirmDelete.value && !confirm("Remove " + monster.name + " (" + monster.baseColor + ")?")) {
          return;
        }
        activeMonsterData.value.splice(_getMonsterIndex(monster), 1);
    }

    /// public function to remove all monsters from the active monsters list
    function clearActiveMonsters(): void {
        if (!autoConfirmDelete.value && !confirm("Clear all active monsters?")) {
          return;
        }
        activeMonsterData.value = [];
    }

    /// public function to get active monsters by initiative --------------------------------------
    function getActiveMonstersByInitiative(initiative:number): ActiveMonsterData[] {
        return activeMonsterData.value.filter((a) => {
            return a.initiative === initiative;
        });
    }

    /// functions for managing monster conditions -------------------------------------------------

    /// public function to add a condition to a monster
    /// @param monster: ActiveMonsterData - the monster to add the condition to
    /// @param condition: Condition - the condition to add
    function addCondition(monster: ActiveMonsterData, condition: ICondition) {
        if (!monster.conditions) {
            monster.conditions = [];
        }
        monster.conditions.push(condition);
        _updateMonster(monster);
    }

    /// public function to remove a condition from a monster
    /// @param monster: ActiveMonsterData - the monster to remove the condition from
    /// @param condition: Condition - the condition to remove
    function removeCondition(monster: ActiveMonsterData, condition: ICondition) {
        let conditionIndex : number = monster.conditions.map(c => c.name).indexOf(condition.name);
        if (conditionIndex === -1) {
            return;
        }
        monster.conditions.splice(conditionIndex, 1);
        _updateMonster(monster);
    }

    /// functions for managing monster HP --------------------------------------------------------

    /// private function to get the default max HP for a monster of a given color
    /// @param color: string - the color of the monster
    /// @returns number - the default max HP for a monster of the given color
    function _getDefaultHpByColor(color:string) {
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

    /// private function to get the default max HP for a monster by name
    /// @param name: string - the name of the monster
    /// @returns number - the default max HP for a monster of the given name
    function _getDefaultHpByName(name:string) : number | null {
        return monsterMaxHp.value[name];
    }

    /// private function to set the default max HP for a monster by name
    /// @param name: string - the name of the monster
    /// @param hp: number - the default max HP for a monster of the given name
    function _setDefaultHpByName(name:string, hp:number) {
        monsterMaxHp.value[name] = hp;
    }

    /// private function to unset the default max HP for a monster by name
    /// @param name: string - the name of the monster
    function _unsetDefaultHpByName(name:string) {
        delete monsterMaxHp.value[name];
    }

    /// private function to get the default max HP for a monster
    /// @param monster: ActiveMonsterData - the monster to get the default max HP for
    /// @returns number - the default max HP for the monster
    /// @remarks - Prompts the user to confirm the default HP
    /// The default hp favors the name over the color.
    /// If the user enters a new value, it is saved as the default for that monster name.
    /// If the user enters NO value, the default for that monster name is removed.
    function getMonsterMaxHp(monster: ActiveMonsterData): number {
        let hpForMonsterName : number | null = _getDefaultHpByName(monster.name);
        let hpForMonsterColor : number | null = _getDefaultHpByColor(monster.color);
        let defaultHp : number = hpForMonsterName ?? hpForMonsterColor ?? 20;
        if (useDefaultHp.value) {
            return defaultHp;
        }
        let promptHp : number = parseInt(prompt(`Enter max HP for ${monster.name}`, defaultHp.toString()));

        if (promptHp) {
            if (promptHp !== hpForMonsterName) {
                _setDefaultHpByName(monster.name, promptHp);
            }
            return promptHp;
        } else {
            _unsetDefaultHpByName(monster.name);
        }
        return hpForMonsterColor ?? 20;
    }

    /// public function to increment the current hp for the monster
    /// @param monster: ActiveMonsterData - the monster to increment the hp for
    function incrementHp(monster: ActiveMonsterData) {
        monster.hp++;
        _updateMonster(monster);
    }
  
    /// public function to decrement the current hp for the monster
    /// @param monster: ActiveMonsterData - the monster to decrement the hp for
    /// @remarks - Removes the monster if the hp is 0 or less
    function decrementHp(monster: ActiveMonsterData) {
        monster.hp--;
        if (monster.hp <= 0) {
            removeMonster(monster);
        } else {
            _updateMonster(monster);
        }
    }

    return {
        activeMonsterData,
        addMonster,
        removeMonster,
        addCondition,
        removeCondition,
        clearActiveMonsters,
        incrementHp,
        decrementHp,
        autoConfirmDelete,
        useDefaultHp,
        getActiveMonstersByInitiative,
    };
});