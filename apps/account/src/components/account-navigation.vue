<template>
  <nav class="account-nav" aria-label="Global">
    <div class="account-nav__logo">
      <div class="account-nav__logo-item">
        <router-link :to="{ name: 'accountMain' }" class="">
          <UiSvg name="logo-header" />
        </router-link>
      </div>
    </div>

    <div class="account-nav__menu">
      <div class="account-nav__sites">
        <router-link :to="{ name: 'accountMain' }">
          <UiButton is-ghost> Мои сайты </UiButton>
        </router-link>
      </div>
      <!-- <div class="account-nav__sites hs-dropdown [--strategy:absolute] [--adaptive:none]">
        <UiButton
          id="hs-my-sites-menu"
          is-ghost
        >
          Мои сайты
          <UiIcon
            name="chevron-s-down"
            class="ml-1"
          />
        </UiButton>

        <UiDropdown class="account-nav__sites-menu">
          <router-link
            :to="{ name: 'accountMain' }"
            class="ui-dropdown-link"
          > Все </router-link>
          <router-link
            :to="{ name: 'accountMain' }"
            class="ui-dropdown-link"
          >
            В архиве
          </router-link>
        </UiDropdown>
      </div> -->

      <!--      <a href="https://solutions.reg.ru/help" target="_blank" rel="noreferrer noopener">-->
      <!--        <UiButton is-ghost>Помощь</UiButton>-->
      <!--      </a>-->

      <div class="account-nav__profile hs-dropdown [--strategy:absolute] [--adaptive:none]">
        <div class="account-nav__profile-toggle">{{ profileNameLetter }}</div>

        <UiDropdown class="account-nav__profile-menu divide-y divide-gray-100">
          <div class="account-nav__profile-section">
            <router-link :to="{ name: 'accountProfile' }" class="ui-dropdown-link">
              Настройки аккаунта
            </router-link>
          </div>
          <div class="account-nav__profile-section">
            <button type="button" class="ui-dropdown-link" @click="logout">Выйти</button>
          </div>
        </UiDropdown>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { UiButton, UiDropdown, UiSvg } from 'account-ui';
import { computed } from 'vue';
import { useAuthFormStore } from '../auth/stores/auth-form.js';
import { useProfileSettingsStore } from '../profile/stores/profile-settings.js';

const authStore = useAuthFormStore();
const profileSettingsStore = useProfileSettingsStore();

const profileNameLetter = computed(() => profileSettingsStore?.userName?.charAt(0) || 'A');

const logout = async () => await authStore.logoutRequest();
</script>

<style lang="postcss" scoped>
.account-nav {
  @apply bg-white z-50 relative w-full mx-auto px-6 pt-3 pb-[11px] flex items-center justify-between border-b border-gray-100 text-sm;

  &__logo {
    @apply grow;

    &-item {
      @apply flex;
    }
  }

  &__menu {
    @apply flex items-center justify-between;
  }

  &__sites {
    @apply relative;

    &-menu {
      @apply w-[128px] top-full left-[-14px] translate-y-1;
    }
  }

  &__profile {
    @apply relative;

    &-toggle {
      @apply flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 ml-4 text-sm font-medium text-gray-800 cursor-pointer;

      &:hover {
        @apply bg-gray-200;
      }
    }

    &-menu {
      @apply w-[197px] top-full right-0 translate-y-1;
    }

    &-section {
      @apply py-2;

      &:first-child {
        @apply pt-0;
      }

      &:last-child {
        @apply pb-0;
      }
    }
  }
}
</style>
