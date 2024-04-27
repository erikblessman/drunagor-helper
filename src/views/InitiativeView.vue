<script setup lang="ts">
// #region external imports
import { storeToRefs } from "pinia";
import {
    ArrowPathIcon,
    PlusIcon
} from "@heroicons/vue/24/solid";
import { ref, computed } from "vue";
// #endregion

// #region internal imports
import { useInitiativeStore } from "@/store/InitiativeStore";
import MonsterPicker from "@/components/initiative/MonsterPicker.vue";
import MonsterInitiative from "@/components/initiative/MonsterInitiative.vue";
import { InitiativeList, InitiativeTypes } from "@/data/initiative/InitiativePlaces";
import type { ActiveMonsterData } from "@/data/store/MonsterData";
import BaseDivider from "@/components/BaseDivider.vue";
import OnOffButton from "@/components/common/OnOffButton.vue";
// #endregion

// #region store bindings
const { autoConfirmDelete, useDefaultHp } = storeToRefs(useInitiativeStore());
const { getInitiativeList, addMonster, clearInitiative, decrementHp, incrementHp, removeMonster } =
    useInitiativeStore();
// #endregion

// #region monster picker
const monsterPickerRef = ref(null);

const openMonsterPicker = (): void => {
    if (monsterPickerRef.value === null) {
        throw new Error("monsterPickerRef is null");
    }
    (monsterPickerRef.value as any).openModal();
};
// #endregion

// #region initiative list
const initiativeList = computed(() => {
    return getInitiativeList();
});

const monsterByInitiative = (initiative: number) => {
    return initiativeList.value.filter((monster: ActiveMonsterData) => {
        return monster.initiative === initiative;
    });
};
// #endregion

const todo = () => {
    alert("Not implemented yet");
};

</script>

<template>
    <div class="grid place-items-center w-full">
        <BaseDivider>Initiative</BaseDivider>
        <!-- Action Buttons -->
        <div class="w-full flex">
            <PlusIcon class="w-8 bg-slate-800 rounded-lg mx-1" @click="openMonsterPicker" />
            <ArrowPathIcon class="w-8 text-red-400 rounded-lg mx-1" @click="clearInitiative" />
            <OnOffButton :flag="autoConfirmDelete" @click="autoConfirmDelete = !autoConfirmDelete"
                class="py-1 px-4 mx-1">
                Auto Confirm
            </OnOffButton>
            <OnOffButton :flag="useDefaultHp" @click="useDefaultHp = !useDefaultHp" class="py-1 px-4 mx-1">
                Default HP
            </OnOffButton>
        </div>
        <!-- Initiative List -->
        <div container class="divide-y">
            <div v-for="initInfo in InitiativeList" :key="initInfo.index">
                <!-- Monster Initiatives -->
                <MonsterInitiative v-if="initInfo.type === InitiativeTypes.MONSTER" :turnImgUrl="initInfo.imgUrl"
                    :monsters="monsterByInitiative(initInfo.index)" :onHpSwipeRight="incrementHp"
                    :onHpSwipeLeft="decrementHp" :openDetails="todo" :addCondition="todo" :removeCondition="todo"
                    :removeMonster="removeMonster" />
                <!-- Non Monster Initiatives -->
                <div v-if="initInfo.type != InitiativeTypes.MONSTER" class="grid grid-cols-12 divide-y"
                    id="initiative-container">
                    <div class="col-span-11 col-start-2 text-4xl font-extrabold mb-4">
                        {{ initInfo.text }}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Pop-Ups -->
    <MonsterPicker @pick-monster="addMonster" ref="monsterPickerRef" />
</template>