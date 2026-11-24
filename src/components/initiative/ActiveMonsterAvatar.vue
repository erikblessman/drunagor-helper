<script setup lang="ts">

// #region external imports-------------------------------------------------------------------------
import { toRef } from "vue";
import { UserCircleIcon } from "@heroicons/vue/24/solid";
// #endregion

// #region internal imports ------------------------------------------------------------------------
import type { ActiveMonsterData } from "@/data/store/MonsterData";
// #endregion

// #region props
const props = defineProps<{
  monster: ActiveMonsterData;
  showNotes?: boolean;
}>();

const monster = toRef(props, "monster");
// #endregion
</script>

<template>
    <div class="flex flex-row">
        <img
            v-if="(monster?.images?.big?.length ?? 0) > 0"
            :src="monster.images.big"
            :style="'border-color:' + monster.baseColor + ';'"
            class="bg-white border-8 rounded-full shadow dark:bg-gray-800"
            :class="monster.size == 'large' ? 'w-32' : 'w-24'"
        />
        <!-- No art (e.g. custom monsters): same ring-colored border and size as an image avatar -->
        <div v-else
            :style="'border-color:' + monster.baseColor + ';'"
            class="flex items-center justify-center aspect-square bg-white border-8 rounded-full shadow dark:bg-gray-800"
            :class="monster.size == 'large' ? 'w-32' : 'w-24'">
            <UserCircleIcon class="w-full h-full text-gray-400" />
        </div>
        <div v-if="showNotes" class="font-semibold text-lg">
            <div>{{ monster.name }}</div>
            <div>{{ monster.color }} {{ monster.rank }}</div>
            <div>[{{ monster.content }}]</div>
        </div>
    </div>
</template>

<style scoped></style>
