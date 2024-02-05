<template>
  <main>
    <div class="wrapper">
      <AppProvider>
        <router-view />
      </AppProvider>
    </div>
  </main>

  <UiAlertsWrapper id="user-account-alerts-wrapper">
    <UiNotifyer :notifyer="notifyer" />
  </UiAlertsWrapper>

  <UiModalProvider :instance="modalManager" :router-instance="useRouter()" />
</template>

<script setup>
import { UiAlertsWrapper, UiNotifyer, UiModalProvider } from 'account-ui';
import { useRouter } from 'vue-router';
import AppProvider from './app-provider/app-provider.vue';
import { modalManager } from './instances/modal-manager.js';
import { notifyer } from './instances/notifyer.js';
</script>

<style lang="postcss" scoped>
main {
  @apply flex text-base text-gray-700 font-normal w-full;

  .wrapper {
    @apply flex w-full;
  }
}
</style>
