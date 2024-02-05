<template>
  <div class="start-block">
    <UiTitle headline-level="2" class="start-block__title"> С нами легко начать </UiTitle>
    <a href="#" target="_blank" rel="noreferrer noopener" class="start-block__card">
      <div class="start-block__card-item start-block__image">
        <img src="../../assets/images/blog.webp" alt="blog" />
      </div>
      <div class="start-block__card-item start-block__main">
        <h3 class="start-block__main-title">Get your domain and hosting for free</h3>
        <p class="start-block__main-description">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </p>
      </div>
    </a>
  </div>
</template>

<script setup>
import { UiTitle } from 'account-ui';
</script>

<style lang="postcss" scoped>
.start-block {
  @apply mb-20;

  &__title {
    @apply pb-6 text-left;
  }

  &__card {
    @apply flex rounded-2xl border border-gray-200;

    &:hover {
      @apply ring-4 ring-gray-100 border-white;
    }
  }

  &__card-item {
    @apply w-1/2;
  }

  &__image {
    @apply rounded-l-2xl overflow-hidden;

    img {
      @apply w-full h-full object-cover;
    }
  }

  &__main {
    @apply p-10 pb-[30px];
  }

  &__main-title {
    @apply pb-2.5 text-left font-bold text-2xl leading-7;
  }
}
</style>
