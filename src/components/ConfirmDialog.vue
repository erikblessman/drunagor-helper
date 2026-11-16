<script setup lang="ts">
import BaseModal from "@/components/BaseModal.vue";
import { confirmDialogState as state, resolveConfirmDialog } from "@/composables/useConfirmDialog";
</script>

<template>
  <BaseModal :is-open="state.open" :title="state.title" @close-modal="resolveConfirmDialog(false)">
    <div class="flex flex-col gap-4 py-2">
      <div class="text-center text-lg whitespace-pre-line">{{ state.message }}</div>
      <div class="grid grid-cols-2 gap-3">
        <button class="rounded-xl font-bold py-3 bg-slate-600 text-white" @click="resolveConfirmDialog(false)">
          {{ state.cancelText }}
        </button>
        <button
          class="rounded-xl font-bold py-3"
          :class="state.danger ? 'bg-red-600 text-white' : 'bg-primary text-black'"
          @click="resolveConfirmDialog(true)"
        >
          {{ state.confirmText }}
        </button>
      </div>
    </div>
  </BaseModal>
</template>
