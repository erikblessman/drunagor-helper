<script setup lang="ts">
import { ref } from "vue";
import { HeroStore } from "@/store/HeroStore";
import BaseList from "@/components/BaseList.vue";
import BaseListItem from "@/components/BaseListItem.vue";
import { useI18n } from "vue-i18n";
import { CheckIcon, XMarkIcon } from "@heroicons/vue/20/solid";

const heroStore = HeroStore();

const props = defineProps<{
  heroId: string;
  campaignId: string;
}>();

const { t } = useI18n();

const hero = heroStore.findInCampaign(props.heroId, props.campaignId);
if (!hero.classAbilities) hero.classAbilities = [];

const newAbility = ref<string>('');
const showForm = ref<boolean>(false);

function addNewAbility(): void {
    hero.classAbilities = [...hero.classAbilities, newAbility.value];
    showForm.value = false;
}

function removeAbility(ability:string): void {
    hero.classAbilities = hero.classAbilities.filter(a => a != ability);
}
</script>

<template>
  <div class="w-full abilities-container">
    <BaseList>
        <template v-for="ability in hero.classAbilities" :key="ability">
            <BaseListItem>
                <XMarkIcon class="float-right size-5" @click="() => removeAbility(ability)" />
                {{ ability }}
            </BaseListItem>
        </template>
    </BaseList>
    <div v-if="showForm" class="rounded-lg flex bg-base-100 items-center">
        <input type="text" v-model="newAbility" class="w-full bg-base-100 border-0 focus:ring-0" />
        <CheckIcon class="size-5 mx-2 float-right"  @click="addNewAbility"/>
    </div>
    <div v-else>
        <button
            class="px-3 py-3 border-2 border-base-500 bg-base-100 text-gray-200 uppercase font-semibold text-sm rounded-lg"
            @click="() => showForm = true"
        >
            {{ t("label.add-class-ability") }}
        </button>
    </div>
  </div>
</template>

<style scoped>
</style>
