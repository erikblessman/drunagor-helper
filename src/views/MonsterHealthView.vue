<script setup lang="ts">
import {
  HeartIcon,
  TrashIcon,
  ArrowPathIcon,
} from "@heroicons/vue/24/solid";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { XMarkIcon } from "@heroicons/vue/24/solid";
import {
  PlusIcon,
} from "@heroicons/vue/24/outline";

import MonsterPicker from "@/components/MonsterPicker.vue";
import BaseModal from "@/components/BaseModal.vue";
import Conditions from "@/components/ConditionPicker.vue";
import MonsterImage from "@/components/MonsterImage.vue";
import { MonsterStore } from "@/store/MonsterStore";
import type { ActiveMonsterData } from "@/data/store/MonsterData";
import InitiativePlaces from "@/data/InitiativePlaces";
import TopOrangeImgUrl from "@/assets/initiative/top-orange.png";
import TopGreenImgUrl from "@/assets/initiative/top-green.png";
import TopBlueImgUrl from "@/assets/initiative/top-blue.png";
import TopRedImgUrl from "@/assets/initiative/top-red.png";
import TopGrayImgUrl from "@/assets/initiative/top-gray.png";
import BottomOrangeImgUrl from "@/assets/initiative/bottom-orange.png";
import BottomGreenImgUrl from "@/assets/initiative/bottom-green.png";
import BottomBlueImgUrl from "@/assets/initiative/bottom-blue.png";
import BottomRedImgUrl from "@/assets/initiative/bottom-red.png";
import BottomGrayImgUrl from "@/assets/initiative/bottom-gray.png";

const { activeMonsterData,
  autoConfirmDelete,
  useDefaultHp,
} = storeToRefs(MonsterStore());
const monsterByInitiative = (initiative:number) => {
  return activeMonsterData.value.filter((monster) => {
    return monster.initiative === initiative;
  });
};
const topBlueMonsters = computed(() => {
  return monsterByInitiative(InitiativePlaces.TOP_BLUE);
});
const orderedMonsters = computed(() => {
  return activeMonsterData.value.sort((a, b) => {
    const aa = a.initiative ?? InitiativePlaces.RUNE;
    const bb = b.initiative ?? InitiativePlaces.RUNE;
    if (aa < bb) {
      return -1;
    } else if (aa > bb) {
      return 1;
    }
    return 0;
  });
});
const {
  addMonster,
  removeMonster,
  clearActiveMonsters,
  addCondition,
  removeCondition,
  incrementHp,
  decrementHp,
} = MonsterStore();
const monsterPickerRef = ref(null);

function onHpSwipeRight(monster: ActiveMonsterData) {
  return function () {
    incrementHp(monster);
  };
}

function onHpSwipeLeft(monster: ActiveMonsterData) {
  return function () {
    decrementHp(monster);
  };
}

function openMonsterPicker() {
  if (monsterPickerRef.value === null) {
    throw new Error("monsterPickerRef is null");
  }
  monsterPickerRef.value.openModal();
}

// Details Modal
const detailsOpen = ref(false);
const detailsMonster = ref(null);
const detailsMonsterCardIndex = ref(0);
const detailsMonsterCardUrl = computed(() => {
  let cards = detailsMonster?.value?.images?.cards;
  if (!cards || cards.length === 0) {
    return null;
  }
  return cards[detailsMonsterCardIndex.value];
});
const detailsMonsterMinatureUrl = computed(() => {
  return detailsMonster?.value?.images?.miniature;
});
function openDetails(monster: ActiveMonsterData) {
  detailsMonster.value = monster;
  detailsOpen.value = true;
}
function closeDetails() {
  detailsOpen.value = false;
}
function adjustMonsterCardIndex(modifier: number) {
  // TODO: Track the index in the ActiveMonsterData to avoid
  //       the index being used for ALL active monsters
  let index = detailsMonsterCardIndex.value + modifier;
  if (index < 0) {
    index = detailsMonster.value.images.cards.length - 1;
  } else if (index >= detailsMonster.value.images.cards.length) {
    index = 0;
  }
  detailsMonsterCardIndex.value = index;
}
function swipeCardRight() {
  adjustMonsterCardIndex(1);
}
function swipeCardLeft() {
  adjustMonsterCardIndex(-1);
}
</script>

