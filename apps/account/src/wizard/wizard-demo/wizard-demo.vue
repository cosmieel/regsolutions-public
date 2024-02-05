<template>
  <WizardDemoMock>
    <div v-if="needLending" class="wizard-template">
      <div class="wizard-template__image">
        <img src="../../assets/images/wizard-lending.jpeg" alt="" />
      </div>
    </div>
    <div v-else class="wizard-mock">
      <div class="wizard-mock__header">
        <div class="wizard-mock__logo-block">
          <div v-if="wizardStore.wizardResult.logo" class="wizard-mock__logo">
            <img
              v-if="wizardStore.wizardResult.logo"
              :src="
                wizardStore.logoUri
                  ? wizardStore.logoUri
                  : fullImageSource(wizardStore.wizardResult.logo, wizardStore.currentImagesStorage)
              "
              class="max-h-[100px] max-w-[70px]"
            />
          </div>
          <div v-else class="wizard-mock__logo-skeleton"></div>
        </div>
        <div class="wizard-mock__button-block">
          <UiButton
            v-if="wizardStore.wizardResult.color"
            class="wizard-mock__button transition-none"
            :style="{ 'background-color': wizardStore.wizardResult.color }"
          >
            Написать
          </UiButton>
          <span v-else class="wizard-mock__button-skeleton"></span>
        </div>
      </div>

      <div class="wizard-mock__hero">
        <img src="../../assets/images/wizard-demo.jpeg" alt="" />
      </div>

      <div class="wizard-mock__name-block">
        <input
          v-if="wizardStore.wizardResult.name"
          v-model.trim="wizardStore.wizardResult.name"
          class="wizard-mock__name"
          type="text"
          readonly
          maxlength="100"
        />
        <span v-else class="wizard-mock__name-skeleton"></span>
      </div>

      <div class="wizard-mock__description-block">
        <textarea
          v-if="wizardStore.wizardResult.description"
          v-model="wizardStore.wizardResult.description"
          type="text"
          class="wizard-mock__description"
          readonly
        ></textarea>
        <ul v-else class="wizard-mock__description-skeleton">
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  </WizardDemoMock>
</template>

<script setup>
import { UiButton } from 'account-ui';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import WizardDemoMock from './wizard-demo-mock.vue';
import { fullImageSource } from '../../components/composables/full-image-source.js';
import { useWizardStore } from '../stores/wizard-store.js';

const wizardStore = useWizardStore();

const route = useRoute();

const needLending = computed(() => {
  return route.name === 'wizardStepBusiness';
});
</script>

<style lang="postcss" scoped>
.wizard-mock {
  &__header {
    @apply flex items-center justify-between px-5 py-[9px] shadow-[0px_2px_7px_0px_rgba(43_45_51_/_8%)];
  }

  &__logo-skeleton {
    @apply w-[38px] h-[38px] block bg-gray-100 rounded-full;
  }

  &__button-block {
    @apply max-w-[65px];
  }

  &__button {
    @apply text-[8px] leading-[10px] border-none px-3.5 py-[7.5px] rounded-sm;
  }

  &__button-skeleton {
    @apply block w-[65px] h-[25px] bg-gray-100 rounded-sm;
  }

  &__hero {
    @apply pb-12 text-center;
  }

  &__name-block {
    @apply pb-6;
  }

  &__name {
    @apply block w-full mx-auto border-none outline-none text-center text-xl font-bold text-gray-700 py-0;

    &:focus {
      @apply outline-none border-none ring-0;
    }
  }

  &__name-skeleton {
    @apply block w-full max-w-[160px] h-7 bg-gray-100 rounded mx-auto;
  }

  &__description-block {
    @apply overflow-auto;
  }

  &__description {
    @apply block w-full h-[164px] px-[60px] mx-auto border-none outline-none resize-none text-center text-sm leading-6 text-gray-600 py-0;

    &:focus {
      @apply outline-none border-none ring-0;
    }
  }

  &__description-skeleton {
    @apply space-y-2 p-16 pt-0 pb-[100px];

    li {
      @apply w-full h-4 bg-gray-100 rounded mx-auto;

      &:last-child {
        @apply max-w-[160px];
      }
    }
  }
}
</style>
