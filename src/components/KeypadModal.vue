<script setup lang="ts">
import { ref, watch } from "vue";
import BaseModal from "@/components/BaseModal.vue";

const props = defineProps<{
  isOpen: boolean;
  title?: string;
  initialValue?: number;
}>();

const emit = defineEmits<{
  close: [];
  confirm: [value: number];
}>();

const inputValue = ref("");

watch(
  [() => props.isOpen, () => props.initialValue],
  ([open]) => {
    if (open) {
      inputValue.value = props.initialValue?.toString() ?? "";
    }
  }
);

function pressDigit(d: string) {
  if (inputValue.value === "0") {
    inputValue.value = d;
  } else {
    inputValue.value += d;
  }
}

function pressClear() {
  inputValue.value = "";
}

const canConfirm = () => inputValue.value.length > 0 && !isNaN(parseInt(inputValue.value));

function pressConfirm() {
  if (!canConfirm()) return;
  emit("confirm", parseInt(inputValue.value));
}
</script>

<template>
  <BaseModal :is-open="isOpen" :title="title" @close-modal="emit('close')">
    <div class="flex flex-col items-center gap-4 py-4">
      <div class="w-full bg-base-300 rounded-xl text-center text-5xl font-bold py-4 tracking-widest min-h-[4.5rem]">
        {{ inputValue || "0" }}
      </div>

      <div class="grid grid-cols-3 gap-3 w-full">
        <button
          v-for="d in ['1','2','3','4','5','6','7','8','9']"
          :key="d"
          class="bg-base-200 rounded-xl text-3xl font-bold py-5 active:opacity-60"
          @click="pressDigit(d)"
        >
          {{ d }}
        </button>

        <button class="bg-base-200 rounded-xl text-3xl font-bold py-5 active:opacity-60" @click="pressClear">
          C
        </button>

        <button class="bg-base-200 rounded-xl text-3xl font-bold py-5 active:opacity-60" @click="pressDigit('0')">
          0
        </button>

        <button
          class="rounded-xl text-3xl font-bold py-5 active:opacity-60"
          :class="canConfirm() ? 'bg-primary text-black' : 'bg-base-200 opacity-30 cursor-not-allowed'"
          :disabled="!canConfirm()"
          @click="pressConfirm"
        >
          ✓
        </button>
      </div>
    </div>
  </BaseModal>
</template>
