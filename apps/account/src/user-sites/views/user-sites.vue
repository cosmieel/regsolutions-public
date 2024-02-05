<template>
  <div v-if="isLoading">Загрузка...</div>
  <div v-else-if="sitesList.length > 0">
    <!--    <StartBlock />-->
    <SitesList />
  </div>

  <UiAlertsWrapper>
    <UiError
      v-if="subscriptionNotExistsErrorMessage"
      :error-text="'Тариф не подключен'"
      :error-description="'Подключите тариф, чтобы опубликовать сайт'"
      @close="closeSubscriptionNotExistsErrorMessage"
    >
      <router-link :to="`configuration/${currentSiteId}/subscriptions`">
        <UiButton is-ghost-white>Подключить</UiButton>
      </router-link>
    </UiError>
  </UiAlertsWrapper>
</template>

<script setup>
import { UiButton, UiAlertsWrapper, UiError } from 'account-ui';
import { storeToRefs } from 'pinia';
import { onBeforeMount, onUpdated, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthFormStore } from '../../auth/stores/auth-form.js';
import SitesList from '../sites-list/sites-list.vue';
// TODO Hidden by this ticket - https://jira.runity.ru/browse/REGSOLUT-572
// import StartBlock from '../start-block/start-block.vue';
import { useUserSitesStore } from '../stores/user-sites-store.js';

const router = useRouter();
const userSitesStore = useUserSitesStore();
const {
  sitesList,
  isSuccess,
  isLoading,
  isError,
  error,
  subscriptionNotExistsErrorMessage,
  currentSiteId,
} = storeToRefs(userSitesStore);

const authStore = useAuthFormStore();
const logout = async () => await authStore.logoutRequest();

const redirectIfSitesListIsEmpty = (isSuccess) => {
  if (isSuccess && sitesList.value.length === 0) {
    router.push({ name: 'accountMainEmpty' });
  }
};

const logoutIfNoAccess = async (isError) => {
  if (isError && error.value.message === 'error_no_access') {
    await logout();
  }
};

watch(isSuccess, (value) => {
  redirectIfSitesListIsEmpty(value);
});

watch(isError, (value) => {
  logoutIfNoAccess(value);
});

onBeforeMount(async () => {
  logoutIfNoAccess(isError.value);
  redirectIfSitesListIsEmpty(isSuccess.value);
});

onUpdated(() => {
  logoutIfNoAccess(isError.value);
  redirectIfSitesListIsEmpty(isSuccess.value);
});

const closeSubscriptionNotExistsErrorMessage = () => {
  userSitesStore.clearSubscriptionNotExistsError();
};
</script>

<style scoped></style>
