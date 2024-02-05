<template>
  <section class="account-footer">
    <UiSvg name="logo-header" class="account-footer__logo" />
    <div class="account-footer__text">© 2023 Рег.решения | Сделано для бизнеса.</div>
    <a href="mailto:solutions@reg.ru" class="account-footer__link">solutions@reg.ru</a>
  </section>
</template>

<script setup>
import { UiSvg } from 'account-ui';
</script>

<style lang="postcss" scoped>
.account-footer {
  @apply text-gray-700 text-center text-sm leading-6;

  &__logo {
    @apply mx-auto;
  }

  &__text {
    @apply pt-4;
  }

  &__link {
    @apply text-inherit leading-[inherit] decoration-1 underline underline-offset-2;

    &:hover {
      @apply text-blue-600;
    }

    &:focus,
    &:active {
      @apply text-blue-600 no-underline;
    }
  }
}
</style>
