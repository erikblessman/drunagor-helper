<script setup lang="ts">
import { ref } from "vue";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/vue/24/solid";
import type { ICondition } from "@/data/conditions/Condition";
import { Conditions } from "@/data/conditions/Condition";

const isOpen = ref(false);

const emit = defineEmits(["pick-monster"]);

const props = defineProps<{
  conditions: ICondition[];
}>();

function isSelected(condition: ICondition) {
  return props.conditions.indexOf(condition) !== -1;
}

function toggleCondition(condition: ICondition) {
  const index = props.conditions.indexOf(condition);
  if (index == -1) {
    props.conditions.push(condition);
  } else {
    props.conditions.splice(index, 1);
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
