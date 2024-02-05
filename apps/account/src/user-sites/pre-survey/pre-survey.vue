<template>
  <section class="pre-survey">
    <div class="pre-survey__icon">
      <UiSvg name="survey-head" />
    </div>
    <div class="pre-survey__head">
      <UiTitle class="pre-survey__title">
        <slot name="pre-survey-title"></slot>
      </UiTitle>
      <p class="pre-survey__description">
        <slot name="pre-survey-description"></slot>
      </p>
    </div>
    <div class="pre-survey__cards">
      <slot name="pre-survey-cards"></slot>
    </div>
  </section>
</template>

<script setup>
import { UiSvg, UiTitle } from 'account-ui';
</script>

<style lang="postcss" scoped>
.pre-survey {
  @apply text-center;

  &__icon {
    @apply flex justify-center items-center mx-auto w-14 h-14 rounded-[10px] border border-gray-200 shadow-[2px_2px_12px_0px_rgba(46_64_100_/_4%),_1px_4px_20px_0px_rgba(46_64_100_/_8%)];
  }

  &__head {
    @apply pt-6 pb-10;
  }

  &__title {
    & + .pre-survey__description {
      @apply pt-4;
    }
  }

  &__description {
    @apply text-sm leading-6 text-gray-500;
  }

  &__cards {
    @apply space-y-4 max-w-[352px] mx-auto;
  }
}
</style>
