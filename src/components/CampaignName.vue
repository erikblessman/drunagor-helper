<script setup lang="ts">
import { CampaignStore } from "@/store/CampaignStore";
import { ref, watch } from "vue";

const props = defineProps<{
  campaignId: string;
}>();

const campaignStore = CampaignStore();
const campaign = campaignStore.find(props.campaignId);
const name = ref(campaign.name);
const notes = ref(campaign.notes);

watch(name, async (newName) => {
  campaignStore.find(props.campaignId).name = newName;
});

watch(notes, async (newNotes) => {
  campaignStore.find(props.campaignId).notes = newNotes;
})
</script>

<template>
  <div class="p-4 grid gap-2">
    <span class="w-48">Party name:</span>
    <input type="text" id="campaign-log-name" v-model="name" class="w-full bg-base-100 focus:ring-0 rounded-lg" />
  </div>
  <div class="p-4 grid gap-2">
    <span class="w-48">Notes:</span>
    <input type="text" id="campaign-log-name" v-model="notes" class="w-full bg-base-100 focus:ring-0 rounded-lg" />
  </div>
</template>

<style scoped></style>
