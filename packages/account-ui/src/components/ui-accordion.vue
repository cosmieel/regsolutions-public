<template>
  <div class="hs-accordion-group ui-accordion">
    <div
      v-for="item in accordionItems"
      :id="`hs-ui-accordion-heading-${item.id}`"
      :key="item.id"
      class="hs-accordion ui-accordion__item"
    >
      <button
        class="ui-accordion__toggle hs-accordion-toggle hs-accordion-active:text-blue-500"
        :aria-controls="`hs-ui-accordion-collapse-${item.id}`"
      >
        {{ item.title }}
        <UiIcon
          name="chevron-m-up"
          :size="16"
          class="hs-accordion-active:rotate-180 transition-[transform]"
        />
      </button>
      <div
        :id="`hs-ui-accordion-collapse-${item.id}`"
        class="ui-accordion__content hs-accordion-content"
        :aria-labelledby="`hs-ui-accordion-heading-${item.id}`"
      >
        <p class="ui-accordion__text">
          {{ item.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import UiIcon from './ui-icon.vue';

defineProps({
  accordionItems: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="postcss" scoped>
.ui-accordion {
  @apply divide-y divide-gray-200;

  &__item {
    @apply py-6;
  }

  &__toggle {
    @apply inline-flex items-center justify-between gap-x-3 w-full text-sm font-medium text-left text-gray-700 transition;

    &:hover {
      @apply text-gray-500;
    }
  }

  &__content {
    @apply w-full overflow-hidden transition-[height] duration-300 hidden;
  }

  &__text {
    @apply text-sm leading-6 text-gray-700 pt-4;
  }
}
</style>
