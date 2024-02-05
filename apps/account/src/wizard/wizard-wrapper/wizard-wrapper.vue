<template>
  <div class="wizard-wrapper">
    <div v-if="!isSuccessStep" class="wizard-wrapper__controls">
      <router-link
        :to="{ path: `/wizard/${routeBack}` }"
        :class="{ 'pointer-events-none text-gray-300': isBackButtonDisabled }"
      >
        <span class="wizard-wrapper__controls-button">
          <UiIcon name="chevron-m-left" :size="16" />
        </span>
      </router-link>
      <span class="wizard-wrapper__controls-counter"> {{ getCurrentStep }}/6 </span>
      <router-link
        :to="{ path: `/wizard/${routeForward}` }"
        :class="{
          'pointer-events-none text-gray-300': isForwardButtonDisabled,
        }"
      >
        <span class="wizard-wrapper__controls-button">
          <UiIcon name="chevron-m-right" :size="16" />
        </span>
      </router-link>
    </div>

    <UiTitle v-if="needTitle" class="wizard-wrapper__title">
      <slot name="step-title"></slot>
    </UiTitle>
    <p v-if="needDescription" class="wizard-wrapper__description">
      <slot name="step-description"></slot>
    </p>

    <div class="wizard-wrapper__content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { UiIcon, UiTitle } from 'account-ui';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useWizardStore } from '../stores/wizard-store.js';

const wizardStore = useWizardStore();
const { selectedBusiness, domain, color, isLogoUploading } = storeToRefs(wizardStore);

defineProps({
  needTitle: {
    type: Boolean,
    default: true,
  },

  needDescription: {
    type: Boolean,
    default: true,
  },
});

const route = useRoute();

const getCurrentStep = computed(() => {
  const path = route.path.split('/').at(-1);

  return path;
});

const routeBack = computed(() => {
  return Number(getCurrentStep.value) - 1;
});

const routeForward = computed(() => {
  return Number(getCurrentStep.value) + 1;
});

const isBackButtonDisabled = computed(() => {
  return Number(getCurrentStep.value) === 1;
});
const isForwardButtonDisabled = computed(() => {
  let isDisabled;

  switch (getCurrentStep.value) {
    case '1': {
      isDisabled = !selectedBusiness.value;
      break;
    }
    case '3': {
      isDisabled = !domain.value;
      break;
    }
    case '4': {
      isDisabled = isLogoUploading.value;

      break;
    }
    case '5': {
      isDisabled = !color.value;
      break;
    }
    case '6': {
      isDisabled = true;
      break;
    }
  }

  return isDisabled;
});

const isSuccessStep = computed(() => {
  return route.name === 'wizardStepSuccess';
});
</script>

<style lang="postcss" scoped>
.wizard-wrapper {
  @apply w-full text-center;

  &__controls {
    @apply flex text-center pb-4 flex items-center justify-center;

    &-button {
      @apply w-8 h-8 rounded-lg flex items-center justify-center;

      &:hover {
        @apply bg-gray-100;
      }
    }

    &-counter {
      @apply px-1;
    }
  }

  &__title {
    @apply pb-2;
  }

  &__description {
    @apply text-sm text-gray-500 pb-10 leading-6;
  }
}
</style>
