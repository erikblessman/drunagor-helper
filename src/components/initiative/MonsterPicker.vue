<script setup lang="ts">
import { computed, ref, watch } from "vue";
import BaseDivider from "@/components/BaseDivider.vue";
import BaseModal from "@/components/BaseModal.vue";
import KeypadModal from "@/components/KeypadModal.vue";
import BaseList from "@/components/BaseList.vue";
import BaseListItem from "@/components/BaseListItem.vue";
import { useToast } from "vue-toastification";
import * as _ from "lodash-es";
import { AdjustmentsHorizontalIcon, CubeIcon } from "@heroicons/vue/24/solid";
import { CheckCircleIcon } from "@heroicons/vue/24/outline";
import { MonsterDataStore } from "@/data/store/MonsterDataStore";
import type { ActiveMonsterData, MonsterData } from "@/data/store/MonsterData";
import { InitiativeList } from "@/data/initiative/InitiativePlaces";
import type { MonsterColor } from "@/data/type/MonsterColor";
import { useInitiativeStore } from "@/store/InitiativeStore";

const toast = useToast();
const initiativeStore = useInitiativeStore();

const isOpen = ref(false);

function openModal() {
  isOpen.value = true;
}
function closeModal() {
  isOpen.value = false;
}
type ColorFilter = MonsterColor | 'commander' | 'scenario-monster' | null;
type RankFilter = 'rookie' | 'fighter' | 'veteran' | 'champion' | null;
const colorFilter = ref<ColorFilter>(null);
const rankSelection = ref<RankFilter>(null);
const textFilter = ref<string|null>(null);

defineExpose({ openModal });

const monsterStore = MonsterDataStore();
const filteredMonsters = computed<MonsterData[]>(() => {
  const validColors: ColorFilter[] = ['white', 'gray', 'black'];
  if (colorFilter.value !== null && !validColors.includes(colorFilter.value)) {
    return [];
  }
  return filterMonsters(monsterStore.monsters);
});
const filteredScenarioMonsters = computed<MonsterData[]>(() => {
  const validColors: ColorFilter[] = ['scenario-monster'];
  if (colorFilter.value !== null && !validColors.includes(colorFilter.value)) {
    console.log({filter: colorFilter.value, validColors});
    return [];
  }
  return filterMonsters(monsterStore.scenarioMonsters)
});
const filteredRandomCommanders = computed<MonsterData[]>(() => {
  const validColors: ColorFilter[] = ['commander'];
  if (colorFilter.value !== null && !validColors.includes(colorFilter.value)) {
    console.log({filter: colorFilter.value, validColors});
    return [];
  }
  return filterMonsters(monsterStore.randomCommanders)
});
const filteredScenarioCommanders = computed<MonsterData[]>(() => {
  const validColors: ColorFilter[] = ['commander'];
  if (colorFilter.value !== null && !validColors.includes(colorFilter.value)) {
    console.log({filter: colorFilter.value, validColors});
    return [];
  }
  return filterMonsters(monsterStore.scenarioCommanders)
});
const filteredSpecialCommanders = computed<MonsterData[]>(() => {
  const validColors: ColorFilter[] = ['commander'];
  if (colorFilter.value !== null && !validColors.includes(colorFilter.value)) {
    console.log({filter: colorFilter.value, validColors});
    return [];
  }
  return filterMonsters(monsterStore.specialCommanders)
});
const filteredCommanders = computed<MonsterData[]>(() => {
  const validColors: ColorFilter[] = ['commander'];
  if (colorFilter.value !== null && !validColors.includes(colorFilter.value)) {
    console.log({filter: colorFilter.value, validColors});
    return [];
  }
  return filterMonsters(monsterStore.commanders)
});
const allMonsters = computed<MonsterData[]>(() => {
  return filteredMonsters.value
    .concat(filteredScenarioMonsters.value)
    .concat(filteredRandomCommanders.value)
    .concat(filteredScenarioCommanders.value)
    .concat(filteredSpecialCommanders.value);
});

const emit = defineEmits(["pick-monster"]);

function filterMonsters(list: MonsterData[]): MonsterData[] {
  let regex: RegExp | null = null;
  if (textFilter.value !== null) {
    regex = new RegExp(textFilter.value?.split('').join('.*') ?? '', 'i');
  }
  return list.filter(m => {
    if (!monsterStore.isEnabled(m.content)) {
      return false;
    }
    if (colorFilter.value !== null) {
      const color = ['scenario-monster', 'commander'].includes(colorFilter.value) ? 'other' : colorFilter.value;
      if (m.color !== color) {
        return false;
      }
    }
    if (regex !== null) {
      if (!regex.test(m.name)) {
        return false;
      }
    }
    return true;
  }).sort((a,b) => {
    if (a.name < b.name) {
      return -1;
    } else if (a.name > b.name) {
      return 1;
    } else {
      return 0;
    }
  });
}

