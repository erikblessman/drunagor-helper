<script setup lang="ts">

// #region external imports-------------------------------------------------------------------------
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
// #endregion

// #region internal imports ------------------------------------------------------------------------
import { INITIATIVE_TRACK, TOKEN_BAG, type IToken } from "@/data/initiative/DarknessTokens";
import { InitiativeColors } from "@/data/initiative/InitiativePlaces";
import { useInitiativeStore } from "@/store/InitiativeStore";
import { ArrowRightIcon } from "@heroicons/vue/24/solid";
import { computed, ref } from "vue";
import { times } from "lodash-es";
// #endregion

// #region store bindings --------------------------------------------------------------------------
const { darknessTokens } = storeToRefs(useInitiativeStore());
// #endregion

const toast = useToast();

// #region functions -------------------------------------------------------------------------------
function getTokenColor(color: InitiativeColors): string {
  switch (color) {
    case InitiativeColors.BLUE:
      return "blue";
    case InitiativeColors.ORANGE:
      return "darkorange";
    case InitiativeColors.GRAY:
      return "dimgray";
    case InitiativeColors.GREEN:
      return "green";
    case InitiativeColors.RED:
      return "red";
    default:
      return "pink";
  }
}

function drawToken() {
  const candidateList = darknessTokens.value.filter(t => (t.label == fromSet.value && [t.color, ''].includes(currentColor.value)));
  if (candidateList.length === 0) {
    toast.error(`No more ${currentColor.value ? currentColor.value + ' ' : ''}tokens in ${fromSet.value || TOKEN_BAG}`);
  } else {
    candidateList[0].label = toSet.value || INITIATIVE_TRACK;
    candidateList[0].timestamp = timestamp.value;
  }
}
// #endregion

const timestamp = ref<number>(Date.now());
const tokenSets = computed(() => {
  const acc: Map<string, IToken[]> = new Map<string, IToken[]>();
  darknessTokens.value.reduce((acc, token: IToken) => {
    const label = token.label;
    if (token.label === '') {
      return acc;
    }
    const tokenList: IToken[] | undefined = acc.get(label);
    if (!tokenList) {
      acc.set(label, [token]);
    } else {
      tokenList.unshift(token);
    }
    return acc;
  }, acc);
  return acc;
});

function colorSets(tokenSet: IToken[]) {
  const acc: Map<InitiativeColors, IToken[]> = new Map<InitiativeColors, IToken[]>();
  tokenSet.reduce((acc, token) => {
    const tokenList: IToken[] | undefined = acc.get(token.color);
    if (!tokenList) {
      acc.set(token.color, [token]);
    } else {
      tokenList.push(token);
    }
    return acc;
  }, acc);
}

const fromSet = ref<string>('');
const toSet = ref<string>('');
const currentColor = ref<string>('');

function setColor(color: InitiativeColors | '') {
  if (currentColor.value === color) {
    currentColor.value = '';
  } else {
    currentColor.value = color;
  }
}

function getSortHash(token: IToken): number {
  return {
    [InitiativeColors.ORANGE]: 1,
    [InitiativeColors.GREEN]: 2,
    [InitiativeColors.BLUE]: 3,
    [InitiativeColors.RED]: 4,
    [InitiativeColors.GRAY]: 5,
  }[token.color] - (token.timestamp === timestamp.value ? 5 : 0);
}

function tokenSort(a: IToken, b: IToken): number {
  return getSortHash(a) - getSortHash(b);
}
</script>

<template>
  <div class="container">
    <div class="w-full flex pb-4 space-x-2">
      <div class="grow">
        <select
          v-model="fromSet"
          name="from-set"
          id="from-set"
          class="bg-base-100 w-full focus:ring-0 rounded-lg self-center"
        >
          <option v-for="label in new Set(darknessTokens.map(t => t.label))" :value="label" :key="label || 'darkness-bag'">
            {{ label || 'Token Bag' }}
          </option>
        </select>
      </div>
      <button type="button">
        <ArrowRightIcon class="h-8 self-center" @click="() => drawToken()" />
      </button>
      <div class="grow self-center rounded-lg text-left">
        <input :placeholder="INITIATIVE_TRACK" type="text" id="to-set" v-model="toSet" class="w-full bg-base-100 focus:ring-0 rounded-lg self-center" />
      </div>
    </div>
    <div class="flex space-x-2 w-full">
      <div v-for="color in InitiativeColors"
        :style="{
          backgroundColor: color,
          border: color === currentColor ? '2px solid white' : ''
        }"
        @click="() => setColor(color)"
        class="grow h-8">&nbsp;</div>
    </div>
    <div v-for="[label, tokenList] in tokenSets"class='p-3 border border-base-500 relative mt-4 rounded-lg'>
      <h2 class="absolute -top-5 translate-y-1 bg-base-100 px-2">{{ label  }} ({{ tokenList.length }})</h2>
      <div class="grid grid-flow-cols grid-cols-4 gap-4">
        <div v-for="token in tokenList.sort(tokenSort)"
          :style="{
            backgroundColor: getTokenColor(token.color),
            borderColor: token.timestamp === timestamp ? 'white' : 'black',
          }"
          class="border-4 p-4 rounded-full flex flex-col items-center">
          <img :src="token.image" @click="() => token.label = ''"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
