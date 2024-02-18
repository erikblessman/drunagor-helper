<script setup lang="ts">
import MonsterPicker from "@/components/MonsterPicker.vue";
import Conditions from "@/components/ConditionPicker.vue";
import MonsterImage from "@/components/MonsterImage.vue";
import {
  HeartIcon,
  TrashIcon,
  ArrowPathIcon,
} from "@heroicons/vue/24/solid";
import { MonsterStore } from "@/store/MonsterStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import {
  PlusIcon,
} from "@heroicons/vue/24/outline";

const { activeMonsterData,
  autoConfirmDelete,
  useDefaultHp,
} = storeToRefs(MonsterStore());
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
      <template v-for="(monster, index) in activeMonsterData" :key="index">
        <BaseListItem>
          <div class="grid grid-flow-col auto-cols-max" v-touch:swipe.right="onHpSwipeRight(index)"
            v-touch:swipe.left="onHpSwipeLeft(index)">
            <MonsterImage :monster="monster" @dblclick="removeMonster(index)" imgClass="rounded-full"
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
                <Conditions :conditions="monster.conditions"
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
</template>

<style scoped></style>