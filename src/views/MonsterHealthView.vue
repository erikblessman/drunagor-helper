<script setup lang="ts">
  import { MonsterDataStore } from "@/data/store/MonsterDataStore";
  import type { MonsterData } from "@/data/store/MonsterData";
  import { ref } from "vue";
  import MonsterPicker from "@/components/MonsterPicker.vue";
  import MonsterImage from "@/components/MonsterImage.vue";

  let monsterDataStore = MonsterDataStore();
  // let monster = ref<MonsterData>(monsterDataStore.find('rotten-flesh'));
  let monsters = ref<MonsterData[]>([]);//monsterDataStore.findAllEnabled());

  function addMonster(newMonster: MonsterData) {
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
        <template v-for="(monster, index) in monsters" :key="index">
          <MonsterImage
          :monster="monster"
          @dblclick="removeMonster(index)"
          imgClass="w-48 rounded-full"
          class="max-w-xs bg-white border-fuchsia-500 border-8 rounded-full shadow dark:bg-gray-800"/>
        </template>
  </div>
</template>

<style scoped>
</style>