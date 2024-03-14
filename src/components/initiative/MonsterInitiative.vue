<template>
  <div class="grid grid-cols-12" id="initiative-container">
    <div><img :src="turnImgUrl" /></div>
    <div class="col-span-11">
      <template v-for="(monster) in props.monsters.sort((a,b) => a.msTimestamp-b.msTimestamp)" :key="monster.msTimestamp">
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
</template>

<script setup lang="ts">
import MonsterImage from "@/components/MonsterImage.vue";
import type { ActiveMonsterData } from '@/data/store/MonsterData';
import {
  HeartIcon,
  TrashIcon,
  ArrowPathIcon,
} from "@heroicons/vue/24/solid";
import Conditions from "@/components/ConditionPicker.vue";

const props = defineProps<{
    turnImgUrl?: string,
    monsters: ActiveMonsterData[],
    onHpSwipeRight: (monster: ActiveMonsterData) => void,
    onHpSwipeLeft: (monster: ActiveMonsterData) => void,
    openDetails: (monster: ActiveMonsterData) => void,
    addCondition: (monster: ActiveMonsterData, condition: string) => void,
    removeCondition: (monster: ActiveMonsterData, condition: string) => void,
    removeMonster: (monster: ActiveMonsterData) => void,
}>();

</script>