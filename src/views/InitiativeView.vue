<script setup lang="ts">
// #region external imports
import { storeToRefs } from "pinia";
import {
  ArrowPathIcon,
  ArrowUpCircleIcon,
  BackwardIcon,
  UserCircleIcon,
  ForwardIcon,
  HeartIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/vue/24/solid";
import { ref, computed } from "vue";
// #endregion

// #region internal imports
import { HeroStore } from "@/store/HeroStore";
import { useInitiativeStore, ringColors } from "@/store/InitiativeStore";
import MonsterPicker from "@/components/initiative/MonsterPicker.vue";
import MonsterInitiative from "@/components/initiative/MonsterInitiative.vue";
import { InitiativeColors, InitiativeList, InitiativeTypes, type InitiativeInfo } from "@/data/initiative/InitiativePlaces";
import type { ActiveMonsterData } from "@/data/store/MonsterData";
import BaseDivider from "@/components/BaseDivider.vue";
import OnOffButton from "@/components/common/OnOffButton.vue";
import BaseModal from "@/components/BaseModal.vue";
import Conditions from "@/components/initiative/ConditionPicker.vue";
import type { HeroData } from "@/data/repository/HeroData";
import { BlankToken, type IToken } from "@/data/initiative/DarknessTokens";
// #endregion

// #region store bindings
const { autoSkip, autoConfirmDelete, darknessTokens, turnIndex, useDefaultHp } = storeToRefs(useInitiativeStore());
const {
  getInitiativeList,
  addHero,
  addMonster,
  clearInitiative,
  decrementHp,
  getHero,
  incrementHp,
  removeHero,
  removeMonster,
} = useInitiativeStore();
const { heroes } = storeToRefs(HeroStore());
const heroStore = HeroStore();
// #endregion

// #region hero picker
const dungeonRoleToPick = ref<string | null>(null);
const closeHeroPicker = (): void => {
  dungeonRoleToPick.value = null;
};
const heroData: HeroData[] = heroes.value.map((hero) => {
  return heroStore.getHero(hero.heroId) ?? {
    id: hero.heroId,
    name: "UNKNOWN HERO",
    content: "core",
    class: "Warrior",
    path: "Strength",
    race: "Human",
    proficiencies: {
      weapon: ["Heavy"],
      offHand: ["Off Hand Weapon"],
      armor: ["Plate"],
  },
  images: {
    avatar: 'https://cdn-icons-png.freepik.com/256/11748/11748483.png',
  },
};
});
const assignHero = (hero: HeroData): void => {
  addHero(dungeonRoleToPick.value as string, hero);
  closeHeroPicker();
};
// #endregion

// #region monster picker
const monsterPickerRef = ref(null);

const openMonsterPicker = (): void => {
  if (monsterPickerRef.value === null) {
    throw new Error("monsterPickerRef is null");
  }
  (monsterPickerRef.value as any).openModal();
};
const pickMonster = (monster: any): void => {
  const activeMonster = addMonster(monster);
  openDetails(activeMonster);
};
// #endregion

// #region initiative list
const initiativeList = computed(() => {
  return getInitiativeList();
});

const monsterByInitiative = (initiative: number) => {
  return initiativeList.value.filter((monster: ActiveMonsterData) => {
    return monster.initiative === initiative;
  });
};

const iList = computed(() => {
  let a = [];
  const n = InitiativeList.length;
  for (let i = 0; i < n; ++i) {
    const index = (i + turnIndex.value) % n;
    a.push(InitiativeList[index]);
  }
  return a;
});
const adjustTurn = (diff: number) => {
  turnIndex.value = (turnIndex.value + diff);
};
const roundNumber = computed(() => {
  return 1 + Math.floor(turnIndex.value/InitiativeList.length);
})
const decrementTurn = () => {
  adjustTurn(-1);
};
const incrementTUrn = () => {
  const max = 20;
  let i = 0;
  let skipTurn: boolean = autoSkip.value;
  do {
    adjustTurn(1);
    switch (iList.value[0].type) {
      case InitiativeTypes.RUNE:
        skipTurn = false;
      case InitiativeTypes.MONSTER:
        skipTurn &&= monsterByInitiative(iList.value[0].index)?.length <= 0;
        break;
      case InitiativeTypes.HERO:
        skipTurn &&= getHero(iList.value[0]?.text) == null;
        break;
    }
  } while (skipTurn && ++i < max);
};
const getTokenCount = (initInfo: InitiativeInfo) => {
  return darknessTokens.value.filter(i => i.color == initInfo.color && i.isDrawn).length;
}
// #endregion

// #region darkness tiles bag popup
const isDarknessTokenBagOpen = ref(false);
function getTokenColor(token: IToken): string {
  if (!token.isDrawn) {
    return "black";
  }
  switch (token.color) {
    case InitiativeColors.BLUE:
      return "blue";
    case InitiativeColors.ORANGE:
      return "orange";
    case InitiativeColors.GRAY:
      return "gray";
    case InitiativeColors.GREEN:
      return "green";
    case InitiativeColors.RED:
      return "red";
    default:
      return "pink";
  }
}
// #endregion

// #region details popup
const detailsOpen = ref(false);
const detailsMonster = ref<ActiveMonsterData | null>(null);
const detailsMonsterCardUrl = computed((): string => {
  const cards = detailsMonster?.value?.images?.cards;
  const defaultImg = detailsMonster?.value?.images?.big ?? "";
  if (!cards) {
    console.warn("No cards found for monster", detailsMonster);
    return defaultImg;
  }
  const index = (detailsMonster?.value as any)?.cardIndex || 0;
  const rank = detailsMonster?.value?.rank || "rookie";
  return cards[rank][index] || defaultImg;
});
function openDetails(monster: ActiveMonsterData) {
  detailsMonster.value = monster;
  detailsOpen.value = true;
}
function closeDetails() {
  detailsOpen.value = false;
}
let colorPickerVisible = ref(false);
function toggleColorPicker() {
  colorPickerVisible.value = !colorPickerVisible.value;
}
function changeColor(color: string) {
  if (detailsMonster.value) {
    detailsMonster.value.baseColor = color;
  }
}
function drawToken(token: IToken) {
  token.isDrawn = !token.isDrawn;
}
function updateMonsterHp(monster: any) {
  const _maxHp = prompt('Max HP', monster.maxHp.toString());
  if (_maxHp) {
    const maxHp = parseInt(_maxHp);
    if (!isNaN(maxHp)) {
      monster.maxHp = maxHp;
    }
  }
  const _hp = prompt('HP', monster.hp.toString());
  if (_hp) {
    const hp = parseInt(_hp);
    if (!isNaN(hp)) {
      monster.hp = hp;
    }
  }
}

// #endregion
</script>

<template>
  <div class="grid place-items-center w-full">
    <BaseDivider>Initiative</BaseDivider>
    <!-- #region Action Buttons -->
    <div class="w-full flex">
      <BackwardIcon class="w-8 rounded-lg mx-1" @click="decrementTurn" />
      <div class="flex justify-center rounded-full text-lg font-black border-2 w-8">{{ roundNumber }}</div>
      <ForwardIcon class="w-8 rounded-lg mx-1" @click="incrementTUrn" />
      <PlusIcon class="w-8 bg-slate-800 rounded-lg mx-1" @click="openMonsterPicker" />
      <ArrowPathIcon class="w-8 text-red-400 rounded-lg mx-1" @click="clearInitiative" />
      <OnOffButton :flag="autoSkip" @click="autoSkip = !autoSkip" class="py-1 px-4 mx-1">
        Auto-Skip
      </OnOffButton>
      <OnOffButton :flag="autoConfirmDelete" @click="autoConfirmDelete = !autoConfirmDelete" class="py-1 px-4 mx-1">
        Auto Confirm
      </OnOffButton>
      <OnOffButton :flag="useDefaultHp" @click="useDefaultHp = !useDefaultHp" class="py-1 px-4 mx-1">
        Default HP
      </OnOffButton>
    </div>
    <!-- #endregion Action Buttons -->
    <!-- #region Initiative List -->
    <div container class="divide-y">
      <div v-for="initInfo in iList" :key="initInfo.index">
        <!-- Monster Initiatives -->
        <MonsterInitiative
          v-if="initInfo.type === InitiativeTypes.MONSTER"
          :turnImgUrl="initInfo.imgUrl"
          :monsters="monsterByInitiative(initInfo.index)"
          :tokenCount="getTokenCount(initInfo)"
          @openDetails="openDetails"
        />
        <!-- Hero Initiatives -->
        <div v-else-if="initInfo.type === InitiativeTypes.HERO" class="grid grid-cols-12 divide-y" id="initiative-container">
          <div v-if="getHero(initInfo.text) == null" class="col-span-11 col-start-2 text-4xl font-extrabold mb-4 flex">
            {{ initInfo.text }}
            <PlusIcon class="w-8 bg-slate-800 rounded-lg ml-4" @click="() => (dungeonRoleToPick = initInfo.text)" />
          </div>
          <div v-else class="col-span-11 col-start-2 text-4xl font-extrabold mb-4 flex">
            <img :src="getHero(initInfo.text)?.images?.avatar || ''" class="rounded-full w-16 h-16" />
            <div class="flex flex-row ml-4">
              {{ getHero(initInfo.text)?.name }}
              <MinusIcon class="w-8 h-8 bg-slate-800 rounded-lg ml-4 mt-2" @click="() => removeHero(initInfo.text)" />
            </div>
          </div>
        </div>
        <!-- Rune Initiative -->
        <div v-else-if="initInfo.type === InitiativeTypes.RUNE" class="grid grid-cols-12 divide-y" id="initiative-container">
          <div class="col-span-11 col-start-2 text-4xl font-extrabold mb-4 flex">
            RUNE: Draw {{ roundNumber % 2 === 1 ? 1 : 2 }} Tiles
            <ArrowUpCircleIcon class="w-8 bg-slate-800 rounded-lg ml-4" @click="() => isDarknessTokenBagOpen = true" />
          </div>
        </div>
      </div>
    </div>
    <!-- #endregion Initiative List -->
  </div>
  <!-- Pop-Ups -->
  <MonsterPicker @pick-monster="pickMonster" ref="monsterPickerRef" />
  <BaseModal :is-open="isDarknessTokenBagOpen" @close-modal="() => isDarknessTokenBagOpen = false">
    <template #header>
      <div class="grid grid-cols-2">
        <div class="flex">
          <div class="w-full font-medium place-self-center">Darkness&nbsp;Tokens</div>
        </div>
        <div>
          <button
            id="close-modal"
            class="px-2 py-2 bg-neutral text-gray-200 uppercase font-semibold text-sm rounded-lg float-right"
            @click="() => isDarknessTokenBagOpen = false"
          >
            <XMarkIcon class="h-5 bg-neutral text-gray-200 uppercase font-semibold text-sm rounded-lg" />
          </button>
        </div>
      </div>
    </template>
    <template #default>
      <div class="container">
        <div class="grid grid-cols-3 gap-4">
          <div v-for="token in darknessTokens" :key="token.color + '|' + token.image" class="border-4 p-8 rounded-full flex flex-col items-center"
          :style="{backgroundColor: getTokenColor(token)}" >
            <img :src="token.isDrawn?token.image:BlankToken" @click="() => drawToken(token)" />
          </div>
        </div>
      </div>
    </template>
  </BaseModal>
  <BaseModal :is-open="dungeonRoleToPick != null" @close-modal="closeHeroPicker">
    <template #header>
      <div class="font-medium">Pick a Hero</div>
    </template>
    <template #default>
      <div class="container">
        <div class="grid grid-cols-3 gap-4">
          <div v-for="hero in heroData" :key="hero.name" class="flex flex-col items-center">
            <img :src="hero.images.avatar" class="rounded-full" @click="() => assignHero(hero)" />
            <div>{{ hero.name }}</div>
            <button @click="addHero(hero.name, hero)">Add</button>
          </div>
        </div>
      </div>
    </template>
  </BaseModal>
  <BaseModal :is-open="detailsOpen" @close-modal="closeDetails">
    <template #header>
      <div class="grid grid-cols-2">
        <div class="font-medium">
          {{ detailsMonster?.name }} ({{ detailsMonster?.baseColor }}) -
          <span class="text-slate-600">[{{ detailsMonster?.content }}]</span>
        </div>
        <div>
          <button
            id="close-modal"
            class="px-2 py-2 bg-neutral text-gray-200 uppercase font-semibold text-sm rounded-lg float-right"
            @click="closeDetails"
          >
            <XMarkIcon class="h-5 bg-neutral text-gray-200 uppercase font-semibold text-sm rounded-lg" />
          </button>
        </div>
      </div>
    </template>
    <template #default>
      <div class="container">
        <div class="grid grid-flow-col auto-cols-max">
          <MinusIcon @click="detailsMonster = decrementHp(detailsMonster)" class="w-12" />
          <div class="grid w-12" @click="() => updateMonsterHp(detailsMonster)">
            <div class="col-start-1 row-start-1 justify-center">
              <HeartIcon class="fill-red-500 w-12 self-center" />
            </div>
            <div class="col-start-1 row-start-1 self-center text-center font-semibold text-red self-center">
              {{ detailsMonster?.hp }}
            </div>
          </div>
          <PlusIcon @click="detailsMonster = incrementHp(detailsMonster)" class="w-12" />
          <TrashIcon
            class="fill-gray-600 w-12"
            @click="
              () => {
                removeMonster(detailsMonster);
                closeDetails();
              }
            "
          />
          <!-- div with ring color, onclick shows next div -->
          <div
            class="rounded-full w-12 h-12 border-8"
            @click="toggleColorPicker"
            :style="'border-color: ' + detailsMonster?.baseColor + ';'"
          ></div>
          <div class="grid grid-cols-3 gap-1" v-if="colorPickerVisible">
            <div
              v-for="color in ringColors"
              :key="color"
              class="rounded-full w-12 h-12 border-8"
              :style="'border-color: ' + color + ';'"
              @click="changeColor(color)"
            ></div>
          </div>
          <!-- div showing all colors, each within a div where onclick sets monster.baseColor -->
        </div>
        <div class="grid grid-flow-col auto-cols-max">
          <Conditions :monster="detailsMonster" />
        </div>
        <div class="border-8" :style="'border-color:' + detailsMonster?.baseColor + ';'" @click="closeDetails">
          <img
            v-if="(detailsMonsterCardUrl?.length ?? 0) > 0"
            :src="detailsMonsterCardUrl"
            class="rounded-sm shadow dark:bg-gray-800 w-full" />
          <UserCircleIcon v-else class="h-100 text-gray-200 rounded-lg" />
        </div>
        <img :src="detailsMonster?.images?.miniature" class="rounded-sm shadow dark:bg-gray-800 w-full" />
      </div>
    </template>
  </BaseModal>
</template>
