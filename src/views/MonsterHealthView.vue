<script setup lang="ts">
  import type { ActiveMonsterData, MonsterData } from "@/data/store/MonsterData";
  import { ref } from "vue";
  import MonsterPicker from "@/components/MonsterPicker.vue";
  import MonsterImage from "@/components/MonsterImage.vue";
import { Bleeding, Poison, Slow, Stun } from "@/data/conditions/Condition";

  let monsters = ref<ActiveMonsterData[]>([]);

  function addMonster(monster: MonsterData) {
    let newMonster: ActiveMonsterData = monster as ActiveMonsterData;
    newMonster.conditions = [Bleeding, Poison, Slow, Stun];
    monsters.value.push(newMonster);
  }

  function removeMonster(index: number) {
    monsters.value.splice(index, 1);
  }
</script>

<template>
  <BaseButtonMenu>
    <MonsterPicker @pick-monster="addMonster"/>
  </BaseButtonMenu>
  <div class="grid grid-flow-col auto-cols-max" gap-4>
    
    <BaseList id="campaign-add-heroes">
      <template v-for="(monster, index) in monsters" :key="index">
        <BaseListItem>
          <div class="grid grid-flow-col auto-cols-max">
            <MonsterImage
              :monster="monster"
              @dblclick="removeMonster(index)"
              imgClass="w-24 rounded-full"
              class="w-24 bg-white border-fuchsia-500 border-8 rounded-full shadow dark:bg-gray-800"/>
            <div>
              <div class="grid grid-flow-col">
                <div v-for="(condition, index) in monster.conditions" :key="index">
                  <img :src="condition.image" class="w-12" />
                </div>
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