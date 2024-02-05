<template>
  <div class="account-settings hs-dropdown [--strategy:absolute] [--adaptive:none]">
    <div class="account-settings__toggle">{{ profileNameLetter }}</div>

    <UiDropdown class="account-settings__menu divide-y divide-gray-200">
      <div class="account-settings__section">
        <router-link :to="{ name: 'accountProfile' }" class="ui-dropdown-link_bg-blue">
          Настройки аккаунта
        </router-link>
      </div>
      <div class="account-settings__section">
        <button type="button" class="ui-dropdown-link_bg-blue" @click="logout">Выйти</button>
      </div>
    </UiDropdown>
  </div>
</template>

<script setup>
import { UiDropdown } from 'account-ui';
import { computed } from 'vue';
import { useAuthFormStore } from '../auth/stores/auth-form.js';
import { useProfileSettingsStore } from '../profile/stores/profile-settings.js';

const authStore = useAuthFormStore();
const profileSettingsStore = useProfileSettingsStore();

const profileNameLetter = computed(() => profileSettingsStore?.userName?.charAt(0) || 'A');
const logout = async () => await authStore.logoutRequest();
</script>

<style lang="postcss" scoped>
.account-settings {
  @apply relative;

  &__toggle {
    @apply flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 text-base font-medium text-gray-800 cursor-pointer;

    &:hover {
      @apply bg-gray-200;
    }
  }

  &__menu {
    @apply w-[186px] top-full right-1/2 translate-x-1/2 translate-y-[7px];
  }

  &__section {
    @apply py-2;

    &:first-child {
      @apply pt-0;
    }

    &:last-child {
      @apply pb-0;
    }
  }
}
</style>