<template>
  <div class="flex pb-4 w-full">
    <div class="px-2 flex" @click="openMonsterPicker">
      <PlusIcon class="w-6 bg-neutral text-green-400 rounded-lg" />
    </div>
    <div class="px-2 flex" @click="clearActiveMonsters">
      <ArrowPathIcon class="w-6 bg-neutral text-red-400 rounded-lg" />
    </div>
    <div class="px-2">
      <Button class="bg-neutral rounded-lg px-2 py-1"
      :class="autoConfirmDelete ? 'text-green-400' : 'text-red-400'"
      @click="autoConfirmDelete=!autoConfirmDelete">
        Auto Confirm: {{ autoConfirmDelete ? "ON" : "OFF" }}
    </Button>
    </div>
    <div class="px-2">
      <Button class="bg-neutral rounded-lg px-2 py-1"
        :class="useDefaultHp ? 'text-green-400' : 'text-red-400'"
        @click="useDefaultHp=!useDefaultHp">
          Use Default HP: {{ useDefaultHp ? "ON" : "OFF" }}
      </Button>
    </div>
  </div>
  <MonsterPicker @pick-monster="addMonster" ref="monsterPickerRef" />
  <div container>
    <!-------------------- DEFENDER --------------------------->
    <div class="grid grid-cols-12 divide-y" id="initiative-container">
      <div class="col-span-11 col-start-2 text-4xl font-extrabold mb-4">
        DEFENDER
      </div>
    </div>
    <!-------------------- TOP ORANGE --------------------------->
    <div class="grid grid-cols-12 divide-y" id="initiative-container">
      <div><img :src="TopOrangeImgUrl" /></div>
      <div class="col-span-11">
        <template v-for="(monster, index) in monsterByInitiative(InitiativePlaces.TOP_ORANGE)" :key="index">
          <BaseListItem>
            <div class="grid grid-flow-col auto-cols-max" v-touch:swipe.right="onHpSwipeRight(monster)"
              v-touch:swipe.left="onHpSwipeLeft(monster)">
              <MonsterImage :monster="monster" @click="openDetails(monster)" imgClass="rounded-full"
                :style="'border-color:' + monster.baseColor + ';'"
                class="bg-white border-8 rounded-full shadow dark:bg-gray-800"
                :class="monster.size == 'large' ? 'w-32' : 'w-24'"/>
              <div>
                <div class="font-semibold text-lg">
                  {{ monster.name }} ({{ monster.color }})
                </div>
                <div class="grid grid-flow-col auto-cols-max">
                  <div class="grid w-12">
                    <div class="col-start-1 row-start-1 justify-center">
                      <HeartIcon class="fill-red-500 w-12 self-center" />
                    </div>
                    <div class="col-start-1 row-start-1 self-center text-center font-semibold text-red self-center">
                      {{ monster.hp }}
                    </div>
                  </div>
                  <Conditions :conditions="monster.conditions" :monster="monster"
                    @add-condition="addCondition(monster, $event)"
                    @remove-condition="removeCondition(monster, $event)" />
                  <TrashIcon class="fill-gray-600 w-12" @click="removeMonster(monster)" />
                </div>
              </div>
            </div>
          </BaseListItem>
        </template>
      </div>
    </div>
    <!-------------------- TOP GREEN --------------------------->
    <div class="grid grid-cols-12 divide-y" id="initiative-container">
      <div><img :src="TopGreenImgUrl" /></div>
      <div class="col-span-11">
        <template v-for="(monster) in monsterByInitiative(InitiativePlaces.TOP_GREEN)" :key="monster.msTimestamp">
          <BaseListItem>
            <div class="grid grid-flow-col auto-cols-max" v-touch:swipe.right="onHpSwipeRight(monster)"
              v-touch:swipe.left="onHpSwipeLeft(monster)">
              <MonsterImage :monster="monster" @click="openDetails(monster)" imgClass="rounded-full"
                :style="'border-color:' + monster.baseColor + ';'"
                class="bg-white border-8 rounded-full shadow dark:bg-gray-800"
                :class="monster.size == 'large' ? 'w-32' : 'w-24'"/>
              <div>
                <div class="font-semibold text-lg">
                  {{ monster.name }} ({{ monster.color }})
                </div>
                <div class="grid grid-flow-col auto-cols-max">
                  <div class="grid w-12">
                    <div class="col-start-1 row-start-1 justify-center">
                      <HeartIcon class="fill-red-500 w-12 self-center" />
                    </div>
                    <div class="col-start-1 row-start-1 self-center text-center font-semibold text-red self-center">
                      {{ monster.hp }}
                    </div>
                  </div>
                  <Conditions :conditions="monster.conditions" :monster="monster"
                    @add-condition="addCondition(monster, $event)"
                    @remove-condition="removeCondition(monster, $event)" />
                  <TrashIcon class="fill-gray-600 w-12" @click="removeMonster(monster)" />
                </div>
              </div>
            </div>
          </BaseListItem>
        </template>
      </div>
    </div>
    <!-------------------- LEADER --------------------------->
    <div class="grid grid-cols-12 divide-y" id="initiative-container">
      <div class="col-span-11 col-start-2 text-4xl font-extrabold mb-4">
        LEADER
      </div>
    </div>
    <!-------------------- TOP BLUE --------------------------->
    <div class="grid grid-cols-12 divide-y" id="initiative-container">
      <div><img :src="TopBlueImgUrl" /></div>
      <div class="col-span-11">
        <template v-for="(monster) in monsterByInitiative(InitiativePlaces.TOP_BLUE)" :key="monster.msTimestamp">
          <BaseListItem>
            <div class="grid grid-flow-col auto-cols-max" v-touch:swipe.right="onHpSwipeRight(monster)"
              v-touch:swipe.left="onHpSwipeLeft(monster)">
              <MonsterImage :monster="monster" @click="openDetails(monster)" imgClass="rounded-full"
                :style="'border-color:' + monster.baseColor + ';'"
                class="bg-white border-8 rounded-full shadow dark:bg-gray-800"
                :class="monster.size == 'large' ? 'w-32' : 'w-24'"/>
              <div>
                <div class="font-semibold text-lg">
                  {{ monster.name }} ({{ monster.color }})
                </div>
                <div class="grid grid-flow-col auto-cols-max">
                  <div class="grid w-12">
                    <div class="col-start-1 row-start-1 justify-center">
                      <HeartIcon class="fill-red-500 w-12 self-center" />
                    </div>
                    <div class="col-start-1 row-start-1 self-center text-center font-semibold text-red self-center">
                      {{ monster.hp }}
                    </div>
                  </div>
                  <Conditions :conditions="monster.conditions" :monster="monster"
                    @add-condition="addCondition(monster, $event)"
                    @remove-condition="removeCondition(monster, $event)" />
                  <TrashIcon class="fill-gray-600 w-12" @click="removeMonster(monster)" />
                </div>
              </div>
            </div>
          </BaseListItem>
        </template>
      </div>
    </div>
    <!-------------------- TOP RED --------------------------->
    <div class="grid grid-cols-12 divide-y" id="initiative-container">
      <div><img :src="TopRedImgUrl" /></div>
      <div class="col-span-11">
        <template v-for="(monster) in monsterByInitiative(InitiativePlaces.TOP_RED)" :key="monster.msTimestamp">
          <BaseListItem>
            <div class="grid grid-flow-col auto-cols-max" v-touch:swipe.right="onHpSwipeRight(monster)"
              v-touch:swipe.left="onHpSwipeLeft(monster)">
              <MonsterImage :monster="monster" @click="openDetails(monster)" imgClass="rounded-full"
                :style="'border-color:' + monster.baseColor + ';'"
                class="bg-white border-8 rounded-full shadow dark:bg-gray-800"
                :class="monster.size == 'large' ? 'w-32' : 'w-24'"/>
              <div>
                <div class="font-semibold text-lg">
                  {{ monster.name }} ({{ monster.color }})
                </div>
                <div class="grid grid-flow-col auto-cols-max">
                  <div class="grid w-12">
                    <div class="col-start-1 row-start-1 justify-center">
                      <HeartIcon class="fill-red-500 w-12 self-center" />
                    </div>
                    <div class="col-start-1 row-start-1 self-center text-center font-semibold text-red self-center">
                      {{ monster.hp }}
                    </div>
                  </div>
                  <Conditions :conditions="monster.conditions" :monster="monster"
                    @add-condition="addCondition(monster, $event)"
                    @remove-condition="removeCondition(monster, $event)" />
                  <TrashIcon class="fill-gray-600 w-12" @click="removeMonster(monster)" />
                </div>
              </div>
            </div>
          </BaseListItem>
        </template>
      </div>
    </div>
    <!-------------------- CONTROLLER --------------------------->
    <div class="grid grid-cols-12 divide-y" id="initiative-container">
      <div class="col-span-11 col-start-2 text-4xl font-extrabold mb-4">
        CONTROLLER
      </div>
    </div>
    <!-------------------- TOP GRAY --------------------------->
    <div class="grid grid-cols-12 divide-y" id="initiative-container">
      <div><img :src="TopGrayImgUrl" /></div>
      <div class="col-span-11">
        <template v-for="(monster) in monsterByInitiative(InitiativePlaces.TOP_GRAY)" :key="monster.msTimestamp">
          <BaseListItem>
            <div class="grid grid-flow-col auto-cols-max" v-touch:swipe.right="onHpSwipeRight(monster)"
              v-touch:swipe.left="onHpSwipeLeft(monster)">
              <MonsterImage :monster="monster" @click="openDetails(monster)" imgClass="rounded-full"
                :style="'border-color:' + monster.baseColor + ';'"
                class="bg-white border-8 rounded-full shadow dark:bg-gray-800"
                :class="monster.size == 'large' ? 'w-32' : 'w-24'"/>
              <div>
                <div class="font-semibold text-lg">
                  {{ monster.name }} ({{ monster.color }})
                </div>
                <div class="grid grid-flow-col auto-cols-max">
                  <div class="grid w-12">
                    <div class="col-start-1 row-start-1 justify-center">
                      <HeartIcon class="fill-red-500 w-12 self-center" />
                    </div>
                    <div class="col-start-1 row-start-1 self-center text-center font-semibold text-red self-center">
                      {{ monster.hp }}
                    </div>
                  </div>
                  <Conditions :conditions="monster.conditions" :monster="monster"
                    @add-condition="addCondition(monster, $event)"
                    @remove-condition="removeCondition(monster, $event)" />
                  <TrashIcon class="fill-gray-600 w-12" @click="removeMonster(monster)" />
                </div>
              </div>
            </div>
          </BaseListItem>
        </template>
      </div>
    </div>
    <!-------------------- BOTTOM ORANGE --------------------------->
    <div class="grid grid-cols-12 divide-y" id="initiative-container">
      <div><img :src="BottomOrangeImgUrl" /></div>
      <div class="col-span-11">
        <template v-for="(monster) in monsterByInitiative(InitiativePlaces.BOTTOM_ORANGE)" :key="monster.msTimestamp">
          <BaseListItem>
            <div class="grid grid-flow-col auto-cols-max" v-touch:swipe.right="onHpSwipeRight(monster)"
              v-touch:swipe.left="onHpSwipeLeft(monster)">
              <MonsterImage :monster="monster" @click="openDetails(monster)" imgClass="rounded-full"
                :style="'border-color:' + monster.baseColor + ';'"
                class="bg-white border-8 rounded-full shadow dark:bg-gray-800"
                :class="monster.size == 'large' ? 'w-32' : 'w-24'"/>
              <div>
                <div class="font-semibold text-lg">
                  {{ monster.name }} ({{ monster.color }})
                </div>
                <div class="grid grid-flow-col auto-cols-max">
                  <div class="grid w-12">
                    <div class="col-start-1 row-start-1 justify-center">
                      <HeartIcon class="fill-red-500 w-12 self-center" />
                    </div>
                    <div class="col-start-1 row-start-1 self-center text-center font-semibold text-red self-center">
                      {{ monster.hp }}
                    </div>
                  </div>
                  <Conditions :conditions="monster.conditions" :monster="monster"
                    @add-condition="addCondition(monster, $event)"
                    @remove-condition="removeCondition(monster, $event)" />
                  <TrashIcon class="fill-gray-600 w-12" @click="removeMonster(monster)" />
                </div>
              </div>
            </div>
          </BaseListItem>
        </template>
      </div>
    </div>
    <!-------------------- SUPPORT --------------------------->
    <div class="grid grid-cols-12 divide-y" id="initiative-container">
      <div class="col-span-11 col-start-2 text-4xl font-extrabold mb-4">
        SUPPORT
      </div>
    </div>
    <!-------------------- BOTTOM GREEN --------------------------->
    <div class="grid grid-cols-12 divide-y" id="initiative-container">
      <div><img :src="BottomGreenImgUrl" /></div>
      <div class="col-span-11">
        <template v-for="(monster) in monsterByInitiative(InitiativePlaces.BOTTOM_GREEN)" :key="monster.msTimestamp">
          <BaseListItem>
            <div class="grid grid-flow-col auto-cols-max" v-touch:swipe.right="onHpSwipeRight(monster)"
              v-touch:swipe.left="onHpSwipeLeft(monster)">
              <MonsterImage :monster="monster" @click="openDetails(monster)" imgClass="rounded-full"
                :style="'border-color:' + monster.baseColor + ';'"
                class="bg-white border-8 rounded-full shadow dark:bg-gray-800"
                :class="monster.size == 'large' ? 'w-32' : 'w-24'"/>
              <div>
                <div class="font-semibold text-lg">
                  {{ monster.name }} ({{ monster.color }})
                </div>
                <div class="grid grid-flow-col auto-cols-max">
                  <div class="grid w-12">
                    <div class="col-start-1 row-start-1 justify-center">
                      <HeartIcon class="fill-red-500 w-12 self-center" />
                    </div>
                    <div class="col-start-1 row-start-1 self-center text-center font-semibold text-red self-center">
                      {{ monster.hp }}
                    </div>
                  </div>
                  <Conditions :conditions="monster.conditions" :monster="monster"
                    @add-condition="addCondition(monster, $event)"
                    @remove-condition="removeCondition(monster, $event)" />
                  <TrashIcon class="fill-gray-600 w-12" @click="removeMonster(monster)" />
                </div>
              </div>
            </div>
          </BaseListItem>
        </template>
      </div>
    </div>
    <!-------------------- BOTTOM BLUE --------------------------->
    <div class="grid grid-cols-12 divide-y" id="initiative-container">
      <div><img :src="BottomBlueImgUrl" /></div>
      <div class="col-span-11">
        <template v-for="(monster) in monsterByInitiative(InitiativePlaces.BOTTOM_BLUE)" :key="monster.msTimestamp">
          <BaseListItem>
            <div class="grid grid-flow-col auto-cols-max" v-touch:swipe.right="onHpSwipeRight(monster)"
              v-touch:swipe.left="onHpSwipeLeft(monster)">
              <MonsterImage :monster="monster" @click="openDetails(monster)" imgClass="rounded-full"
                :style="'border-color:' + monster.baseColor + ';'"
                class="bg-white border-8 rounded-full shadow dark:bg-gray-800"
                :class="monster.size == 'large' ? 'w-32' : 'w-24'"/>
              <div>
                <div class="font-semibold text-lg">
                  {{ monster.name }} ({{ monster.color }})
                </div>
                <div class="grid grid-flow-col auto-cols-max">
                  <div class="grid w-12">
                    <div class="col-start-1 row-start-1 justify-center">
                      <HeartIcon class="fill-red-500 w-12 self-center" />
                    </div>
                    <div class="col-start-1 row-start-1 self-center text-center font-semibold text-red self-center">
                      {{ monster.hp }}
                    </div>
                  </div>
                  <Conditions :conditions="monster.conditions" :monster="monster"
                    @add-condition="addCondition(monster, $event)"
                    @remove-condition="removeCondition(monster, $event)" />
                  <TrashIcon class="fill-gray-600 w-12" @click="removeMonster(monster)" />
                </div>
              </div>
            </div>
          </BaseListItem>
        </template>
      </div>
    </div>
    <!-------------------- STRIKER --------------------------->
    <div class="grid grid-cols-12 divide-y" id="initiative-container">
      <div class="col-span-11 col-start-2 text-4xl font-extrabold mb-4">
        STRIKER
      </div>
    </div>
    <!-------------------- BOTTOM RED --------------------------->
    <div class="grid grid-cols-12 divide-y" id="initiative-container">
      <div><img :src="BottomRedImgUrl" /></div>
      <div class="col-span-11">
        <template v-for="(monster) in monsterByInitiative(InitiativePlaces.BOTTOM_RED)" :key="monster.msTimestamp">
          <BaseListItem>
            <div class="grid grid-flow-col auto-cols-max" v-touch:swipe.right="onHpSwipeRight(monster)"
              v-touch:swipe.left="onHpSwipeLeft(monster)">
              <MonsterImage :monster="monster" @click="openDetails(monster)" imgClass="rounded-full"
                :style="'border-color:' + monster.baseColor + ';'"
                class="bg-white border-8 rounded-full shadow dark:bg-gray-800"
                :class="monster.size == 'large' ? 'w-32' : 'w-24'"/>
              <div>
                <div class="font-semibold text-lg">
                  {{ monster.name }} ({{ monster.color }})
                </div>
                <div class="grid grid-flow-col auto-cols-max">
                  <div class="grid w-12">
                    <div class="col-start-1 row-start-1 justify-center">
                      <HeartIcon class="fill-red-500 w-12 self-center" />
                    </div>
                    <div class="col-start-1 row-start-1 self-center text-center font-semibold text-red self-center">
                      {{ monster.hp }}
                    </div>
                  </div>
                  <Conditions :conditions="monster.conditions" :monster="monster"
                    @add-condition="addCondition(monster, $event)"
                    @remove-condition="removeCondition(monster, $event)" />
                  <TrashIcon class="fill-gray-600 w-12" @click="removeMonster(monster)" />
                </div>
              </div>
            </div>
          </BaseListItem>
        </template>
      </div>
    </div>
    <!-------------------- BOTTOM GRAY --------------------------->
    <div class="grid grid-cols-12 divide-y" id="initiative-container">
      <div><img :src="BottomGrayImgUrl" /></div>
      <div class="col-span-11">
        <template v-for="(monster) in monsterByInitiative(InitiativePlaces.BOTTOM_GRAY)" :key="monster.msTimestamp">
          <BaseListItem>
            <div class="grid grid-flow-col auto-cols-max" v-touch:swipe.right="onHpSwipeRight(monster)"
              v-touch:swipe.left="onHpSwipeLeft(monster)">
              <MonsterImage :monster="monster" @click="openDetails(monster)" imgClass="rounded-full"
                :style="'border-color:' + monster.baseColor + ';'"
                class="bg-white border-8 rounded-full shadow dark:bg-gray-800"
                :class="monster.size == 'large' ? 'w-32' : 'w-24'"/>
              <div>
                <div class="font-semibold text-lg">
                  {{ monster.name }} ({{ monster.color }})
                </div>
                <div class="grid grid-flow-col auto-cols-max">
                  <div class="grid w-12">
                    <div class="col-start-1 row-start-1 justify-center">
                      <HeartIcon class="fill-red-500 w-12 self-center" />
                    </div>
                    <div class="col-start-1 row-start-1 self-center text-center font-semibold text-red self-center">
                      {{ monster.hp }}
                    </div>
                  </div>
                  <Conditions :conditions="monster.conditions" :monster="monster"
                    @add-condition="addCondition(monster, $event)"
                    @remove-condition="removeCondition(monster, $event)" />
                  <TrashIcon class="fill-gray-600 w-12" @click="removeMonster(monster)" />
                </div>
              </div>
            </div>
          </BaseListItem>
        </template>
      </div>
    </div>
    <!-------------------- RUNE --------------------------->
    <div class="grid grid-cols-12 divide-y" id="initiative-container">
      <div class="col-span-11 col-start-2 text-4xl font-extrabold mb-4">
        RUNE
      </div>
    </div>
  </div>
  <BaseModal :is-open="detailsOpen" @close-modal="closeDetails" >
    <template #header>
      <div class="grid grid-cols-2">
        <div class="font-medium">{{ detailsMonster.name }} ({{ detailsMonster.baseColor }})</div>
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
      <div class="container" @click="closeDetails">
          <div class="border-8" :style="'border-color:' + detailsMonster.baseColor + ';'">
          <img :src="detailsMonsterCardUrl" class="rounded-sm shadow dark:bg-gray-800 w-full"
          v-touch:swipe.right="swipeCardRight" 
          v-touch:swipe.left="swipeCardLeft" />
        </div>
        <img :src="detailsMonsterMinatureUrl" class="rounded-sm shadow dark:bg-gray-800 s-full" />
      </div>
    </template>
  </BaseModal>
</template>

<style scoped>
</style>