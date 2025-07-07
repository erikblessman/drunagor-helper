<script setup lang="ts">
let props = defineProps(["flag"]);
</script>

<template>
  <div class="flex flex-wrap bg-base-100 justify-center rounded-lg" :class="props.flag ? 'bg-green-600' : 'bg-red-600'">
    <slot></slot>
  </div>
</template>

<style scoped></style>
