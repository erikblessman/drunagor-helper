<script setup lang="ts">
  import { MonsterDataStore } from "@/data/store/MonsterDataStore";
  import type { MonsterData } from "@/data/store/MonsterData";
  import { ref } from "vue";
  import MonsterPicker from "@/components/MonsterPicker.vue";

  let monsterDataStore = MonsterDataStore();
  let monster = ref<MonsterData>(monsterDataStore.find('rotten-flesh'));

  function addMonster(newMonster: MonsterData) {
    monster.value = newMonster;
  }
</script>

<style scoped>
.testt {
  background-color: red;
  width: 600px;
  height: 600px;
  text-align: center;
  vertical-align: middle;
  font-size: 100px;
}
</style>

<template>
  <BaseButtonMenu>
    <MonsterPicker @pick-monster="addMonster"/>
  </BaseButtonMenu>
  <div class="grid grid-flow-col auto-cols-max" gap-4>
    <div class="max-w-xs bg-white border-fuchsia-500 border-8 rounded-full shadow dark:bg-gray-800">
      <img class="w-48 rounded-full" :src="monster.images.big" />
    </div>
  </div>
</template>