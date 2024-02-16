<script setup lang="ts">
import type { ActiveMonsterData, MonsterData } from "@/data/store/MonsterData";
import MonsterPicker from "@/components/MonsterPicker.vue";
import Conditions from "@/components/ConditionPicker.vue";
import MonsterImage from "@/components/MonsterImage.vue";
import {
  HeartIcon,
  TrashIcon,
  ArrowPathIcon,
} from "@heroicons/vue/24/solid";
import { MonsterStore } from "@/store/MonsterStore";
import type { ICondition } from "@/data/conditions/Condition";
import { storeToRefs } from "pinia";

const { activeMonsterData } = storeToRefs(MonsterStore());
const {
  addMonster,
  removeMonster,
  clearActiveMonsters,
  addCondition,
  removeCondition,
  incrementHp,
  decrementHp,
} = MonsterStore();

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
</script>

<template>
  <MonsterPicker @pick-monster="addMonster" />
  <ArrowPathIcon class="w-6 fill-gray-600" @click="clearActiveMonsters" />
  <div class="grid grid-flow-col auto-cols-max" gap-4>
    <BaseList id="monster-health">
      <template v-for="(monster, index) in activeMonsterData" :key="index">
        <BaseListItem>
          <div class="grid grid-flow-col auto-cols-max" v-touch:swipe.right="onHpSwipeRight(index)"
            v-touch:swipe.left="onHpSwipeLeft(index)">
            <MonsterImage :monster="monster" @dblclick="removeMonster(index)" imgClass="w-24 rounded-full"
              :style="'border-color:' + monster.baseColor + ';'"
              :class="'w-24 bg-white border-8 rounded-full shadow dark:bg-gray-800'" />
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