<script setup lang="ts">
// #region external imports
import { ArrowPathIcon, PlusIcon, XMarkIcon } from "@heroicons/vue/24/solid";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
// #endregion

// #region internal imports
import BaseModal from "@/components/BaseModal.vue";
import MonsterPicker from "@/components/MonsterPicker.vue";
import MonsterInitiative from "@/components/initiative/MonsterInitiative.vue";
import { InitiativeList, InitiativeTypes } from "@/data/InitiativePlaces";
import { useInitiativeStore } from "@/store/InitiativeStore";
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
    return initiativeList.value.filter((monster) => {
        return monster.initiative === initiative;
    });
};
// #endregion

// #region details popup
const detailsOpen = ref(false);
const detailsMonster = ref(null);
const detailsMonsterCardUrl = computed(() => {
    const cards = (detailsMonster?.value as any)?.images?.cards;
    if (!cards) {
        return null;
    }
    const index = (detailsMonster?.value as any)?.cardIndex || 0;
    return cards[index];
});
function openDetails(monster: any) {
    detailsMonster.value = monster;
    detailsOpen.value = true;
}
function closeDetails() {
    detailsOpen.value = false;
}
// #endregion

// #region initiative actions
const todo = () => {
    alert('TODO');
};
// #endregion

// #region store bindings
const { autoConfirmDelete, useDefaultHp } = storeToRefs(useInitiativeStore());
const { getInitiativeList, addMonster, clearInitiative, decrementHp, incrementHp, removeMonster } =
    useInitiativeStore();
// #endregion
</script>
<template>
    <!-- Top Action Buttons -->
    <div class="flex pb-4 w-full space-x-4">
        <div class="px-2 py-1 flex bg-neutral rounded-lg">
            <button @click="openMonsterPicker">
                <PlusIcon class="w-6 text-green-400" />
            </button>
        </div>
        <div class="px-2 py-1 flex bg-neutral rounded-lg">
            <button @click="clearInitiative">
                <ArrowPathIcon class="w-6 text-red-400" />
            </button>
        </div>
        <div class="px-2 py-1 flex bg-neutral rounded-lg">
            <Button :class="autoConfirmDelete ? 'text-green-400' : 'text-red-400'"
                @click="autoConfirmDelete = !autoConfirmDelete">
                Auto Confirm: {{ autoConfirmDelete ? "ON" : "OFF" }}
            </Button>
        </div>
        <div class="px-2 py-1 flex bg-neutral rounded-lg">
            <Button :class="useDefaultHp ? 'text-green-400' : 'text-red-400'" @click="useDefaultHp = !useDefaultHp">
                Use Default HP: {{ useDefaultHp ? "ON" : "OFF" }}
            </Button>
        </div>
    </div>
    <!-- Initiative List -->
    <div container class="divide-y">
        <div v-for="initInfo in InitiativeList" :key="initInfo.index">
            <!-- Monster Initiatives -->
            <MonsterInitiative v-if="initInfo.type === InitiativeTypes.MONSTER" :turnImgUrl="initInfo.imgUrl"
                :monsters="monsterByInitiative(initInfo.index)" :onHpSwipeRight="incrementHp"
                :onHpSwipeLeft="decrementHp" :openDetails="openDetails" :addCondition="todo" :removeCondition="todo"
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
    <!-- Pop-Ups -->
    <MonsterPicker @pick-monster="addMonster" ref="monsterPickerRef" />
    <BaseModal :is-open="detailsOpen" @close-modal="closeDetails">
        <template #header>
            <div class="grid grid-cols-2">
                <div class="font-medium">{{ detailsMonster?.name }} ({{ detailsMonster?.baseColor }}) - <span
                        class="text-slate-600">[{{ detailsMonster?.content }}]</span></div>
                <div>
                    <button id="close-modal"
                        class="px-2 py-2 bg-neutral text-gray-200 uppercase font-semibold text-sm rounded-lg float-right"
                        @click="closeDetails">
                        <XMarkIcon class="h-5 bg-neutral text-gray-200 uppercase font-semibold text-sm rounded-lg" />
                    </button>
                </div>
            </div>
        </template>
        <template #default>
            <div class="container" @click="closeDetails">
                <div class="border-8" :style="'border-color:' + detailsMonster?.baseColor + ';'">
                    <img :src="detailsMonsterCardUrl" class="rounded-sm shadow dark:bg-gray-800 w-full"
                        v-touch:swipe.right="todo" v-touch:swipe.left="todo" />
                </div>
                <img :src="detailsMonster?.images?.miniature" class="rounded-sm shadow dark:bg-gray-800 w-full" />
            </div>
        </template>
    </BaseModal>
</template>
