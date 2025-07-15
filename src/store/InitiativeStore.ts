// #region external imports
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
// #endregion

// #region internal imports

export const ringColors = {
  Yellow: "Yellow",
  Navy: "Navy",
  Pink: "HotPink",
  Green: "Green",
  DarkRed: "FireBrick",
  Black: "Black",
  Orange: "DarkOrange",
  Gray: "Snow",
  LightBlue: "Aquamarine",
  Blue: "RoyalBlue",
  Red: "Red",
  Tan: "SaddleBrown",
};

import { Conditions, type ICondition } from "@/data/conditions/Condition";
import { FacelessConjurer } from "@/data/content/apocalypse/monster/FacelessConjurer";
import type { ActiveMonsterData } from "@/data/store/MonsterData";
import type { HeroData } from "@/data/repository/HeroData";
import { DarknessTokens, type IToken } from "@/data/initiative/DarknessTokens";
import _ from "lodash";
// #endregion

export const useInitiativeStore = defineStore("initiative", () => {
  // #region store variables
  const autoSkip = useStorage("initiative.AutoSkip", true);
  const autoConfirmDelete = useStorage("initiative.AutoConfirmDelete", false);
  const useDefaultHp = useStorage("initiative.UseDefaultHp", true);
  const turnIndex = useStorage("initiative.turnIndex", 0);
  const darknessTokens = useStorage("initiative.Tokens", _.shuffle(DarknessTokens) as IToken[]);
  const _initiativeList = useStorage("initiative.InitiativeList", [] as any[]);
  const _heros = useStorage("initiative.Heros", {} as Record<string, HeroData>);
  // #endregion

  // #region store functions
  const addHero = (dungeonRole: string, hero: HeroData) => {
    _heros.value[dungeonRole] = hero;
  };
  const addMonster = (monster: any): ActiveMonsterData => {
    const maxHp = _getDefaultHp(monster);
    const newMonster = {
      ...monster,
      hp: maxHp,
      maxHp: maxHp,
      msTimestamp: Date.now(),
      conditions: JSON.parse(JSON.stringify(Conditions)),
      baseColor: _nextAvailableColor(monster),
      cardIndex: 0,
    };
    _initiativeList.value.push(newMonster);
    return _initiativeList.value[_initiativeList.value.length - 1];
  };
  const clearInitiative = () => {
    if (autoConfirmDelete.value || confirm("Are you sure you want to clear the initiative?")) {
      turnIndex.value = 0;
      darknessTokens.value = _.shuffle(DarknessTokens);
      _initiativeList.value = [];
    }
  };
  const decrementCondition = (monster: ActiveMonsterData, condition: ICondition) => {
    const mIndex = _getMonsterIndex(monster);
    const cIndex = monster.conditions.findIndex((c) => c.name == condition.name);
    if (cIndex > -1 && monster.conditions[cIndex].count > 0) {
      monster.conditions[cIndex].count--;
      _initiativeList.value[mIndex] = monster;
    }
  };
  const decrementHp = (monster: any): ActiveMonsterData | null => {
    const mIndex = _getMonsterIndex(monster);
    const storeMonster = _initiativeList.value[mIndex];
    storeMonster.hp -= 1;
    if (storeMonster.hp < 1) {
      storeMonster.hp = 0;
      if (removeMonster(storeMonster)) {
        return null;
      }
    }
    return storeMonster;
  };
  const getHero = (dungeonRole: string | undefined): HeroData | null => {
    if (!dungeonRole) {
      return null;
    }
    return _heros.value[dungeonRole];
  };
  const incrementCondition = (monster: ActiveMonsterData, condition: ICondition) => {
    const mIndex = _getMonsterIndex(monster);
    const cIndex = monster.conditions.findIndex((c) => c.name == condition.name);
    if (cIndex > -1 && monster.conditions[cIndex].count < monster.conditions[cIndex].maxCount) {
      monster.conditions[cIndex].count++;
      _initiativeList.value[mIndex] = monster;
    }
  };
  const incrementHp = (monster: any): ActiveMonsterData => {
    const mIndex = _getMonsterIndex(monster);
    const storeMonster = _initiativeList.value[mIndex];
    if (storeMonster.hp < 0) {
      storeMonster.hp = 0;
    }
    if (storeMonster.hp != storeMonster.maxHp || confirm(`Override Max HP: ${storeMonster.maxHp}`)) {
      storeMonster.hp++;
    }
    return storeMonster;
  };
  const updateHp = (monster: any): ActiveMonsterData => {
    const mIndex = _getMonsterIndex(monster);
    const storeMonster = _initiativeList.value[mIndex];
    storeMonster.hp = monster.hp;
    storeMonster.maxHp = monster.maxHp;
    return storeMonster;
  };
  const getInitiativeList = () => {
    return _initiativeList.value.sort((a, b) => {
      return b.initiative - a.initiative;
    });
  };
  const removeHero = (dungeonRole: string) => {
    delete _heros.value[dungeonRole];
  };
  const removeMonster = (monster: any): boolean => {
    if (autoConfirmDelete.value || confirm(`Delete ${monster.name} - ${monster.baseColor}?`)) {
      const index = _getMonsterIndex(monster);
      if (index > -1) {
        _initiativeList.value.splice(index, 1);
      }
      return true;
    }
    return false;
  };
  // #endregion

  // #region non-exported variables
  const _ringColors: any = {
    small: Object.values(ringColors),
    large: ["Green", "HotPink", "Navy", "Yellow"],
  };
  // #endregion

  // #region non-exported functions
  const _nextAvailableColor = (monster: any): string => {
    let ringSize = monster.size || "small";
    if (monster.name == FacelessConjurer.name) {
      ringSize = "small";
    }
    const takenColors = _initiativeList.value.filter((m) => m.size == monster.size).map((m) => m.baseColor);
    for (const color of _ringColors[ringSize]) {
      if (!takenColors.includes(color)) {
        return color;
      }
    }
    return "Black";
  };
  const _hpProgressions = [
    [6, 9, 12, 15], // weak white
    [9, 12, 15, 18], // default white, weak gray
    [12, 16, 20, 24], // default gray, strong white, weak black
    [15, 20, 25, 30], // default black, strong gray
    [18, 24, 30, 36], // strong black
  ];
  const getProgressionIndex = (color: string): number => {
    switch (color) {
      case "white":
        return 1;
      case "gray":
        return 2;
      case "black":
        return 3;
      default:
        return NaN;
    }
  };
  const getRankIndex = (rank: string): number => {
    switch (rank) {
      case "rookie":
        return 0;
      case "fighter":
        return 1;
      case "veteran":
        return 2;
      case "champion":
        return 3;
      default:
        return NaN;
    }
  };
  const _getDefaultHp = (monster: any): number => {
    let difficultyModifier: number = 0;
    if (monster.id == "scenario-monster") {
      const s = prompt(`Enter Max HP for ${monster.name}`) || "99";
      return parseInt(s) || 99;
    }
    switch (monster.id) {
      case "corrupted-worm":
      case "faceless-conjurer":
      case "night-stalker":
        difficultyModifier = -1;
        break;
      case "death-messenger":
      case "dream-titan":
      case "fell-astris":
      case "gorgon-hexer":
      case "hellspawn-brute":
      case "ravager":
      case "shadow-guardian":
      case "shadow-knight":
      case "shadow-vampire":
      case "skeleton-archer":
      case "skeleton-knight":
        if (monster.variant == "alternate") {
          difficultyModifier = -1;
        }
        break;
      case "gremlin-horde":
        if (monster.variant == "standard") {
          difficultyModifier = -1;
        }
        break;
      case "executioner":
        difficultyModifier = 1;
        break;
    }
    const progressionIndex = getProgressionIndex(monster.color) + difficultyModifier;
    let maxHp: number | null = null;
    if (progressionIndex >= 0) {
      const rankIndex: number = getRankIndex(monster.rank);
      if (rankIndex >= 0) {
        maxHp = _hpProgressions[progressionIndex][rankIndex];
      }
    }
    const defaultHp: number = maxHp ?? 1;
    if (!maxHp || !useDefaultHp.value) {
      const p: string = `Enter max HP for ${monster.name}`;
      const hpStr: string = prompt(p, defaultHp.toString()) ?? "1";
      maxHp = parseInt(hpStr);
    }
    return maxHp ?? 1;
  };

  const _getMonsterIndex = (monster: any): number => {
    return _initiativeList.value.findIndex((m) => m.msTimestamp == monster.msTimestamp);
  };

  // #endregion

  return {
    // properties
    autoSkip,
    autoConfirmDelete,
    ringColors,
    turnIndex,
    darknessTokens,
    useDefaultHp,
    // functions
    addHero,
    addMonster,
    clearInitiative,
    decrementCondition,
    decrementHp,
    getHero,
    getInitiativeList,
    incrementCondition,
    incrementHp,
    removeHero,
    removeMonster,
    updateHp,
  };
});
