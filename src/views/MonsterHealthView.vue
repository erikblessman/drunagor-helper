<script setup lang="ts">
import MonsterPicker from "@/components/MonsterPicker.vue";
import BaseModal from "@/components/BaseModal.vue";
import Conditions from "@/components/ConditionPicker.vue";
import MonsterImage from "@/components/MonsterImage.vue";
import {
  HeartIcon,
  TrashIcon,
  ArrowPathIcon,
} from "@heroicons/vue/24/solid";
import { MonsterStore } from "@/store/MonsterStore";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { XMarkIcon } from "@heroicons/vue/24/solid";
import {
  PlusIcon,
} from "@heroicons/vue/24/outline";
import type { ActiveMonsterData } from "@/data/store/MonsterData";

const { activeMonsterData,
  autoConfirmDelete,
  useDefaultHp,
} = storeToRefs(MonsterStore());
const orderedMonsters = computed(() => {
  return activeMonsterData.value.sort((a, b) => {
    if (a.initiative < b.initiative) {
      return -1;
    }
    if (a.initiative > b.initiative) {
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

function onHpSwipeRight(index: number) {
  return function () {
    incrementHp(index);
  };
}

function onHpSwipeLeft(index: number) {
  return function () {
    decrementHp(index);
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
  <div class="grid grid-flow-col auto-cols-max" gap-4>
    <BaseList id="monster-health">
      <template v-for="(monster, index) in orderedMonsters" :key="index">
        <BaseListItem>
          <div class="grid grid-flow-col auto-cols-max" v-touch:swipe.right="onHpSwipeRight(index)"
            v-touch:swipe.left="onHpSwipeLeft(index)">
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
                  @add-condition="addCondition(index, $event)"
                  @remove-condition="removeCondition(index, $event)" />
                <TrashIcon class="fill-gray-600 w-12" @click="removeMonster(index)" />
              </div>
            </div>
          </div>
        </BaseListItem>
      </template>
    </BaseList>
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
        <img :src="detailsMonsterMinatureUrl" class="rounded-sm shadow dark:bg-gray-800 w-full" />
      </div>
    </template>
  </BaseModal>
</template>

<style scoped></style>