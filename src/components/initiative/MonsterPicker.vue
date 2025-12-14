<script setup lang="ts">
import { computed, ref } from "vue";
import BaseModal from "@/components/BaseModal.vue";
import BaseList from "@/components/BaseList.vue";
import BaseListItem from "@/components/BaseListItem.vue";
import { useToast } from "vue-toastification";
import * as _ from "lodash-es";
import { AdjustmentsHorizontalIcon, CubeIcon } from "@heroicons/vue/24/solid";
import { CheckCircleIcon } from "@heroicons/vue/24/outline";
import { MonsterDataStore } from "@/data/store/MonsterDataStore";
import type { ActiveMonsterData, MonsterData } from "@/data/store/MonsterData";
import { InitiativeList } from "@/data/initiative/InitiativePlaces";
import { stringifyQuery } from "vue-router";
import type { MonsterColor } from "@/data/type/MonsterColor";

const toast = useToast();

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
  if (!rankSelection.value) {
    alert('Please select a rank first (R|F|V|C)');
    return;
  }
  const list: MonsterData[] = colorFilter.value === 'commander' ? filteredRandomCommanders.value : allMonsters.value;
  let randomMonster: MonsterData | undefined = _.sample(list);
  if (randomMonster) {
    const tag = prompt("Tag", randomMonster.color.substring(0, 1).toUpperCase());
    if (tag !== null) {
      let name = randomMonster.name;
      if (tag.length > 0) {
        name += " [" + tag + "]";
      }
      pickMonster({ ...randomMonster, name: name });
    }
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

function addCustom(): void {
  const name: string | null = prompt("Name", "Special");
  if (name === null) { return; }
  const color: string | null = prompt("Color", "Gray");
  if (color === null) { return; }
  const position: string | null = prompt("Top/Bottom", "Bottom");
  if (position === null) { return; }
  const initiative: number = calcInitiative(color, position);
  const monster: ActiveMonsterData = {
    id: name,
    name: name,
    hp: 0,
    maxHp: 0,
    content: "core",
    baseColor: '',
    msTimestamp: Date.now(),
    active: true,
    conditions: [],
    rank: 'champion',
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
    color: "black",
    size: "small",
    initiative: initiative,
    translation_key: ''
  };
  pickMonster(monster);
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
        <template v-for="monster in filteredMonsters" :key="monster.id">
          <BaseListItem :avatar="monster.images.big" @click="pickMonster(monster)">
            {{ monster.name }}
          </BaseListItem>
        </template>

        <div>Scenario Monsters</div>
        <template v-for="monster in filteredScenarioMonsters" :key="monster.id">
          <BaseListItem :avatar="monster.images.big" @click="pickMonster(monster)">
            {{ monster.name }}
          </BaseListItem>
        </template>

        <div>Random Commanders</div>
        <template v-for="monster in filteredRandomCommanders" :key="monster.id">
          <BaseListItem :avatar="monster.images.big" @click="pickMonster(monster)">
            {{ monster.name }}
          </BaseListItem>
        </template>

        <div>Scenario Commanders</div>
        <template v-for="monster in filteredScenarioCommanders" :key="monster.id">
          <BaseListItem :avatar="monster.images.big" @click="pickMonster(monster)">
            {{ monster.name }}
          </BaseListItem>
        </template>

        <div>Special Commanders</div>
        <template v-for="monster in filteredSpecialCommanders" :key="monster.id">
          <BaseListItem :avatar="monster.images.big" @click="pickMonster(monster)">
            {{ monster.name }}
          </BaseListItem>
        </template>
      </BaseList>
    </template>
  </BaseModal>
</template>

<style scoped></style>
