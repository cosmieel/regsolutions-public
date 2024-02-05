<template>
  <UiButton is-outline is-button-icon size="small" @click="handleCloseClick">
    <UiIcon name="close" :size="16" class="flex-none" />
  </UiButton>
</template>

<script setup>
import { UiButton, UiIcon } from 'account-ui';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useWizardStore } from '../../wizard/stores/wizard-store.js';
import { callDiscardCreationModal } from '../modals/discard-creation-modal.js';

const router = useRouter();

const wizardStore = useWizardStore();

const hasAnyValue = computed(() => wizardStore.hasAnyValue);

const onWizardExit = () => {
  wizardStore.$reset();

  router.push({
    name: 'accountMain',
  });
};

const handleCloseClick = () => {
  if (hasAnyValue.value && !wizardStore.isCompleted) {
    callDiscardCreationModal(onWizardExit);
  } else {
    onWizardExit();
  }
};
</script>
