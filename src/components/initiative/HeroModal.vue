<script setup lang="ts">
import { ref } from "vue";
import BaseModal from "@/components/BaseModal.vue";
import BaseDividerAlt from "@/components/BaseDividerAlt.vue";
import CampaignLogStatus from "@/components/CampaignLogStatus.vue";
import CampaignLogOutcome from "@/components/CampaignLogOutcome.vue";
import CampaignLogAura from "@/components/CampaignLogAura.vue";
import CampaignHeroItems from "@/components/CampaignHeroItems.vue";
import CampaignHeroStash from "@/components/CampaignHeroStash.vue";
import CampaignHeroSkills from "@/components/CampaignHeroSkills.vue";
import CampaignHeroClassAbilities from "@/components/CampaignHeroClassAbilities.vue";

import { CampaignLogStatusRepository as CoreStatusRepo } from "@/data/repository/campaign/core/CampaignLogStatusRepository";
import { CampaignLogAuraRepository as CoreAuraRepo } from "@/data/repository/campaign/core/CampaignLogAuraRepository";
import { CampaignLogOutcomeRepository as CoreOutcomeRepo } from "@/data/repository/campaign/core/CampaignLogOutcomeRepository";
import { CampaignLogStatusRepository as ApocStatusRepo } from "@/data/repository/campaign/apocalypse/CampaignLogStatusRepository";
import { CampaignLogAuraRepository as ApocAuraRepo } from "@/data/repository/campaign/apocalypse/CampaignLogAuraRepository";
import { CampaignLogOutcomeRepository as ApocOutcomeRepo } from "@/data/repository/campaign/apocalypse/CampaignLogOutcomeRepository";
import { CampaignLogStatusRepository as AwakeStatusRepo } from "@/data/repository/campaign/awakenings/CampaignLogStatusRepository";
import { CampaignLogAuraRepository as AwakeAuraRepo } from "@/data/repository/campaign/awakenings/CampaignLogAuraRepository";

import type { StatusRepository } from "@/data/repository/campaign/StatusRepository";
import type { AuraRepository } from "@/data/repository/campaign/AuraRepository";
import type { OutcomeRepository } from "@/data/repository/campaign/OutcomeRepository";
import { UnrestrictedItemDataRepository } from "@/data/repository/campaign/UnrestrictedItemDataRepository";
import { CampaignStore } from "@/store/CampaignStore";
import type { HeroData } from "@/data/repository/HeroData";

const props = defineProps<{
  isOpen: boolean;
  heroId: string;
  campaignId: string;
  heroData: HeroData;
}>();

const emit = defineEmits<{ (e: "close"): void }>();

const campaignType = CampaignStore().find(props.campaignId).campaign;

let statusRepository: StatusRepository;
let auraRepository: AuraRepository;
let outcomeRepository: OutcomeRepository | null = null;

if (campaignType === "core") {
  statusRepository = new CoreStatusRepo();
  auraRepository = new CoreAuraRepo();
  outcomeRepository = new CoreOutcomeRepo();
} else if (campaignType === "apocalypse") {
  statusRepository = new ApocStatusRepo();
  auraRepository = new ApocAuraRepo();
  outcomeRepository = new ApocOutcomeRepo();
} else {
  statusRepository = new AwakeStatusRepo();
  auraRepository = new AwakeAuraRepo();
}

const itemRepository = new UnrestrictedItemDataRepository();

type Tab = "status" | "equipment" | "skills";
const activeTab = ref<Tab>("status");

const stashKey = ref(0);
</script>

<template>
  <BaseModal :is-open="isOpen" @close-modal="emit('close')" :title="heroData.name">
    <template #header>
      <img :src="heroData.images.avatar" class="rounded-full w-8 h-8 ml-2" />
    </template>

    <div class="flex gap-2 mb-4">
      <button
        v-for="tab in (['status', 'equipment', 'skills'] as Tab[])"
        :key="tab"
        @click="activeTab = tab"
        class="px-3 py-1 rounded-lg text-sm font-semibold capitalize"
        :class="activeTab === tab ? 'bg-sky-800 text-sky-200' : 'bg-slate-700 text-gray-400 hover:text-gray-200'"
      >
        {{ tab }}
      </button>
    </div>

    <div v-if="activeTab === 'status'">
      <BaseDividerAlt>Status</BaseDividerAlt>
      <CampaignLogStatus :repository="statusRepository" :hero-id="heroId" :campaign-id="campaignId" />
      <template v-if="outcomeRepository">
        <BaseDividerAlt>Outcomes</BaseDividerAlt>
        <CampaignLogOutcome :repository="outcomeRepository" :hero-id="heroId" :campaign-id="campaignId" />
      </template>
      <BaseDividerAlt>Aura</BaseDividerAlt>
      <CampaignLogAura :repository="auraRepository" :hero-id="heroId" :campaign-id="campaignId" />
    </div>

    <div v-if="activeTab === 'equipment'">
      <BaseDividerAlt>Equipment</BaseDividerAlt>
      <CampaignHeroItems
        :hero-id="heroId"
        :campaign-id="campaignId"
        :hero="heroData"
        :repository="itemRepository"
        @stash="stashKey++"
      />
      <BaseDividerAlt>Stash</BaseDividerAlt>
      <CampaignHeroStash :hero-id="heroId" :campaign-id="campaignId" :repository="itemRepository" :key="stashKey" />
    </div>

    <div v-if="activeTab === 'skills'">
      <BaseDividerAlt>Skills</BaseDividerAlt>
      <CampaignHeroSkills :hero-id="heroId" :campaign-id="campaignId" />
      <BaseDividerAlt>Class Abilities</BaseDividerAlt>
      <CampaignHeroClassAbilities :hero-id="heroId" :campaign-id="campaignId" />
    </div>
  </BaseModal>
</template>
