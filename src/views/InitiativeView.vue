<script setup lang="ts">
// #region external imports
import { storeToRefs } from "pinia";
import {
  ArrowPathIcon,
  ArrowUpCircleIcon,
  BackwardIcon,
  CheckCircleIcon,
  ForwardIcon,
  HeartIcon,
  MinusIcon,
  PlusIcon,
  RocketLaunchIcon,
} from "@heroicons/vue/24/solid";
import { ref, computed } from "vue";
import { useToast } from "vue-toastification";
// #endregion

// #region internal imports ------------------------------------------------------------------------
import ActiveMonsterDetails from "@/components/initiative/ActiveMonsterDetails.vue";
import DarknessTokenBag from "@/components/initiative/DarknessTokenBag.vue"
import { HeroStore } from "@/store/HeroStore";
import { useInitiativeStore } from "@/store/InitiativeStore";
import MonsterPicker from "@/components/initiative/MonsterPicker.vue";
import MonsterInitiative from "@/components/initiative/MonsterInitiative.vue";
import {
  InitiativeList,
  InitiativeTypes,
  type InitiativeInfo
} from "@/data/initiative/InitiativePlaces";
import type { ActiveMonsterData } from "@/data/store/MonsterData";
import BaseDivider from "@/components/BaseDivider.vue";
import OnOffButton from "@/components/common/OnOffButton.vue";
import BaseModal from "@/components/BaseModal.vue";
import type { HeroData } from "@/data/repository/HeroData";
import ActiveMonsterAvatar from "@/components/initiative/ActiveMonsterAvatar.vue";
// #endregion

const toast = useToast();

// #region store bindings
const { autoSkip, autoConfirmDelete, darknessTokens, turnIndex, useDefaultHp } = storeToRefs(useInitiativeStore());
const {
  getInitiativeList,
  addHero,
  addMonster,
  clearInitiative,
  decrementHp,
  getHero,
  incrementHp,
  removeHero,
  removeMonster,
  updateHp,
} = useInitiativeStore();
const { heroes } = storeToRefs(HeroStore());
const heroStore = HeroStore();
// #endregion

