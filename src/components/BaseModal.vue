<script setup lang="ts">
import { ref, toRef, watch } from "vue";
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle, DialogOverlay } from "@headlessui/vue";

import { XMarkIcon } from "@heroicons/vue/24/solid";

const props = defineProps<{
  isOpen: boolean;
  title?: string;
}>();

const emit = defineEmits(["close-modal"]);

const state = ref(false);
const isOpen = toRef(props, "isOpen");

state.value = isOpen.value;

watch(isOpen, async (value: boolean) => {
  state.value = value;
});

function setIsOpen(value: boolean) {
  state.value = value;
  emit("close-modal");
}
</script>

<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog :open="isOpen" @close="setIsOpen(false)" as="div" class="relative z-10">
      <DialogOverlay class="fixed inset-0 bg-black bg-opacity-60 backdrop-blur" />

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex h-full p-4 justify-center items-center">
          <TransitionChild
            as="template"
            enter="duration-200 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
          >
            <DialogPanel
              class="bg-base-300 w-full max-w-xl h-full lg:h-5/6 transform overflow-x-hidden overflow-y-auto rounded-2xl text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle class="sticky top-0 py-1 px-4 bg-base-300 z-50">
                <div class="flex justify-between">
                  <div v-if="title" class="font-medium text-nowrap mr-4">
                    {{ title }}
                  </div>
                  <slot name="header"> </slot>
                  <button
                    id="close-modal"
                    class="ml-4 px-2 py-2 bg-neutral text-gray-200 uppercase font-semibold text-sm rounded-lg"
                    @click="() => emit('close-modal')"
                  >
                    <XMarkIcon class="h-5 bg-neutral text-gray-200 uppercase font-semibold text-sm rounded-lg" />
                  </button>
                </div>
              </DialogTitle>
              <div class="container px-4 bg-base-400 pt-4">
                <slot></slot>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style scoped></style>
