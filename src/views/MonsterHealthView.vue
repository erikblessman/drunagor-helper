<script setup lang="ts">
  import type { ActiveMonsterData, MonsterData } from "@/data/store/MonsterData";
  import { ref } from "vue";
  import MonsterPicker from "@/components/MonsterPicker.vue";
  import MonsterImage from "@/components/MonsterImage.vue";
  import { Bleeding, Poison, Slow, Stun } from "@/data/conditions/Condition";
  import {
    HeartIcon,
    TrashIcon,
    FlagIcon, // TODO: Add ability go add/remove conditions
  } from "@heroicons/vue/24/solid";

  let monsters = ref<ActiveMonsterData[]>([]);

  const availableRingColors : string[] = [
    "Yellow", "Navy", "HotPink", "Green", "FireBrick","Black", 
    "DarkOrange", "Snow", "Aquamarine", "RoyalBlue", "Red", "SaddleBrown", 
  ];

  function addMonster(monster: MonsterData) {
    let newMonster: ActiveMonsterData = {...monster} as ActiveMonsterData;
    newMonster.conditions = [Poison, Bleeding, Slow, Stun];
    newMonster.hp = 10;
    if (availableRingColors.length === 0) {
      newMonster.baseColor = "Black";
    } else {
      newMonster.baseColor = availableRingColors.shift() as string;
    }

    monsters.value.push(newMonster);
  }

  function removeMonster(index: number) {
    availableRingColors.unshift(monsters.value[index].baseColor);
    monsters.value.splice(index, 1);
  }

  function onMonsterSwipeLeft(index: number) {
		return function () {
			removeMonster(index);
		};
	}

  function incrementHp(index: number) {
    monsters.value[index].hp++;
  }

  function decrementHp(index: number) {
    monsters.value[index].hp--;
    if (monsters.value[index].hp <= 0 && confirm("Remove monster?")) {
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
          <div class="grid grid-flow-col auto-cols-max">
            <MonsterImage
              :monster="monster"
              @dblclick="removeMonster(index)"
              imgClass="w-24 rounded-full"
              :style="'border-color:' + monster.baseColor + ';'"
              :class="'w-24 bg-white border-8 rounded-full shadow dark:bg-gray-800'"
              v-touch:swipe.left="onMonsterSwipeLeft(index)"/>
            <div>
              <div class="font-semibold text-lg">
                {{ monster.name }} ({{ monster.color }})
              </div>
              <div class="grid grid-flow-col auto-cols-max">
                <div class="grid w-12" style="border 1px dashed red;"
                v-touch:swipe.right="onHpSwipeRight(index)"
                v-touch:swipe.left="onHpSwipeLeft(index)">
                  <div class="col-start-1 row-start-1 justify-center border-dashed border-red">
                    <HeartIcon class="fill-red-500 w-12 self-center" />
                  </div>
                  <div class="col-start-1 row-start-1 self-center text-center font-semibold text-red self-center"
                  style="border 1px dashed blue;">
                    {{monster.hp}}
                  </div>
                </div>
                <div v-for="(condition, index) in monster.conditions" :key="index">
                  <img :src="condition.image" class="w-12"/>
                </div>
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