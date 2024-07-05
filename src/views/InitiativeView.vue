<script setup lang="ts">
// #region external imports
import { storeToRefs } from "pinia";
import {
    ArrowPathIcon,
    BackwardIcon,
    ForwardIcon,
    HeartIcon,
    MinusIcon,
    PlusIcon,
    TrashIcon,
    XMarkIcon,
} from "@heroicons/vue/24/solid";
import { ref, computed } from "vue";
// #endregion

// #region internal imports
import { HeroStore } from "@/store/HeroStore";
import { useInitiativeStore } from "@/store/InitiativeStore";
import MonsterPicker from "@/components/initiative/MonsterPicker.vue";
import MonsterInitiative from "@/components/initiative/MonsterInitiative.vue";
import { InitiativeList, InitiativeTypes } from "@/data/initiative/InitiativePlaces";
import type { ActiveMonsterData } from "@/data/store/MonsterData";
import BaseDivider from "@/components/BaseDivider.vue";
import OnOffButton from "@/components/common/OnOffButton.vue";
import BaseModal from "@/components/BaseModal.vue";
import Conditions from "@/components/initiative/ConditionPicker.vue";
import type { HeroData } from "@/data/repository/HeroData";
// #endregion

// #region store bindings
const { autoConfirmDelete, useDefaultHp, turnIndex } = storeToRefs(useInitiativeStore());
const { getInitiativeList, addHero, addMonster, clearInitiative, decrementHp, getHero, incrementHp, removeHero, removeMonster } =
    useInitiativeStore();
const { heroes } = storeToRefs(HeroStore());
const heroStore = HeroStore();
// #endregion

// #region hero picker
const dungeonRoleToPick = ref<string | null>(null);
const closeHeroPicker = (): void => {
    dungeonRoleToPick.value = null;
};
const heroData: HeroData[] = heroes.value.map((hero) => {
    return heroStore.getHero(hero.heroId);
});
const assignHero = (hero: HeroData): void => {
    addHero(dungeonRoleToPick.value as string, hero);
    closeHeroPicker();
};
// #endregion

// #region monster picker
const monsterPickerRef = ref(null);

const openMonsterPicker = (): void => {
    if (monsterPickerRef.value === null) {
        throw new Error("monsterPickerRef is null");
    }
    (monsterPickerRef.value as any).openModal();
};
const pickMonster = (monster: any): void => {
    const activeMonster = addMonster(monster);
    openDetails(activeMonster);
}
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

const iList = computed(() => {
    let a = [];
    const n = InitiativeList.length;
    for (let i = 0; i < n; ++i) {
        const index = (i + turnIndex.value) % n;
        a.push(InitiativeList[index]);
    }
    return a;
});
const adjustTurn = (diff: number) => {
    const n = InitiativeList.length;
    turnIndex.value = (n + turnIndex.value + diff) % n;
};
const decrementTurn = () => {
    adjustTurn(-1);
};
const incrementTUrn = () => {
    adjustTurn(1);
}
// #endregion

// #region details popup
const detailsOpen = ref(false);
const detailsMonster = ref<ActiveMonsterData | null>(null);
const detailsMonsterCardUrl = computed((): string => {
    const cards = detailsMonster?.value?.images?.cards;
    const defaultImg = detailsMonster?.value?.images?.big ?? '';
    if (!cards) {
        console.warn("No cards found for monster", detailsMonster);
        return defaultImg;
    }
    const index = (detailsMonster?.value as any)?.cardIndex || 0;
    const rank = detailsMonster?.value?.rank || 'rookie';
    return cards[rank][index] || defaultImg;
});
function openDetails(monster: ActiveMonsterData) {
    detailsMonster.value = monster;
    detailsOpen.value = true;
}
function closeDetails() {
    detailsOpen.value = false;
}
// #endregion

</script>

