<template>
  <div class="page-not-found">
    <div class="font-bold mb-8">404</div>
    <div>Такой страницы не существует</div>
    <router-link class="mt-8" :to="{ name: 'accountMain' }">
      <UiButton>Главная</UiButton>
    </router-link>
  </div>
</template>

<script setup>
import { UiButton } from 'account-ui';
</script>

<style lang="postcss" scoped>
.page-not-found {
  @apply text-5xl flex items-center justify-center flex-col w-full;
}
</style>
