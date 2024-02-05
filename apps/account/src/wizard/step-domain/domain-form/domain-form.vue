<template>
  <form class="domain-form" @submit.prevent>
    <div class="domain-form__input-wrapper">
      <UiInput
        v-model.trim="domain"
        class="domain-form__input"
        :type="'text'"
        :placeholder="'Домен'"
        :trailing="'.regsolutions.site'"
        :error-message="domainValidationErrorMessage"
        :max-length="'63'"
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
import { UiButton, UiInput } from 'account-ui';
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
