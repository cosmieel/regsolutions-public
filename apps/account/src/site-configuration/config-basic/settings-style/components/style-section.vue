<template>
  <div class="style-section">
    <div class="style-section__left">
      <div class="style-section__text-content">
        <UiTitle class="style-section__title">Акцентный цвет</UiTitle>
        <p class="style-section__description">
          Это ваш отличительный цвет, который будет задан для кнопки и других элементов сайта
        </p>
      </div>

      <FormColorPickerPopover :name="COLOR_KEY">
        <template #trigger="{ handleOpen }">
          <UiButton is-outline size="small" class="style-section__button" @click="handleOpen"
            >Выбрать</UiButton
          >
        </template>
      </FormColorPickerPopover>
    </div>

    <div class="style-section__right">
      <div class="style-section__preview-container">
        <div class="style-section__preview" />
      </div>
    </div>
  </div>
</template>

<script setup>
import FormColorPickerPopover from 'account/src/components/form/form-color-picker-popover.vue';
import { UiTitle, UiButton } from 'account-ui';
import { COLOR_KEY } from '../form/constants.js';

defineProps({
  color: {
    type: String,
    required: false,
    default: '#ffffff',
  },
});
</script>

<style lang="postcss" scoped>
.style-section {
  @apply flex text-gray-700 gap-10;

  &__left {
    @apply flex-1;
  }

  &__right {
    @apply w-[240px];
  }

  &__title {
    @apply text-sm font-medium pb-2 text-left;
  }

  &__description {
    @apply text-sm leading-6 text-gray-400 pb-4;
  }

  &__button {
    @apply w-full max-w-[89px];
  }

  &__preview-container {
    @apply w-full h-[144px] flex items-center justify-center border border-gray-200 rounded-lg overflow-hidden;
  }

  &__preview {
    @apply rounded-full w-16 h-16;
    background-color: v-bind(color);
  }
}
</style>
