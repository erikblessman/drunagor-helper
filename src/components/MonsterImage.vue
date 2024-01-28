<template>
    <div class="zoom">
        <img :src="currentImage" @click="swapImage" :class="imgClass" alt="Monster Image" />
    </div>
</template>

<script setup lang="ts">
import type { MonsterData } from "@/data/store/MonsterData";
import { computed, ref } from "vue";
// when the monster prop changes, I want the monster variable to be updated

const props = defineProps<{
    monster: MonsterData,
    imgClass?: string,
}>();
const monster = computed( () => props.monster);
let useBig = ref(true);
const currentImage = computed(() => {
    if (useBig.value || !props.monster.images.miniature)
        return props.monster.images.big;
    else
        return props.monster.images.miniature;
});

function swapImage() {
    useBig.value = !useBig.value;
}
</script>

<style scoped>
/* .zoom:hover {
  transform: scale(2.0);
} */
</style>