function updateFilterColor(color: ColorFilter): void {
  if (colorFilter.value === color) {
    colorFilter.value = null;
  } else {
    colorFilter.value = color;
  }
}

function updateFilterRank(rank: RankFilter): void {
  if (rankSelection.value == rank) {
    rankSelection.value = null;
  } else {
    rankSelection.value = rank;
  }
}

function pickMonster(monster: MonsterData) {
  emit("pick-monster", { ...monster, rank: rankSelection.value, variant: "standard" });
}

function randomMonster() {
  let list: MonsterData[];
  if (colorFilter.value === 'commander') {
    list = filteredCommanders.value;
  } else if (colorFilter.value === 'scenario-monster') {
    list = filteredScenarioMonsters.value;
  } else if (!rankSelection.value) {
    isRankNoticeOpen.value = true;
    return;
  } else {
    list = allMonsters.value;
  }
  let randomMonster: MonsterData | undefined = _.sample(list);
  if (randomMonster) {
    pickMonster({ ...randomMonster });
  } else {
    toast.error("No monsters of that color");
  }
}

function calcInitiative(color: string, position: string) : number {
  const initObj = _.find(InitiativeList, (x) => {
    return x.text === position.toUpperCase() + " " + color.toUpperCase();
  });
  return initObj?.index ?? 1;
}

// #region dialogs
const isRankNoticeOpen = ref(false);

const initiativeColors = [
  { name: "Orange", css: "bg-orange-500" },
  { name: "Green", css: "bg-green-600" },
  { name: "Blue", css: "bg-blue-600" },
  { name: "Red", css: "bg-red-600" },
  { name: "Gray", css: "bg-gray-500" },
] as const;
const initiativePositions = ["Top", "Bottom"] as const;

const monsterColors: { id: MonsterColor; name: string; css: string }[] = [
  { id: "white", name: "White", css: "bg-white text-black" },
  { id: "gray", name: "Gray", css: "bg-slate-500 text-white" },
  { id: "black", name: "Black", css: "bg-black text-white" },
];
type Rank = NonNullable<RankFilter>;
const ranks: { id: Rank; name: string }[] = [
  { id: "rookie", name: "Rookie" },
  { id: "fighter", name: "Fighter" },
  { id: "veteran", name: "Veteran" },
  { id: "champion", name: "Champion" },
];

const isCustomOpen = ref(false);
const customName = ref("");
const customColor = ref<string>("Gray");
const customPosition = ref<string>("Bottom");
const customMonsterColor = ref<MonsterColor>("black");
const customRank = ref<Rank>("champion");
const customMaxHp = ref<number>(0);
const canAddCustom = computed(() => customName.value.trim().length > 0 && customMaxHp.value > 0);

function defaultCustomHp(): number {
  return initiativeStore.getDefaultHp({ color: customMonsterColor.value, rank: customRank.value }) ?? 0;
}
// Repopulate Max HP with the default whenever monster color or rank changes.
watch([customMonsterColor, customRank], () => {
  customMaxHp.value = defaultCustomHp();
});

const isMaxHpKeypadOpen = ref(false);

function openMaxHpKeypad(event: FocusEvent): void {
  // Drop focus first so closing the keypad (which restores focus) doesn't immediately reopen it.
  (event.target as HTMLInputElement).blur();
  isMaxHpKeypadOpen.value = true;
}

function confirmMaxHp(value: number): void {
  customMaxHp.value = value;
  isMaxHpKeypadOpen.value = false;
}

function addCustom(): void {
  customName.value = "";
  customColor.value = "Gray";
  customPosition.value = "Bottom";
  const filterColor = colorFilter.value;
  customMonsterColor.value =
    filterColor === "white" || filterColor === "gray" || filterColor === "black" ? filterColor : "black";
  customRank.value = rankSelection.value ?? "champion";
  customMaxHp.value = defaultCustomHp();
  isCustomOpen.value = true;
}

function confirmCustom(): void {
  if (!canAddCustom.value) return;
  isCustomOpen.value = false;
  createCustomMonster(customName.value.trim(), customColor.value, customPosition.value);
}
// #endregion

