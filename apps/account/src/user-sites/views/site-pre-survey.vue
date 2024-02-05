<template>
  <section class="site-pre-survey">
    <div class="site-pre-survey__inner">
      <PreSurvey>
        <template #pre-survey-title>Как вы хотите создать сайт?</template>
        <template #pre-survey-cards>
          <UiSmallCard
            :is-card-selected="selectedSiteMakingWay === 'constructor'"
            :icon-name="'supplies'"
            :icon-bg="'bg-blue-50'"
            :icon-fill="'text-blue-500'"
            :title="'Самостоятельно'"
            @click="selectSiteMakingWay('constructor')"
          />
          <UiSmallCard
            :is-card-selected="selectedSiteMakingWay === 'wizard'"
            :icon-name="'magic-wound'"
            :icon-bg="'bg-violet-100'"
            :icon-fill="'text-violet-500'"
            :title="'Через обучение'"
            @click="selectSiteMakingWay('wizard')"
          />
        </template>
      </PreSurvey>

      <div class="site-pre-survey__buttons">
        <router-link :to="{ name: 'accountMain' }" class="block">
          <UiButton class="site-pre-survey__button" is-outline>Назад</UiButton>
        </router-link>
        <router-link
          v-slot="{ route, navigate }"
          custom
          :to="{ name: setNextButtonRoute }"
          class="block"
          :class="{ 'pointer-events-none': !selectedSiteMakingWay }"
        >
          <UiButton
            class="site-pre-survey__button"
            :disabled="isNextButtonDisabled || !selectedSiteMakingWay"
            @click="handleNext(route, navigate)"
          >
            Дальше
          </UiButton>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { UiButton, UiSmallCard } from 'account-ui';
import { computed, ref } from 'vue';
import { useWizardStore } from '../../wizard/stores/wizard-store.js';
import PreSurvey from '../pre-survey/pre-survey.vue';

const wizardStore = useWizardStore();

const handleNext = async (event, navigate) => {
  if (event.name !== 'accountMain') {
    navigate(event);

    return;
  }

  isNextButtonDisabled.value = true;

  await wizardStore.createSiteByYourself(() => {
    isNextButtonDisabled.value = false;

    navigate(event);
  });
};

const selectedSiteMakingWay = ref('');
const isNextButtonDisabled = ref(false);

const selectSiteMakingWay = (way) => {
  selectedSiteMakingWay.value = way;
};

const setNextButtonRoute = computed(() => {
  if (selectedSiteMakingWay.value === 'constructor') {
    return 'accountMain';
  }

  return 'wizardStepBusiness';
});
</script>

<style lang="postcss" scoped>
.site-pre-survey {
  @apply flex items-center justify-center w-full p-6;

  &__inner {
    @apply w-full max-w-[352px];
  }

  &__buttons {
    @apply space-y-4 pt-10 max-w-[264px] mx-auto;
  }
}
</style>
