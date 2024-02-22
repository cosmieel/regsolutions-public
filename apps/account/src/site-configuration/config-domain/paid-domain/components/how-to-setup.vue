<template>
  <div class="paid-domain-card paid-domain__dns">
    <div class="paid-domain-card__main">
      <div class="paid-domain__dns-icon">
        <UiIcon name="warning-filled" class="text-red-500 w-5 h-5" :size="20" />
      </div>
      <div class="paid-domain-card__text">
        <div class="paid-domain-card__title">Настройте DNS-записи</div>
        <div class="paid-domain-card__description">
          Отсутствует А-запись. Добавьте А-запись со значением IP: 194.58.112.10 в панели управления
          доменом у регистратора
        </div>
      </div>
    </div>
    <div class="paid-domain-card__dns-button">
      <a
        href="https://help.reg.ru/support/dns-servery-i-nastroyka-zony/nastroyka-resursnykh-zapisey-dns/"
        target="_blank"
        rel="noreferrer noopener"
      >
        <UiButton is-ghost>Как настроить</UiButton>
      </a>
    </div>
  </div>
</template>

<script setup>
import { UiButton, UiIcon } from 'account-ui';
</script>

<style lang="postcss" scoped>
.paid-domain-card {
  @apply rounded-2xl border border-gray-200 shadow-[2px_2px_4px_0px_rgba(46_64_100_/_4%)] p-[15px] mt-4 flex items-center justify-between;

  &__main {
    @apply flex items-center;
  }

  &__text {
    @apply px-4;
  }

  &__title {
    @apply text-sm leading-6 font-medium;
  }

  &__description {
    @apply text-xs text-gray-400;
  }

  &__dns {
    &-button {
      @apply whitespace-nowrap;
    }
  }
}
</style>
