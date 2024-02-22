<template>
  <form class="domain-form" @submit.prevent>
    <div class="domain-form__input-wrapper">
      <DomainInput
        v-model.trim="domain"
        class="domain-form__input"
        :error-message="domainValidationErrorMessage"
        @keyup.enter="validateDomain"
      />
    </div>
    <UiButton
      :disabled="!domain || isValidatePending"
      :pending="isValidatePending"
      @click="validateDomain"
    >
      Дальше
    </UiButton>
  </form>
</template>

<script setup>
import DomainInput from 'account/src/components/text-fields/domain-input.vue';
import { UiButton } from 'account-ui';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useWizardStore } from '../../stores/wizard-store.js';

const wizardStore = useWizardStore();
const { domain, domainValidationErrorMessage } = storeToRefs(wizardStore);

const isValidatePending = ref(false);

const validateDomain = async () => {
  isValidatePending.value = true;
  await wizardStore.validateDomainRequest();
  isValidatePending.value = false;
};
</script>

<style lang="postcss" scoped>
.domain-form {
  &__input-wrapper {
    @apply relative mb-10;
  }
}
</style>
