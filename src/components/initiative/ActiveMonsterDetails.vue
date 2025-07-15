<script setup lang="ts">

// #region external imports-------------------------------------------------------------------------
import { storeToRefs } from "pinia";
import { computed, ref, toRef } from "vue";
import {
  UserCircleIcon,
  HeartIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/vue/24/solid";
// #endregion

// #region internal imports ------------------------------------------------------------------------
import type { ActiveMonsterData } from "@/data/store/MonsterData";
import { useInitiativeStore, ringColors } from "@/store/InitiativeStore";
import Conditions from "@/components/initiative/ConditionPicker.vue";
// #endregion

// #region props
const props = defineProps<{
  detailsMonster: ActiveMonsterData | null;
}>();

const detailsMonster = toRef(props, "detailsMonster");
// #endregion

// #region emits
const emit = defineEmits(["close", "decrement-hp", "increment-hp", "update-hp", "remove-monster"]);
// #endregion

// #region computed

const detailsMonsterCardUrl = computed((): string => {
  const cards = detailsMonster?.value?.images?.cards;
  const defaultImg = detailsMonster?.value?.images?.big ?? "";
  if (!cards) {
    console.warn("No cards found for monster", detailsMonster);
    return defaultImg;
  }
  const index = (detailsMonster?.value as any)?.cardIndex || 0;
  const rank = detailsMonster?.value?.rank || "rookie";
  return cards[rank][index] || defaultImg;
});
// #endregion

// #region functions -------------------------------------------------------------------------------
function closeDetails() {
    emit('close');
}

let colorPickerVisible = ref(false);
function toggleColorPicker() {
  colorPickerVisible.value = !colorPickerVisible.value;
}

function changeColor(color: string) {
  if (detailsMonster.value) {
    detailsMonster.value.baseColor = color;
  }
}
// #endregion
</script>

<template>
    <div class="container">
    <div class="grid grid-flow-col auto-cols-max">
        <MinusIcon class="w-12" @click="emit('decrement-hp')" />
        <div class="grid w-12" @click="emit('update-hp')">
        <div class="col-start-1 row-start-1 justify-center">
            <HeartIcon class="fill-red-500 w-12 self-center" />
        </div>
        <div class="col-start-1 row-start-1 self-center text-center font-semibold text-red self-center">
            {{ detailsMonster?.hp }}
        </div>
        </div>
        <PlusIcon @click="() => emit('increment-hp')" class="w-12" />
        <TrashIcon class="fill-gray-600 w-12" @click="() => emit('remove-monster')" />
        <!-- div with ring color, onclick shows next div -->
        <div
            class="rounded-full w-12 h-12 border-8"
            @click="toggleColorPicker"
            :style="'border-color: ' + detailsMonster?.baseColor + ';'"
        ></div>
        <div class="grid grid-cols-3 gap-1" v-if="colorPickerVisible">
        <div
            v-for="color in ringColors"
            :key="color"
            class="rounded-full w-12 h-12 border-8"
            :style="'border-color: ' + color + ';'"
            @click="changeColor(color)"
        ></div>
        </div>
        <!-- div showing all colors, each within a div where onclick sets monster.baseColor -->
    </div>
    <div class="grid grid-flow-col auto-cols-max">
        <Conditions :monster="detailsMonster" />
    </div>
    <div class="border-8" :style="'border-color:' + detailsMonster?.baseColor + ';'" @click="closeDetails">
        <img
        v-if="(detailsMonsterCardUrl?.length ?? 0) > 0"
        :src="detailsMonsterCardUrl"
        class="rounded-sm shadow dark:bg-gray-800 w-full" />
        <UserCircleIcon v-else class="h-100 text-gray-200 rounded-lg" />
    </div>
    <img :src="detailsMonster?.images?.miniature" class="rounded-sm shadow dark:bg-gray-800 w-full" />
    </div>
</template>

<style scoped></style>
