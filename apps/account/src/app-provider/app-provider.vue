<template>
  <div class="app-provider__loader">
    <UiSpinnerFull v-if="showLoader" />
    <RedirectInterceptor v-else>
      <slot />
    </RedirectInterceptor>
  </div>
</template>

<script setup>
import { useAuthFormStore } from 'account/src/auth/stores/auth-form';
import { useProfileSettingsStore } from 'account/src/profile/stores/profile-settings.js';
import { UiSpinnerFull } from 'account-ui';
import { computed, watch, provide } from 'vue';
import { IS_ADMIN_PROVIDE_KEY, IS_AUTHENTICATED_PROVIDE_KEY } from './constants.js';
import RedirectInterceptor from './redirect-interceptor.vue';

const authStore = useAuthFormStore();
const profileSettingsStore = useProfileSettingsStore();

const isAuthenticated = computed(() => authStore.isAuthenticated);
const hasProfileData = computed(() => !!profileSettingsStore.data);
const isProfileFetching = computed(() => profileSettingsStore.fetchingLoading);
const isAdmin = computed(() => profileSettingsStore.isAdmin);

const showLoader = computed(
  () => isAuthenticated.value && !hasProfileData.value && isProfileFetching.value
);

watch(
  isAuthenticated,
  async (value) => {
    if (value && !hasProfileData.value) {
      await profileSettingsStore.loadProfileData();
    }
  },
  { immediate: true }
);

provide(IS_ADMIN_PROVIDE_KEY, isAdmin);
provide(IS_AUTHENTICATED_PROVIDE_KEY, isAuthenticated);
</script>

<style lang="postcss" scoped>
.app-provider {
  &__loader {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
