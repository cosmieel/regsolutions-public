<template>
  <div class="business-areas">
    <BusinessList class="mb-10" @select-business="getSelectedBusiness" />
    <UiButton :disabled="!selectedBusiness" @click="submitSelectedBusiness">Дальше</UiButton>
  </div>
</template>

<script setup>
import { UiButton } from 'account-ui';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import BusinessList from './business-list.vue';
import { useWizardStore } from '../../stores/wizard-store.js';

const wizardStore = useWizardStore();
const { selectedBusiness } = storeToRefs(wizardStore);
const router = useRouter();

const getSelectedBusiness = (business) => {
  selectedBusiness.value = business;
};

const submitSelectedBusiness = async () => {
  router.push({ name: 'wizardStepName' });
};
</script>

<style lang="postcss" scoped>
.business-areas {
  @apply relative mt-8;

  &:after {
    @apply bg-gradient-to-t from-white absolute left-[-12px] bottom-[80px] content-[''] w-[calc(100%+24px)] h-[56px];
  }
}
</style>
