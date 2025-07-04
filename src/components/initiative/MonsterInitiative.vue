<script setup lang="ts">
// #region external imports
import { HeartIcon, UserCircleIcon, TrashIcon } from "@heroicons/vue/24/solid";
// #endregion

// #region internal imports
import { useInitiativeStore } from "@/store/InitiativeStore";
import Conditions from "@/components/initiative/ConditionPicker.vue";
import type { ActiveMonsterData } from "@/data/store/MonsterData";
import { toRef } from "vue";
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
const emit = defineEmits(["open-details"]);
// #endregion

// #region store bindings
const { decrementHp, incrementHp, removeMonster } = useInitiativeStore();
// #endregion
</script>

<template>
  <div class="grid grid-cols-12" id="initiative-container">
    <div class="flex flex-row">
      <img :src="turnImgUrl" />{{ tokenCount }}
    </div>
    <div class="col-span-11">
      <template v-for="monster in monsterList.sort((a, b) => a.msTimestamp - b.msTimestamp)" :key="monster.msTimestamp">
        <div
          class="grid grid-flow-col auto-cols-max"
          v-touch:swipe.right="() => incrementHp(monster)"
          v-touch:swipe.left="() => decrementHp(monster)"
        >
          <span @click="emit('open-details', monster)">
            <img
              v-if="(monster?.images?.big?.length ?? 0) > 0"
              :src="monster.images.big"
              :style="'border-color:' + monster.baseColor + ';'"
              class="bg-white border-8 rounded-full shadow dark:bg-gray-800"
              :class="monster.size == 'large' ? 'w-32' : 'w-24'"
            />
            <UserCircleIcon v-else
              :style="'border-color:' + monster.baseColor + ';'"
              class="h-16 text-gray-200 rounded-lg" />
          </span>
          <div>
            <div class="font-semibold text-lg">{{ monster.name }} ({{ monster.color }})</div>
            <div class="grid grid-flow-col auto-cols-max">
              <div class="grid w-12">
                <div class="col-start-1 row-start-1 justify-center">
                  <HeartIcon class="fill-red-500 w-12 self-center" />
                </div>
                <div class="col-start-1 row-start-1 self-center text-center font-semibold text-red self-center">
                  {{ monster.hp }}
                </div>
              </div>
              <Conditions :monster="monster" />
              <TrashIcon class="fill-gray-600 w-12" @click="removeMonster(monster)" />
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
