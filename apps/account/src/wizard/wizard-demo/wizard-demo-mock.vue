<template>
  <figure class="wizard-demo-mock">
    <div class="wizard-demo-mock__head">
      <div class="wizard-demo-mock__circles">
        <span class="wizard-demo-mock__circle"></span>
        <span class="wizard-demo-mock__circle"></span>
        <span class="wizard-demo-mock__circle"></span>
      </div>
    </div>

    <div v-if="needControls" class="wizard-demo-mock__controls">
      <div class="wizard-demo-mock__nav">
        <UiIcon class="wizard-demo-mock__nav-icon" name="arrow-back" />
        <UiIcon class="wizard-demo-mock__nav-icon" name="arrow-right" />
        <UiIcon class="wizard-demo-mock__nav-icon" name="retry" />
      </div>
      <div class="wizard-demo-mock__url">
        <input
          v-model.trim="wizardStore.wizardResult.domain"
          type="text"
          class="wizard-demo-mock__url-input"
          placeholder="Домен"
          readonly
          maxlength="150"
        />
      </div>
    </div>

    <div class="wizard-demo-mock__content">
      <slot></slot>
    </div>
  </figure>
</template>

<script setup>
import { UiIcon } from 'account-ui';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useWizardStore } from '../stores/wizard-store.js';

const wizardStore = useWizardStore();

const route = useRoute();

const needControls = computed(() => {
  return route.name !== 'wizardStepBusiness';
});
</script>

<style lang="postcss" scoped>
.wizard-demo-mock {
  @apply relative w-full h-auto border border-gray-200 rounded-lg shadow-[2px_2px_4px_0px_rgba(46_64_100_/_4%)] overflow-hidden;

  &__head {
    @apply relative flex items-center bg-gray-100 rounded-t-lg p-3;
  }

  &__circles {
    @apply flex space-x-[6px];
  }

  &__circle {
    @apply w-[0.55rem] h-[0.55rem] bg-white rounded-full;
  }

  &__controls {
    @apply flex items-center p-4 border-b border-gray-200;
  }

  &__nav {
    @apply flex items-center pr-2 space-x-2 text-gray-200;

    &-icon {
      @apply w-4 h-4;
    }
  }

  &__url {
    @apply w-full;
  }

  &__url-input {
    @apply py-[10px] px-4 w-full border border-gray-200 bg-gray-50 rounded-full text-sm leading-none;

    &:focus {
      @apply border-gray-200 outline-none ring-1 ring-gray-100;
    }
  }
}
</style>
