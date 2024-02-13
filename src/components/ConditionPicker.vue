<script setup lang="ts">
import { ref } from "vue";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/vue/24/solid";
import type { ICondition } from "@/data/conditions/Condition";
import { Conditions } from "@/data/conditions/Condition";

const isOpen = ref(false);

const emit = defineEmits(["add-condition", "remove-condition",]);

const props = defineProps<{
  conditions: ICondition[];
}>();

let conditions = ref(props.conditions);

function getIndex(condition: ICondition): number {
  return conditions.value.map(c => c.name).indexOf(condition.name);
}

function isSelected(condition: ICondition) {
  let index : number = getIndex(condition);
  return index !== -1;
}

function toggleCondition(condition: ICondition) {
  const index = getIndex(condition);
  if (index == -1) {
    conditions.value.push(condition);
    emit("add-condition", condition);
  } else {
    conditions.value.splice(index, 1);
    emit("remove-condition", condition);
  }
}

</script>

<template>
  
  <div v-for="(condition, index) in Conditions" :key="index">
    <img :src="condition.image" class="w-12"
    v-if="isOpen || isSelected(condition)"
    :class="{'opacity-25' : !isSelected(condition)}"
    @click="toggleCondition(condition)"/>
  </div>
  <ChevronRightIcon v-if="!isOpen" class="w-12 fill-wite" @click="isOpen = true" />
  <ChevronLeftIcon v-if="isOpen" class="w-12 fill-wite" @click="isOpen = false" />
</template>

<style scoped></style>
