<script setup lang="ts">
  import type { ActiveMonsterData, MonsterData } from "@/data/store/MonsterData";
  import MonsterPicker from "@/components/MonsterPicker.vue";
  import Conditions from "@/components/ConditionPicker.vue";
  import MonsterImage from "@/components/MonsterImage.vue";
  import {
    HeartIcon,
    TrashIcon,
  } from "@heroicons/vue/24/solid";
  import { MonsterStore } from "@/store/MonsterStore";

  const store = MonsterStore();
  let monsters = store.activeMonsterData;

  const availableRingColors : string[] = [
    "Yellow", "Navy", "HotPink", "Green", "FireBrick","Black", 
    "DarkOrange", "Snow", "Aquamarine", "RoyalBlue", "Red", "SaddleBrown", 
  ];

  function addMonster(monster: MonsterData) {
    let newMonster: ActiveMonsterData = {...monster} as ActiveMonsterData;
    newMonster.conditions = [];
    newMonster.hp = 10;
    if (availableRingColors.length === 0) {
      newMonster.baseColor = "Black";
    } else {
      newMonster.baseColor = availableRingColors.shift() as string;
    }
    store.addMonster(newMonster);
  }

  function removeMonster(index: number) {
    let monster = monsters[index];
    if (!confirm("Remove " + monster.name + "?")) {
      return;
    }
    availableRingColors.unshift(monster.baseColor);
    store.removeMonster(monster);
  }

  function incrementHp(index: number) {
    monsters[index].hp++;
  }

  function decrementHp(index: number) {
    monsters[index].hp--;
    if (monsters[index].hp <= 0) {
      removeMonster(index);
    }
  }

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
  <BaseButtonMenu>
    <MonsterPicker @pick-monster="addMonster"/>
  </BaseButtonMenu>
  <div class="grid grid-flow-col auto-cols-max" gap-4>
    
    <BaseList id="monster-health">
      <template v-for="(monster, index) in monsters" :key="index">
        <BaseListItem>
          <div class="grid grid-flow-col auto-cols-max"
                v-touch:swipe.right="onHpSwipeRight(index)"
                v-touch:swipe.left="onHpSwipeLeft(index)">
            <MonsterImage
              :monster="monster"
              @dblclick="removeMonster(index)"
              imgClass="w-24 rounded-full"
              :style="'border-color:' + monster.baseColor + ';'"
              :class="'w-24 bg-white border-8 rounded-full shadow dark:bg-gray-800'"/>
            <div>
              <div class="font-semibold text-lg">
                {{ monster.name }} ({{ monster.color }})
              </div>
              <div class="grid grid-flow-col auto-cols-max">
                <div class="grid w-12" style="border 1px dashed red;">
                  <div class="col-start-1 row-start-1 justify-center border-dashed border-red">
                    <HeartIcon class="fill-red-500 w-12 self-center" />
                  </div>
                  <div class="col-start-1 row-start-1 self-center text-center font-semibold text-red self-center"
                  style="border 1px dashed blue;">
                    {{monster.hp}}
                  </div>
                </div>
                <Conditions :conditions="monster.conditions"/>
                <TrashIcon class="fill-gray-600 w-12" @click="removeMonster(index)"/>
                <div>&nbsp;</div>
              </div>
            </div>
          </div>
        </BaseListItem>
      </template>
    </BaseList>
  </div>
</template>

<style scoped>
</style>