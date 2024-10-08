<script setup lang="ts">
import { ref } from "vue";
import BaseModal from "@/components/BaseModal.vue";
import BaseList from "@/components/BaseList.vue";
import BaseListItem from "@/components/BaseListItem.vue";
import { useToast } from "vue-toastification";
import * as _ from "lodash-es";
import { XMarkIcon } from "@heroicons/vue/24/solid";
import { MonsterDataStore } from "@/data/store/MonsterDataStore";
import type { MonsterData } from "@/data/store/MonsterData";
import { QuestionMarkCircleIcon } from "@heroicons/vue/24/outline";

const toast = useToast();

const isOpen = ref(false);

const rank = ref("rookie");

function openModal() {
  isOpen.value = true;
}
function closeModal() {
  isOpen.value = false;
}

defineExpose({ openModal });

const monsterStore = MonsterDataStore();
const monsters = monsterStore.findAllEnabled().sort((a, b) => {
  if (a.name < b.name) {
    return -1;
  } else if (a.name > b.name) {
    return 1;
  } else {
    return 0;
  }
});

const emit = defineEmits(["pick-monster"]);

function pickMonster(monster: MonsterData) {
  emit("pick-monster", { ...monster, rank: rank.value, variant: "standard" });
}

function randomMonster(color: string) {
  let randomMonster = _.sample(monsters.filter((m) => m.color === color));
  if (randomMonster) {
    const tag = prompt("Tag", "R" + color.substring(0, 1).toUpperCase());
    let name = randomMonster.name;
    if (tag) {
      name += " [" + tag + "]";
    }
    pickMonster({ ...randomMonster, name: name });
  } else {
    toast.error("No monsters of that color");
  }
}
</script>

<template>
  <BaseModal :is-open="isOpen" @close-modal="closeModal">
    <template #header>
      <div class="grid grid-cols-2">
        <div class="flex">
          <div class="w-full font-medium place-self-center">Add Monster</div>
          <select class="bg-base-100 py-2 pl-3 pr-20 w-full leading-5 focus:ring-0 rounded-lg" v-model="rank">
            <option value="rookie">Rookie</option>
            <option value="fighter">Fighter</option>
            <option value="veteran">Veteran</option>
            <option value="champion">Champion</option>
          </select>
        </div>
        <div>
          <button
            id="close-modal"
            class="px-2 py-2 bg-neutral text-gray-200 uppercase font-semibold text-sm rounded-lg float-right"
            @click="closeModal"
          >
            <XMarkIcon class="h-5 bg-neutral text-gray-200 uppercase font-semibold text-sm rounded-lg" />
          </button>
        </div>
      </div>
    </template>
    <template #default>
      <BaseList id="monster-pick-list">
        <BaseListItem @click="randomMonster('white')">
          <QuestionMarkCircleIcon class="w-12 fill-white stroke-gray-500" />
          Random White
        </BaseListItem>
        <BaseListItem @click="randomMonster('gray')">
          <QuestionMarkCircleIcon class="w-12 fill-gray-500 stroke-black" />
          Random Gray
        </BaseListItem>
        <BaseListItem @click="randomMonster('black')">
          <QuestionMarkCircleIcon class="w-12 fill-black stroke-gray-500" />
          Random Black
        </BaseListItem>
        <template v-for="monster in monsters" :key="monster.id">
          <BaseListItem :avatar="monster.images.big" @click="pickMonster(monster)">
            {{ monster.name }}
          </BaseListItem>
        </template>
        <div>Scenario Monsters</div>
        <template v-for="monster in monsterStore.scenarioMonsters" :key="monster.id">
          <BaseListItem :avatar="monster.images.big" @click="pickMonster(monster)">
            {{ monster.name }}
          </BaseListItem>
        </template>
      </BaseList>
    </template>
  </BaseModal>
</template>

<style scoped></style>
