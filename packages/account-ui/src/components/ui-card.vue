<template>
  <section class="ui-card">
    <div v-if="needHeader" class="ui-card__header">
      <div class="ui-card__header-main">
        <UiTitle v-if="title" class="ui-card__title" :headline-level="headlineLevel">
          {{ title }}
        </UiTitle>

        <div v-if="description" class="ui-card__description">
          {{ description }}
        </div>
        <div v-if="needDescriptionSlot" class="ui-card__description">
          <slot name="ui-card-description"></slot>
        </div>
      </div>

      <div v-if="needControls" class="ui-card__button">
        <slot name="ui-card-button"></slot>
      </div>
    </div>

    <div v-if="needDivider" class="ui-card__divider"></div>

    <slot></slot>

    <UiSpinnerFull v-if="isLoading" />
  </section>
</template>

<script setup>
import UiSpinnerFull from './ui-spinner-full.vue';
import UiTitle from './ui-title.vue';

defineProps({
  needHeader: {
    type: Boolean,
    default: true,
  },

  headlineLevel: {
    type: String,
    default: '2',
  },

  title: {
    type: String,
    default: '',
  },

  needControls: {
    type: Boolean,
    default: true,
  },

  description: {
    type: String,
    default: '',
  },

  needDivider: {
    type: Boolean,
    default: true,
  },

  needDescriptionSlot: {
    type: Boolean,
    default: false,
  },

  isLoading: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="postcss" scoped>
.ui-card {
  @apply bg-white p-10 rounded-2xl;

  &__header {
    @apply pb-6 flex justify-between;
  }

  &__header-main {
    @apply grow;
  }

  &__title {
    @apply text-left text-xl font-medium leading-6;
  }

  &__button {
    @apply flex-none ml-6;
  }

  &__description {
    @apply pt-2 text-sm text-gray-500 leading-6 break-words;
  }

  &__divider {
    @apply h-px w-full bg-gray-100 mb-6;
  }
}
</style>
