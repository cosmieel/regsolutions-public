<template>
  <div class="ui-small-card" :class="{ 'ui-small-card_selected': isCardSelected }">
    <div
      class="ui-small-card__icon"
      :class="[iconBg ? `${iconBg}` : 'ui-small-card__icon_white', iconFill]"
    >
      <UiIcon
        :name="iconName"
        :class="iconSize ? `w-[${iconSize}px] h-[${iconSize}px]` : 'w-6 h-6'"
      />
    </div>
    <div class="ui-small-card__text">
      <span class="ui-small-card__title">{{ title }}</span>
      <div v-if="titleIconName" class="ui-small-card__title-icon">
        <UiIcon :name="titleIconName" :size="16" />
      </div>
    </div>
  </div>
</template>

<script setup>
import UiIcon from './ui-icon.vue';

defineProps({
  isCardSelected: {
    type: Boolean,
    default: false,
  },

  iconName: {
    type: String,
    required: true,
  },

  iconBg: {
    type: String,
    default: '',
  },

  iconFill: {
    type: String,
    default: '',
  },

  iconSize: {
    type: String,
    default: '',
  },

  title: {
    type: String,
    required: true,
  },

  titleIconName: {
    type: String,
    default: '',
  },
});
</script>

<style lang="postcss" scoped>
.ui-small-card {
  @apply flex items-center bg-white border border-gray-100 rounded-2xl p-4 cursor-pointer shadow-sm transition-shadow;

  &:hover {
    @apply shadow-none;
  }

  &_selected {
    @apply ring-2 ring-blue-500;

    &:hover {
      @apply ring-2 ring-blue-500;
    }
  }

  &__icon {
    @apply inline-flex justify-center items-center w-[46px] h-[46px] rounded-lg flex-none;

    &_white {
      @apply bg-white text-gray-700 border border-gray-200 shadow-[2px_2px_4px_0px_rgba(46_64_100_/_4%)];
    }
  }

  &__text {
    @apply text-base pl-4 flex items-center justify-between w-full;
  }

  &__title {
    @apply font-medium;
  }

  &__title-icon {
    @apply ml-4 w-8 h-8 inline-flex items-center justify-center;
  }
}
</style>
