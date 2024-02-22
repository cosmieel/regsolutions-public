<template>
  <div v-if="isLoading">Загрузка...</div>
  <PreSurvey v-else>
    <template #pre-survey-title>Создайте свой первый сайт!</template>
    <template #pre-survey-description>
      Пройдите небольшое обучение или сразу перейдите<br />
      к редактированию в конструкторе
    </template>
    <template #pre-survey-cards>
      <UiSmallCard
        class="block"
        :icon-name="'supplies'"
        :icon-bg="'bg-blue-50'"
        :icon-fill="'text-blue-500'"
        :title="'Самостоятельно'"
        :title-icon-name="'add'"
        @click="createSiteByYourself"
      />

      <router-link :to="{ name: 'wizardStepBusiness' }" class="block">
        <UiSmallCard
          :icon-name="'magic-wound'"
          :icon-bg="'bg-violet-100'"
          :icon-fill="'text-violet-500'"
          :title="'Через обучение'"
          :title-icon-name="'add'"
        />
      </router-link>
    </template>
  </PreSurvey>
</template>

<script setup>
import { UiSmallCard } from 'account-ui';
import { storeToRefs } from 'pinia';
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useWizardStore } from '../../wizard/stores/wizard-store.js';
import PreSurvey from '../pre-survey/pre-survey.vue';
import { useUserSitesStore } from '../stores/user-sites-store.js';

const router = useRouter();
const userSitesStore = useUserSitesStore();
const { total, isSuccess, isLoading } = storeToRefs(userSitesStore);

const wizardStore = useWizardStore();

const isCreateSitByYourselfLoading = ref(false);

const redirectIfSitesListIsNotEmpty = (isSuccess) => {
  if (isSuccess && total.value > 0) {
    router.push({ name: 'accountMain' });
  }
};

const createSiteByYourself = async () => {
  if (isCreateSitByYourselfLoading.value) {
    return;
  }

  isCreateSitByYourselfLoading.value = true;

  await wizardStore.createSiteByYourself(() => {
    isCreateSitByYourselfLoading.value = false;

    router.push({ name: 'accountMain' });
  });
};

onBeforeMount(async () => {
  redirectIfSitesListIsNotEmpty(isSuccess.value);
});
</script>
