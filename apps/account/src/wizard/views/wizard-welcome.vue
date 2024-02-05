<template>
  <div v-if="isLoading">Загрузка...</div>
  <section v-else class="wizard-welcome">
    <div class="wizard-welcome__inner">
      <div class="wizard-welcome__heading">
        <div class="wizard-welcome__icon">
          <UiSvg name="survey-head" />
        </div>
        <h1 class="wizard-welcome__title">У вас еще нет сайта. Начнем его собирать?</h1>
        <p class="wizard-welcome__description">
          Мы поможем вам с помощью короткого квиза. А затем вы сможете<br />
          редактировать сайт самостоятельно
        </p>
      </div>
      <div class="wizard-welcome__buttons">
        <router-link :to="{ name: 'wizardStepBusiness' }" class="block">
          <UiButton class="wizard-welcome__button">Начать</UiButton>
        </router-link>
        <router-link :to="{ name: 'accountMain' }" class="block">
          <UiButton class="wizard-welcome__button" is-outline>Не сейчас</UiButton>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { UiButton, UiSvg } from 'account-ui';
import { storeToRefs } from 'pinia';
import { onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useUserSitesStore } from '../../user-sites/stores/user-sites-store.js';

const router = useRouter();
const userSitesStore = useUserSitesStore();
const { sites, isSuccess, isLoading } = storeToRefs(userSitesStore);

const redirectIfSitesListIsNotEmpty = (isSuccess) => {
  if (isSuccess && sites.value.length > 0) {
    router.push({ name: 'accountMain' });
  }
};

watch(isSuccess, (value) => {
  redirectIfSitesListIsNotEmpty(value);
});

onMounted(async () => {
  redirectIfSitesListIsNotEmpty(isSuccess.value);
});
</script>

<style lang="postcss" scoped>
.wizard-welcome {
  @apply text-center text-gray-700 mx-auto px-6 flex items-center justify-center;

  &__inner {
    @apply flex flex-col items-center justify-center max-w-[652px];
  }

  &__icon {
    @apply flex justify-center items-center mx-auto w-14 h-14 rounded-[10px] border border-gray-200 shadow-[2px_2px_12px_0px_rgba(46_64_100_/_4%),_1px_4px_20px_0px_rgba(46_64_100_/_8%)];
  }

  &__title {
    @apply text-2xl leading-none font-medium pt-10;
  }

  &__description {
    @apply text-base pt-4 text-gray-500;
  }

  &__buttons {
    @apply space-y-4 pt-10 w-full max-w-[238px];
  }

  &__button {
    @apply w-full block;
  }
}
</style>
