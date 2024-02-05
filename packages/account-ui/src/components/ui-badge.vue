<template>
  <div class="ui-badge" :class="badgeModifiers">
    <UiIcon v-if="icon" class="ui-badge__icon" :name="icon" :size="16" />
    <span class="ui-badge__text">
      <slot></slot>
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { UiIcon } from '..';

const props = defineProps({
  red: {
    type: Boolean,
    default: false,
  },

  isOutline: {
    type: Boolean,
    default: false,
  },

  black: {
    type: Boolean,
    default: false,
  },

  icon: {
    type: String,
    default: '',
  },
});

const badgeModifiers = computed(() => {
  return {
    'ui-badge_red': props.red,
    'ui-badge_outline': props.isOutline,
    'ui-badge_outline_black': props.black,
  };
});
</script>

<style lang="postcss">
.ui-badge {
  @apply inline-flex items-center max-w-[12rem] mx-1 py-2 px-3 rounded-lg text-xs font-medium bg-blue-100 text-blue-500;

  &:last-child {
    @apply mr-0;
  }

  &:first-child {
    @apply ml-0;
  }

  &_red {
    @apply bg-red-50 text-red-500;
  }

  &_outline {
    @apply bg-white border border-gray-200;

    &_black {
      @apply text-gray-700;
    }
  }

  &__icon {
    @apply mr-1.5 ml-[-4px];
  }

  &__text {
    @apply inline-block truncate whitespace-nowrap;
  }
}
</style>