// #region hero picker
const dungeonRoleToPick = ref<string | null>(null);
const closeHeroPicker = (): void => {
  dungeonRoleToPick.value = null;
};
const heroData: HeroData[] = heroes.value.map((hero) => {
  return heroStore.getHero(hero.heroId) ?? {
    id: hero.heroId,
    name: "UNKNOWN HERO",
    content: "core",
    class: "Warrior",
    path: "Strength",
    race: "Human",
    proficiencies: {
      weapon: ["Heavy"],
      offHand: ["Off Hand Weapon"],
      armor: ["Plate"],
  },
  images: {
    avatar: 'https://cdn-icons-png.freepik.com/256/11748/11748483.png',
  },
};
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
  toast.success({
    component: ActiveMonsterAvatar,
    props: {
      monster: activeMonster,
      showNotes: true,
    },
  }, {timeout: false,});
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
  turnIndex.value = (turnIndex.value + diff);
};
const roundNumber = computed(() => {
  return 1 + Math.floor(turnIndex.value/InitiativeList.length);
})
const decrementTurn = () => {
  adjustTurn(-1);
};
const incrementTUrn = () => {
  const max = 20;
  let i = 0;
  let skipTurn: boolean = autoSkip.value;
  do {
    adjustTurn(1);
    switch (iList.value[0].type) {
      case InitiativeTypes.RUNE:
        skipTurn = false;
      case InitiativeTypes.MONSTER:
        skipTurn &&= monsterByInitiative(iList.value[0].index)?.length <= 0;
        break;
      case InitiativeTypes.HERO:
        skipTurn &&= getHero(iList.value[0]?.text) == null;
        break;
    }
  } while (skipTurn && ++i < max);
};
const getTokenCount = (initInfo: InitiativeInfo) => {
  return darknessTokens.value.filter(i => i.color == initInfo.color && i.isDrawn).length;
}
// #endregion

// #region darkness tiles bag popup
const isDarknessTokenBagOpen = ref(false);
// #endregion

// #region details popup
const detailsOpen = ref(false);
const detailsMonster = ref<ActiveMonsterData | null>(null);
function openDetails(monster: ActiveMonsterData) {
  detailsMonster.value = monster;
  detailsOpen.value = true;
}
function closeDetails() {
  detailsOpen.value = false;
}
function updateMonsterHp(monster: any): void {
  const _maxHp = prompt('Max HP', monster.maxHp.toString());
  if (_maxHp) {
    const maxHp = parseInt(_maxHp);
    if (!isNaN(maxHp)) {
      monster.maxHp = maxHp;
    }
  }
  const _hp = prompt('HP', monster.hp.toString());
  if (_hp) {
    const hp = parseInt(_hp);
    if (!isNaN(hp)) {
      monster.hp = hp;
    }
  }
  detailsMonster.value = updateHp(monster);
}
// #endregion
</script>

<template>
  <div class="grid place-items-center w-full">
    <!-- #region Action Buttons -->
    <div class="w-full flex sticky">
      <div class="flex justify-start">
        <BackwardIcon class="w-8 rounded-lg mx-1" @click="decrementTurn" />
        <div class="flex justify-center rounded-full text-2xl font-black border-2 w-8 p-1">{{ roundNumber }}</div>
        <ForwardIcon class="w-8 rounded-lg mx-1" @click="incrementTUrn" />
        <PlusIcon class="w-8 bg-slate-800 rounded-lg mx-1" @click="openMonsterPicker" />
        <ArrowPathIcon class="w-8 text-red-400 rounded-lg mx-1" @click="clearInitiative" />
      </div>
      <div class="ml-auto">
        <div class="w-full flex">
          <OnOffButton :flag="autoSkip" @click="autoSkip = !autoSkip" class="p-1 m-1">
            <RocketLaunchIcon class="w-8" />
          </OnOffButton>
          <OnOffButton :flag="autoConfirmDelete" @click="autoConfirmDelete = !autoConfirmDelete" class="p-1 m-1">
            <CheckCircleIcon class="w-8" />
          </OnOffButton>
          <OnOffButton :flag="useDefaultHp" @click="useDefaultHp = !useDefaultHp" class="p-1 m-1">
            <HeartIcon class="w-8" />
          </OnOffButton>
        </div>
      </div>
    </div>
    <!-- #endregion Action Buttons -->
    <BaseDivider>Initiative</BaseDivider>
    <!-- #region Initiative List -->
    <div container class="divide-y">
      <div v-for="initInfo in iList" :key="initInfo.index">
        <!-- Monster Initiatives -->
        <MonsterInitiative
          v-if="initInfo.type === InitiativeTypes.MONSTER"
          :turnImgUrl="initInfo.imgUrl"
          :monsters="monsterByInitiative(initInfo.index)"
          :tokenCount="getTokenCount(initInfo)"
          @openDetails="openDetails"
        />
        <!-- Hero Initiatives -->
        <div v-else-if="initInfo.type === InitiativeTypes.HERO" class="grid grid-cols-12 divide-y" id="initiative-container">
          <div v-if="getHero(initInfo.text) == null" class="col-span-11 col-start-2 text-4xl font-extrabold mb-4 flex">
            {{ initInfo.text }}
            <PlusIcon class="w-8 bg-slate-800 rounded-lg ml-4" @click="() => (dungeonRoleToPick = initInfo.text)" />
          </div>
          <div v-else class="col-span-11 col-start-2 text-4xl font-extrabold mb-4 flex">
            <img :src="getHero(initInfo.text)?.images?.avatar || ''" class="rounded-full w-16 h-16" />
            <div class="flex flex-row ml-4">
              {{ getHero(initInfo.text)?.name }}
              <MinusIcon class="w-8 h-8 bg-slate-800 rounded-lg ml-4 mt-2" @click="() => removeHero(initInfo.text)" />
            </div>
          </div>
        </div>
        <!-- Rune Initiative -->
        <div v-else-if="initInfo.type === InitiativeTypes.RUNE" class="grid grid-cols-12 divide-y" id="initiative-container">
          <div class="col-span-11 col-start-2 text-4xl font-extrabold mb-4 flex">
            RUNE: Draw {{ roundNumber % 2 === 1 ? 1 : 2 }} Tiles
            <ArrowUpCircleIcon class="w-8 bg-slate-800 rounded-lg ml-4" @click="() => isDarknessTokenBagOpen = true" />
          </div>
        </div>
      </div>
    </div>
    <!-- #endregion Initiative List -->
  </div>
  <!-- Pop-Ups -->
  <MonsterPicker @pick-monster="pickMonster" ref="monsterPickerRef" />
  <BaseModal
    title="Darkness Token Bag"
    :is-open="isDarknessTokenBagOpen"
    @close-modal="() => isDarknessTokenBagOpen = false">
    <DarknessTokenBag />
  </BaseModal>
  <BaseModal :is-open="dungeonRoleToPick != null" @close-modal="closeHeroPicker" title="Pick a Hero">
    <div class="container">
      <div class="grid grid-cols-3 gap-4">
        <div v-for="hero in heroData" :key="hero.name" class="flex flex-col items-center">
          <img :src="hero.images.avatar" class="rounded-full" @click="() => assignHero(hero)" />
          <div>{{ hero.name }}</div>
          <button @click="addHero(hero.name, hero)">Add</button>
        </div>
      </div>
    </div>
  </BaseModal>
  <BaseModal :is-open="detailsOpen" @close-modal="closeDetails" :title="`${detailsMonster?.name} (${detailsMonster?.baseColor})`">
    <template #default>
      <ActiveMonsterDetails :detailsMonster="detailsMonster" @close="closeDetails"
        @decrement-hp="(hp = -1) => {
          detailsMonster = decrementHp(detailsMonster, hp);
          if (!detailsMonster) {
            closeDetails();
          }
        }"
        @increment-hp="() => detailsMonster = incrementHp(detailsMonster)"
        @update-hp="() => updateMonsterHp(detailsMonster)"
        @remove-monster="() => {
          removeMonster(detailsMonster);
          closeDetails();
        }" />
    </template>
  </BaseModal>
</template>
