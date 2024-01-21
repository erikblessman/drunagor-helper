<script setup lang="ts">
  import { MonsterDataStore } from "@/data/store/MonsterDataStore";
  import type { MonsterData } from "@/data/store/MonsterData";
  import { ref } from "vue";
  import MonsterPicker from "@/components/MonsterPicker.vue";
  import MonsterImage from "@/components/MonsterImage.vue";

  let monsterDataStore = MonsterDataStore();
  let monster = ref<MonsterData>(monsterDataStore.find('rotten-flesh'));

  function addMonster(newMonster: MonsterData) {
    monster.value = newMonster;
  }
</script>

<template>
  <BaseButtonMenu>
    <MonsterPicker @pick-monster="addMonster"/>
  </BaseButtonMenu>
  <div class="grid grid-flow-col auto-cols-max" gap-4>
    <MonsterImage :monster="monster" imgClass="w-48 rounded-full" class="max-w-xs bg-white border-fuchsia-500 border-8 rounded-full shadow dark:bg-gray-800"/>
  </div>
</template>

<style scoped>
</style>