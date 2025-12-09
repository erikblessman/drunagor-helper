<script setup lang="ts">

// #region external imports-------------------------------------------------------------------------
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
// #endregion

// #region internal imports ------------------------------------------------------------------------
import { INITIATIVE_TRACK, TOKEN_BAG, type IToken } from "@/data/initiative/DarknessTokens";
import { InitiativeColors } from "@/data/initiative/InitiativePlaces";
import { useInitiativeStore } from "@/store/InitiativeStore";
import { ArrowRightIcon, ArrowUpOnSquareIcon } from "@heroicons/vue/24/solid";
import { computed, ref } from "vue";
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
  }
}
// #endregion

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
      tokenList.push(token);
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

let fromSet = ref('');
let toSet = ref('');

let currentColor = ref('');
function setColor(color: InitiativeColors | '') {
  if (currentColor.value === color) {
    currentColor.value = '';
  } else {
    currentColor.value = color;
  }
}
</script>

<template>
  <div class="container">
    <div class="w-full flex pb-4 space-x-2">
      <button type="button">
        <ArrowUpOnSquareIcon class="h-12" @click="() => drawToken()" />
      </button>
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
      <ArrowRightIcon class="h-8 self-center" />
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
        <div v-for="token in tokenList" :style="{backgroundColor: getTokenColor(token.color)}" class="border-4 p-4 rounded-full flex flex-col items-center">
          <img :src="token.image" :data-token="JSON.stringify(token)" @click="() => token.label = ''"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
