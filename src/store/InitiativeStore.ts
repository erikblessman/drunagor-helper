// #region external imports
import { computed, ref } from "vue";
import { acceptHMRUpdate, defineStore } from "pinia";
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

import { Bleed, Burn, Conditions, Poison, Shield, type ICondition } from "@/data/conditions/Condition";
import { FacelessConjurer } from "@/data/content/apocalypse/monster/FacelessConjurer";
import type { ActiveMonsterData } from "@/data/store/MonsterData";
import type { HeroData } from "@/data/repository/HeroData";
import { DarknessTokens, type IToken } from "@/data/initiative/DarknessTokens";
import _ from "lodash";
import { confirmDialog } from "@/composables/useConfirmDialog";
// #endregion

export const useInitiativeStore = defineStore("initiative", () => {
  // #region store variables
  const autoSkip = useStorage("initiative.AutoSkip", true);
  const autoConfirmDelete = useStorage("initiative.AutoConfirmDelete", false);
  const useDefaultHp = useStorage("initiative.UseDefaultHp", true);
  const activeCampaignId = useStorage("initiative.activeCampaignId", null as string | null);
  const turnIndex = useStorage("initiative.turnIndex", 0);
  const darknessTokens = useStorage("initiative.Tokens", _.shuffle(DarknessTokens) as IToken[]);
  const _initiativeList = useStorage("initiative.InitiativeList", [] as any[]);
  const _heros = useStorage("initiative.Heros", {} as Record<string, HeroData>);
  const _history = ref<{ label: string; snapshot: any[] }[]>([]);
  const MAX_HISTORY = 20;
  // #endregion

  // #region history
  const _snapshot = (label: string) => {
    _history.value.push({ label, snapshot: _.cloneDeep(_initiativeList.value) });
    if (_history.value.length > MAX_HISTORY) {
      _history.value.shift();
    }
  };
  const canUndo = computed(() => _history.value.length > 0);
  const undo = () => {
    if (_history.value.length === 0) return;
    _initiativeList.value = _history.value.pop()!.snapshot;
  };
  // #endregion

  // #region store functions
  const addHero = (dungeonRole: string, hero: HeroData) => {
    _heros.value[dungeonRole] = hero;
  };
  const addMonster = (monster: any): ActiveMonsterData | null => {
    _snapshot(`Added ${monster.name}`);
    // Custom monsters arrive with a user-chosen max HP; everything else uses the color × rank default.
    const maxHp = monster.maxHp > 0 ? monster.maxHp : _getDefaultHp(monster);
    if (!maxHp) {
      return null;
    }
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
  const clearInitiative = async () => {
    if (
      autoConfirmDelete.value ||
      (await confirmDialog({
        title: "Clear Initiative",
        message: "Are you sure you want to clear the initiative?",
        confirmText: "Clear",
        danger: true,
      }))
    ) {
      _snapshot('Cleared initiative');
      turnIndex.value = 0;
      darknessTokens.value = _.shuffle(DarknessTokens);
      _initiativeList.value = [];
    }
  };
  const decrementCondition = (monster: ActiveMonsterData, condition: ICondition) => {
    _snapshot(`${monster.name}: ${condition.name} -1`);
    const mIndex = _getMonsterIndex(monster);
    const cIndex = monster.conditions.findIndex((c) => c.name == condition.name);
    if (cIndex > -1 && monster.conditions[cIndex].count > 0) {
      monster.conditions[cIndex].count--;
      _initiativeList.value[mIndex] = monster;
    }
  };
  const decrementHp = (monster: any, n: number = -1): Promise<ActiveMonsterData | null> => {
    _snapshot(`${monster.name} ${n} HP`);
    const mIndex = _getMonsterIndex(monster);
    return _loseHp(_initiativeList.value[mIndex], -n);
  };
  // Start-of-turn damage from Burn, Bleed and Poison: each deals damage equal to its count.
  // Bleed is then cleared, Burn drops by 1, Poison stays. Shield does not apply. Single undo step.
  const getConditionDamage = (monster: any): { burn: number; bleed: number; poison: number; total: number } => {
    const count = (name: string): number =>
      monster?.conditions?.find((c: ICondition) => c.name == name)?.count ?? 0;
    const burn = count(Burn.name);
    const bleed = count(Bleed.name);
    const poison = count(Poison.name);
    return { burn, bleed, poison, total: burn + bleed + poison };
  };
  const applyConditionDamage = async (monster: any): Promise<ActiveMonsterData | null> => {
    const mIndex = _getMonsterIndex(monster);
    const storeMonster = _initiativeList.value[mIndex];
    if (!storeMonster) return null;
    const { total } = getConditionDamage(storeMonster);
    if (total <= 0) return storeMonster;
    _snapshot(`${storeMonster.name} -${total} HP (conditions)`);
    const bleed = storeMonster.conditions.find((c: ICondition) => c.name == Bleed.name);
    if (bleed) {
      bleed.count = 0;
    }
    const burn = storeMonster.conditions.find((c: ICondition) => c.name == Burn.name);
    if (burn && burn.count > 0) {
      burn.count--;
    }
    return _loseHp(storeMonster, total);
  };
  // Applies damage, letting the monster's Shield absorb as much as possible first.
  // Blocked damage is removed from the Shield count. Recorded as a single undo step.
  const applyDamage = async (
    monster: any,
    amount: number
  ): Promise<{ monster: ActiveMonsterData | null; blocked: number }> => {
    const mIndex = _getMonsterIndex(monster);
    const storeMonster = _initiativeList.value[mIndex];
    const shield = storeMonster.conditions?.find((c: ICondition) => c.name == Shield.name);
    const blocked = Math.min(shield?.count ?? 0, amount);
    _snapshot(
      blocked > 0
        ? `${monster.name} -${amount - blocked} HP (Shield blocked ${blocked})`
        : `${monster.name} -${amount} HP`
    );
    if (shield && blocked > 0) {
      shield.count -= blocked;
    }
    const remaining = amount - blocked;
    if (remaining <= 0) {
      return { monster: storeMonster, blocked };
    }
    return { monster: await _loseHp(storeMonster, remaining), blocked };
  };
  const _confirmDelete = async (monster: any, message: string): Promise<boolean> =>
    autoConfirmDelete.value ||
    confirmDialog({
      title: "Remove Monster",
      message: `${message}\nRemove ${monster.name} (${monster.baseColor})?`,
      confirmText: "Remove",
      cancelText: "Keep",
      danger: true,
    });
  const _loseHp = async (storeMonster: any, amount: number): Promise<ActiveMonsterData | null> => {
    storeMonster.hp -= amount;
    if (storeMonster.hp < 1) {
      storeMonster.hp = 0;
      if (await _confirmDelete(storeMonster, `${storeMonster.name} is at 0 HP.`)) {
        _doRemoveMonster(storeMonster);
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
    _snapshot(`${monster.name}: ${condition.name} +1`);
    const mIndex = _getMonsterIndex(monster);
    const cIndex = monster.conditions.findIndex((c) => c.name == condition.name);
    if (cIndex > -1 && monster.conditions[cIndex].count < monster.conditions[cIndex].maxCount) {
      monster.conditions[cIndex].count++;
      _initiativeList.value[mIndex] = monster;
    }
  };
  const incrementHp = async (monster: any, n: number = 1): Promise<ActiveMonsterData> => {
    _snapshot(`${monster.name} +${n} HP`);
    const mIndex = _getMonsterIndex(monster);
    const storeMonster = _initiativeList.value[mIndex];
    if (storeMonster.hp < 0) {
      storeMonster.hp = 0;
    }
    const newHp = storeMonster.hp + n;
    if (
      newHp <= storeMonster.maxHp ||
      (await confirmDialog({
        title: "Exceed Max HP",
        message: `Healing ${storeMonster.name} to ${newHp} HP exceeds its max of ${storeMonster.maxHp}.\nHeal above max HP?`,
        confirmText: "Heal",
      }))
    ) {
      storeMonster.hp = newHp;
    }
    return storeMonster;
  };
  const updateHp = (monster: any): ActiveMonsterData => {
    _snapshot(`${monster.name} HP → ${monster.hp}/${monster.maxHp}`);
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
  const removeMonster = async (monster: any): Promise<boolean> => {
    if (
      autoConfirmDelete.value ||
      (await confirmDialog({
        title: "Remove Monster",
        message: `Remove ${monster.name} (${monster.baseColor})?`,
        confirmText: "Remove",
        danger: true,
      }))
    ) {
      _snapshot(`Removed ${monster.name}`);
      _doRemoveMonster(monster);
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
  const _doRemoveMonster = (monster: any) => {
    const index = _getMonsterIndex(monster);
    if (index > -1) {
      _initiativeList.value.splice(index, 1);
    }
  };
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
  const _getDefaultHp = (monster: any): number | null => {
    let difficultyModifier: number = 0;
    if (monster.id == "scenario-monster") {
      return 99;
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
    if (!maxHp || !useDefaultHp.value) {
      maxHp = 99;
    }
    return maxHp;
  };

  const _getMonsterIndex = (monster: any): number => {
    return _initiativeList.value.findIndex((m) => m.msTimestamp == monster.msTimestamp);
  };

  // #endregion

  return {
    // properties
    autoSkip,
    autoConfirmDelete,
    activeCampaignId,
    ringColors,
    turnIndex,
    darknessTokens,
    useDefaultHp,
    canUndo,
    _history,
    // functions
    addHero,
    addMonster,
    applyConditionDamage,
    applyDamage,
    clearInitiative,
    getConditionDamage,
    decrementCondition,
    decrementHp,
    getHero,
    getInitiativeList,
    incrementCondition,
    incrementHp,
    removeHero,
    removeMonster,
    updateHp,
    getDefaultHp: _getDefaultHp,
    undo,
  };
});

// Let Vite hot-swap this store so newly added actions are available without a full reload.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useInitiativeStore, import.meta.hot));
}
