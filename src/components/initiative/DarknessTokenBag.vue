<script setup lang="ts">
// #region external imports-------------------------------------------------------------------------
import { storeToRefs } from "pinia";
// #endregion

// #region internal imports ------------------------------------------------------------------------
import { BlankToken, type IToken } from "@/data/initiative/DarknessTokens";
import { InitiativeColors } from "@/data/initiative/InitiativePlaces";
import { useInitiativeStore } from "@/store/InitiativeStore";
// #endregion

// #region store bindings --------------------------------------------------------------------------
const { darknessTokens } = storeToRefs(useInitiativeStore());
// #endregion


// #region functions -------------------------------------------------------------------------------
function getTokenColor(token: IToken): string {
  if (!token.isDrawn) {
    return "black";
  }
  switch (token.color) {
    case InitiativeColors.BLUE:
      return "blue";
    case InitiativeColors.ORANGE:
      return "orange";
    case InitiativeColors.GRAY:
      return "gray";
    case InitiativeColors.GREEN:
      return "green";
    case InitiativeColors.RED:
      return "red";
    default:
      return "pink";
  }
}

function drawToken(token: IToken) {
  token.isDrawn = !token.isDrawn;
}
// #endregion
</script>

<template>
  <div class="container">
    <div class="grid grid-cols-3 gap-4">
      <div v-for="token in darknessTokens" :key="token.color + '|' + token.image" class="border-4 p-8 rounded-full flex flex-col items-center"
      :style="{backgroundColor: getTokenColor(token)}" >
        <img :src="token.isDrawn?token.image:BlankToken" @click="() => drawToken(token)" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
