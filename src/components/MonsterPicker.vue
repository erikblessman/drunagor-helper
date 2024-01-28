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
import {
  PlusIcon
} from "@heroicons/vue/24/solid";

const toast = useToast();

const isOpen = ref(false);

function openModal() {
  isOpen.value = true;
}
function closeModal() {
  isOpen.value = false;
}

const monsterStore = MonsterDataStore();
const monsters = monsterStore.findAllEnabled();

const emit = defineEmits(["pick-monster"]);

function pickMonster(monster: MonsterData) {
  emit("pick-monster", monster);
  closeModal();
}
</script>

<template>
  
  <PlusIcon
    id="campaign-add-hero"
    class="w-6 bg-neutral text-green-400 rounded-lg"
    @click="openModal" />
  <BaseModal :is-open="isOpen" @close-modal="closeModal">
    <template #header>
      <div class="grid grid-cols-2">
        <div class="w-full font-medium place-self-center">Add Monster</div>
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
        <template v-for="monster in monsters" :key="monster.id">
          <BaseListItem :avatar="monster.images.big" @click="pickMonster(monster)">
            {{ monster.name }}
          </BaseListItem>
        </template>
      </BaseList>
    </template>
  </BaseModal>
</template>

<style scoped></style>
