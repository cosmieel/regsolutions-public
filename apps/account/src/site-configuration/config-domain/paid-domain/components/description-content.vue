<template>
  <span class="description-content">
    Подключите свой домен. Если у вас его еще нет – найти подходящий можно в
    <a
      class="description-content__link"
      href="https://www.reg.ru/domain/new/"
      target="_blank"
      rel="noreferrer noopener"
      >магазине доменов</a
    >
  </span>
</template>

<script setup></script>

<style lang="postcss" scoped>
.description-content {
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