function createCustomMonster(name: string, color: string, position: string): void {
  const initiative: number = calcInitiative(color, position);
  const maxHp = Math.floor(customMaxHp.value);
  const monster: ActiveMonsterData = {
    id: name,
    name: name,
    hp: maxHp,
    maxHp: maxHp,
    content: "core",
    baseColor: '',
    msTimestamp: Date.now(),
    active: true,
    conditions: [],
    rank: customRank.value,
    variants: [],
    images: {
      big: '',
      miniature: '',
      cards: {
        rookie: [],
        fighter: [],
        veteran: [],
        champion: [],
      },
    },
    color: customMonsterColor.value,
    size: "small",
    initiative: initiative,
    translation_key: ''
  };
  // Emit directly so the dialog's rank isn't overwritten by the picker's rank filter.
  emit("pick-monster", { ...monster, variant: "standard" });
}
</script>

<template>
  <BaseModal :is-open="isOpen" @close-modal="closeModal" title="Add Monster">
    <template #default>
      <div class="flex space-x-2 mb-2">
        <input placeholder="Search" v-model="textFilter" />
        <button id="custom" @click="addCustom">
          <AdjustmentsHorizontalIcon class="h-5" />
        </button>
        <button id="random">
          <CubeIcon class="h-5" @click="randomMonster"/>
        </button>
      </div>
      <div class="flex space-x-2 mb-2 items center">
        <button id="filter-black" class="bg-slate-500 p-[2px] size-14"
          :class="{
            'border-2 border-highlight': colorFilter === 'black'
          }"
          @click="updateFilterColor('black')">
          <div class="rounded-lg bg-black h-full">
            <CheckCircleIcon v-if="colorFilter === 'black'" class="text-highlight" />
          </div>
        </button>
        <button id="filter-gray" class="bg-white p-[2px] size-14"
          :class="{
            'border-2 border-highlight': colorFilter === 'gray'
          }"
          @click="updateFilterColor('gray')">
          <div class="rounded-lg bg-slate-700 h-full">
            <CheckCircleIcon v-if="colorFilter === 'gray'" class="text-highlight" />
          </div>
        </button>
        <button id="filter-white" class="bg-slate-500 p-[2px] size-14"
          :class="{
            'border-2 border-highlight': colorFilter === 'white'
          }"
          @click="updateFilterColor('white')">
          <div class="rounded-lg bg-white h-full">
            <CheckCircleIcon v-if="colorFilter === 'white'" class="text-highlight" />
          </div>
        </button>
        <button id="filter-commander" class="size-14 !p-0" @click="updateFilterColor('commander')"
          :class="{
            'border-2 border-highlight': colorFilter === 'commander'
          }">
          <div class="font-bold text-4xl text-highlight align-middle self-center">C</div>
        </button>
        <button id="filter-scenario-monster" class="size-14 !p-0" @click="updateFilterColor('scenario-monster')"
          :class="{
            'border-2 border-highlight': colorFilter === 'scenario-monster'
          }">
          <div class="font-bold text-4xl text-highlight align-middle self-center">S</div>
        </button>
        <button id="filter-rookie" class="size-14 !p-0" @click="updateFilterRank('rookie')"
          :class="{
            'border-2 border-highlight': rankSelection === 'rookie'
          }">
          <div class="font-bold text-4xl align-middle self-center">R</div>
        </button>
        <button id="filter-fighter" class="size-14 !p-0" @click="updateFilterRank('fighter')"
          :class="{
            'border-2 border-highlight': rankSelection === 'fighter'
          }">
          <div class="font-bold text-4xl align-middle self-center">F</div>
        </button>
        <button id="filter-veteran" class="size-14 !p-0" @click="updateFilterRank('veteran')"
          :class="{
            'border-2 border-highlight': rankSelection === 'veteran'
          }">
          <div class="font-bold text-4xl align-middle self-center">V</div>
        </button>
        <button id="filter-champion" class="size-14 !p-0" @click="updateFilterRank('champion')"
          :class="{
            'border-2 border-highlight': rankSelection === 'champion'
          }">
          <div class="font-bold text-4xl align-middle self-center">C</div>
        </button>
      </div>
      <BaseList id="monster-pick-list">
        <BaseDivider>Base Monsters</BaseDivider>
        <template v-for="monster in filteredMonsters" :key="monster.id">
          <BaseListItem :avatar="monster.images.big" @click="pickMonster(monster)">
            {{ monster.name }}
          </BaseListItem>
        </template>

        <BaseDivider>Scenario Monsters</BaseDivider>
        <template v-for="monster in filteredScenarioMonsters" :key="monster.id">
          <BaseListItem :avatar="monster.images.big" @click="pickMonster(monster)">
            {{ monster.name }}
          </BaseListItem>
        </template>

        <BaseDivider>Random Commanders</BaseDivider>
        <template v-for="monster in filteredRandomCommanders" :key="monster.id">
          <BaseListItem :avatar="monster.images.big" @click="pickMonster(monster)">
            {{ monster.name }}
          </BaseListItem>
        </template>

        <BaseDivider>Scenario Commanders</BaseDivider>
        <template v-for="monster in filteredScenarioCommanders" :key="monster.id">
          <BaseListItem :avatar="monster.images.big" @click="pickMonster(monster)">
            {{ monster.name }}
          </BaseListItem>
        </template>

        <BaseDivider>Special Commanders</BaseDivider>
        <template v-for="monster in filteredSpecialCommanders" :key="monster.id">
          <BaseListItem :avatar="monster.images.big" @click="pickMonster(monster)">
            {{ monster.name }}
          </BaseListItem>
        </template>
      </BaseList>

      <!-- Nested inside the picker so clicks here aren't treated as outside clicks that close it -->
      <BaseModal :is-open="isRankNoticeOpen" title="Select a Rank" @close-modal="isRankNoticeOpen = false">
        <div class="flex flex-col gap-4 py-2">
          <div class="text-center">Please select a rank first (R | F | V | C) to add a random monster.</div>
          <button class="rounded-xl font-bold py-3 bg-primary text-black" @click="isRankNoticeOpen = false">OK</button>
        </div>
      </BaseModal>

      <BaseModal :is-open="isCustomOpen" title="Custom Monster" @close-modal="isCustomOpen = false">
        <form class="flex flex-col gap-4 py-2" @submit.prevent="confirmCustom">
          <label class="flex flex-col gap-1">
            <span class="text-sm text-gray-400">Name</span>
            <input v-model="customName" class="w-full" autofocus />
          </label>
          <div class="flex flex-col gap-1">
            <span class="text-sm text-gray-400">Monster color</span>
            <div class="grid grid-cols-3 gap-2">
              <button
                v-for="c in monsterColors"
                :key="c.id"
                type="button"
                class="h-12 rounded-lg text-xs font-bold"
                :class="[c.css, customMonsterColor === c.id ? 'ring-4 ring-highlight' : 'opacity-60']"
                @click="customMonsterColor = c.id"
              >
                {{ c.name }}
              </button>
            </div>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-sm text-gray-400">Rank</span>
            <div class="grid grid-cols-4 gap-2">
              <button
                v-for="r in ranks"
                :key="r.id"
                type="button"
                class="h-12 rounded-lg text-xs font-bold bg-slate-700"
                :class="customRank === r.id ? 'ring-4 ring-highlight' : 'opacity-60'"
                @click="customRank = r.id"
              >
                {{ r.name }}
              </button>
            </div>
          </div>
          <label class="flex flex-col gap-1">
            <span class="text-sm text-gray-400">Max HP</span>
            <input
              :value="customMaxHp"
              readonly
              inputmode="none"
              class="w-full cursor-pointer"
              @focus="openMaxHpKeypad"
            />
          </label>
          <div class="flex flex-col gap-1">
            <span class="text-sm text-gray-400">Initiative color</span>
            <div class="grid grid-cols-5 gap-2">
              <button
                v-for="c in initiativeColors"
                :key="c.name"
                type="button"
                class="h-12 rounded-lg text-xs font-bold text-white"
                :class="[c.css, customColor === c.name ? 'ring-4 ring-highlight' : 'opacity-60']"
                @click="customColor = c.name"
              >
                {{ c.name }}
              </button>
            </div>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-sm text-gray-400">Position</span>
            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="p in initiativePositions"
                :key="p"
                type="button"
                class="h-12 rounded-lg font-bold bg-slate-700"
                :class="customPosition === p ? 'ring-4 ring-highlight' : 'opacity-60'"
                @click="customPosition = p"
              >
                {{ p }}
              </button>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <button type="button" class="rounded-xl font-bold py-3 bg-slate-600" @click="isCustomOpen = false">
              Cancel
            </button>
            <button
              type="submit"
              class="rounded-xl font-bold py-3 bg-primary text-black disabled:opacity-30"
              :disabled="!canAddCustom"
            >
              Add
            </button>
          </div>
        </form>

        <!-- Nested inside the custom dialog so keypad clicks don't close it -->
        <KeypadModal
          :is-open="isMaxHpKeypadOpen"
          title="Max HP"
          :initial-value="customMaxHp"
          @close="isMaxHpKeypadOpen = false"
          @confirm="confirmMaxHp"
        />
      </BaseModal>
    </template>
  </BaseModal>
</template>

<style scoped></style>
