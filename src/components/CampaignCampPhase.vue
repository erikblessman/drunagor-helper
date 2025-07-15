<script setup lang="ts">
import { ref } from "vue";
import BaseModal from "@/components/BaseModal.vue";
import { XMarkIcon } from "@heroicons/vue/24/solid";
import { CampaignStore } from "@/store/CampaignStore";
import { HeroStore } from "@/store/HeroStore";
import { useI18n } from "vue-i18n";

const emit = defineEmits(["campPhase"]);
const { t } = useI18n();

const isOpen = ref(false);
const campaignStore = CampaignStore();
const heroStore = HeroStore();

function openModal() {
  isOpen.value = true;
}
function closeModal() {
  isOpen.value = false;
}

const props = defineProps<{
  campaignId: string;
}>();

function campPhase() {
  const campaign = campaignStore.find(props.campaignId);
  campaign.statusIds = [];
  campaign.isSequentialAdventure = false;
  campaign.sequentialAdventureRunes = 0;

  heroStore.findAllInCampaign(props.campaignId).forEach((hero) => {
    hero.statusIds = [];
    hero.sequentialAdventureState = null;
  });
  closeModal();
  emit("campPhase");
}
</script>

<template>
  <button
    id="camp-phase"
    class="px-3 py-3 bg-neutral text-gray-200 uppercase font-semibold text-sm rounded-lg"
    @click="openModal"
  >
    {{ t("label.camp-phase") }}
  </button>
  <BaseModal title="Camp Phase" :is-open="isOpen" @close-modal="closeModal">
    <template #default>
      <div class="py-4">
        This will reset all statuses and sequential adventure states from this campaign. Are you sure?
      </div>
      <div class="flex flex-wrap justify-center gap-4">
        <button
          id="confirm-camp-phase"
          class="px-2 py-2 bg-neutral text-gray-200 uppercase font-semibold text-sm rounded-lg"
          @click="campPhase"
        >
          Yes
        </button>
        <button
          id="close-modal"
          class="px-2 py-2 bg-neutral text-gray-200 uppercase font-semibold text-sm rounded-lg"
          @click="closeModal"
        >
          No
        </button>
      </div>
    </template>
  </BaseModal>
</template>

<style scoped></style>
