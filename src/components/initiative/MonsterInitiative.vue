<script setup lang="ts">
// #region external imports
import { HeartIcon, TrashIcon } from "@heroicons/vue/24/solid";
// #endregion

// #region internal imports
import { useInitiativeStore } from "@/store/InitiativeStore";
import Conditions from "@/components/initiative/ConditionPicker.vue";
import type { ActiveMonsterData } from "@/data/store/MonsterData";
import { toRef } from "vue";
import ActiveMonsterAvatar from "./ActiveMonsterAvatar.vue";
// #endregion

// #region props
const props = defineProps<{
  turnImgUrl?: string;
  monsters: ActiveMonsterData[];
  tokenCount: number;
}>();

const monsterList = toRef(props, "monsters");
// #endregion

// #region emits
const emit = defineEmits(["open-details", "update-hp"]);
// #endregion

// #region store bindings
const { decrementHp, incrementHp, removeMonster } = useInitiativeStore();
// #endregion
</script>

<template>
  <div class="grid grid-cols-12" id="initiative-container">
    <div>
      <div class="flex flex-row">
        <img :src="turnImgUrl" />{{ tokenCount }}
      </div>
    </div>
    <div class="col-span-11">
      <template v-for="monster in monsterList.sort((a, b) => a.msTimestamp - b.msTimestamp)" :key="monster.msTimestamp">
        <div
          class="flex ml-4"
          v-touch:swipe.right="() => incrementHp(monster)"
          v-touch:swipe.left="() => decrementHp(monster)"
        >
          <span @click="emit('open-details', monster)">
            <ActiveMonsterAvatar :monster="monster" />
          </span>
          <div class="w-full">
            <div class="font-semibold text-lg">{{ monster.name }} ({{ monster.color }})</div>
            <div class="flex w-full justify-between">
              <div class="flex space-x-4 px-4">
                <div class="text-2xl self-center text-center font-bold text-white px-3 py-1 border-4 border-green-900 bg-green-600 rounded-xl" @click="incrementHp(monster, 1)">1</div>
                <div class="grid w-16">
                  <div class="col-start-1 row-start-1 justify-center">
                    <HeartIcon class="fill-red-500 w-16 self-center" />
                  </div>
                  <div class="text-2xl col-start-1 row-start-1 self-center text-center font-semibold">
                    {{ monster.hp }}
                  </div>
                </div>
                <div class="text-2xl self-center text-center font-bold text-white px-3 py-1 border-4 border-red-900 bg-red-600 rounded-xl" @click="decrementHp(monster, -3)">3</div>
                <div class="text-2xl self-center text-center font-bold text-white px-3 py-1 border-4 border-red-900 bg-red-600 rounded-xl" @click="decrementHp(monster, -2)">2</div>
                <div class="text-2xl self-center text-center font-bold text-white px-3 py-1 border-4 border-red-900 bg-red-600 rounded-xl" @click="decrementHp(monster, -1)">1</div>
              </div>
              <TrashIcon class="fill-gray-600 w-12" @click="removeMonster(monster)" />
            </div>
            <div class="flex">
              <Conditions :monster="monster" />
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