<template>
    <div class="grid place-items-center w-full">
        <BaseDivider>Initiative</BaseDivider>
        <!-- #region Action Buttons -->
        <div class="w-full flex">
            <BackwardIcon class="w-8 rounded-lg mx-1" @click="decrementTurn" />
            <ForwardIcon class="w-8 rounded-lg mx-1" @click="incrementTUrn" />
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
        <!-- #endregion Action Buttons -->
        <!-- #region Initiative List -->
        <div container class="divide-y">
            <div v-for="initInfo in iList" :key="initInfo.index">
                <!-- Monster Initiatives -->
                <MonsterInitiative v-if="initInfo.type === InitiativeTypes.MONSTER" :turnImgUrl="initInfo.imgUrl"
                    :monsters="monsterByInitiative(initInfo.index)" @openDetails="openDetails" />
                <!-- Non Monster Initiatives -->
                <div v-else class="grid grid-cols-12 divide-y" id="initiative-container">
                    <div v-if="getHero(initInfo.text) == null"
                        class="col-span-11 col-start-2 text-4xl font-extrabold mb-4 flex">
                        {{ initInfo.text }}
                        <PlusIcon class="w-8 bg-slate-800 rounded-lg ml-4"
                            @click="() => dungeonRoleToPick = initInfo.text" />
                    </div>
                    <div v-else class="col-span-11 col-start-2 text-4xl font-extrabold mb-4 flex">
                        <img :src="getHero(initInfo.text)?.images?.avatar || ''" class="rounded-full w-16 h-16" />
                        <div class="flex flex-row ml-4">
                            {{ getHero(initInfo.text)?.name }}
                            <MinusIcon class="w-8 h-8 bg-slate-800 rounded-lg ml-4 mt-2"
                                @click="() => removeHero(initInfo.text)" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- #endregion Initiative List -->
    </div>
    <!-- Pop-Ups -->
    <MonsterPicker @pick-monster="pickMonster" ref="monsterPickerRef" />
    <BaseModal :is-open="dungeonRoleToPick != null" @close-modal="closeHeroPicker">
        <template #header>
            <div class="font-medium">Pick a Hero</div>
        </template>
        <template #default>
            <div class="container">
                <div class="grid grid-cols-3 gap-4">
                    <div v-for="hero in heroData" :key="hero.name" class="flex flex-col items-center">
                        <img :src="hero.images.avatar" class="rounded-full" @click="() => assignHero(hero)" />
                        <div>{{ hero.name }}</div>
                        <button @click="addHero(hero.name, hero)">Add</button>
                    </div>
                </div>
            </div>
        </template>
    </BaseModal>
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
            <div class="container">
                <div class="grid grid-flow-col auto-cols-max">
                    <MinusIcon @click="detailsMonster = decrementHp(detailsMonster)" class="w-12" />
                    <div class="grid w-12">
                        <div class="col-start-1 row-start-1 justify-center">
                            <HeartIcon class="fill-red-500 w-12 self-center" />
                        </div>
                        <div class="col-start-1 row-start-1 self-center text-center font-semibold text-red self-center">
                            {{ detailsMonster?.hp }}
                        </div>
                    </div>
                    <PlusIcon @click="detailsMonster = incrementHp(detailsMonster)" class="w-12" />
                    <TrashIcon class="fill-gray-600 w-12"
                        @click="() => { removeMonster(detailsMonster); closeDetails(); }" />
                </div>
                <div class="grid grid-flow-col auto-cols-max">
                    <Conditions :monster="detailsMonster" />
                </div>
                <div class="border-8" :style="'border-color:' + detailsMonster?.baseColor + ';'" @click="closeDetails">
                    <img :src="detailsMonsterCardUrl" class="rounded-sm shadow dark:bg-gray-800 w-full" />
                </div>
                <img :src="detailsMonster?.images?.miniature" class="rounded-sm shadow dark:bg-gray-800 w-full" />
            </div>
        </template>
    </BaseModal>
</template>