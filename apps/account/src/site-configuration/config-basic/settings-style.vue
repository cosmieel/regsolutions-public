<template>
  <div class="settings-style">
    <div class="settings-style__main">
      <div class="settings-style__title">Акцентный цвет</div>
      <div class="settings-style__description">
        Это ваш отличительный цвет, который будет задан для кнопки и других элементов сайта
      </div>

      <div class="settings-style__popover">
        <UiButton is-outline size="small" class="settings-style__button" @click="openColorPicker"
          >Выбрать</UiButton
        >

        <div
          ref="colorSelector"
          class="settings-style__popover-tooltip shadow-[2px_2px_12px_0px_rgba(46_64_100_/_4%),_1px_4px_20px_0px_rgba(46_64_100_/_8%)]"
        >
          <div class="settings-style__popover-content hs-tooltip-content" role="tooltip">
            <div class="settings-style__popover-header">
              <span class="settings-style__popover-title">Выбрать цвет</span>
              <button class="settings-style__popover-close" @click="closeColorPicker">
                <UiIcon name="close" :size="16" />
              </button>
            </div>

            <ColorPicker
              :color="siteData.color"
              :is-opened="isPickerOpened"
              @select-custom-color="selectCustomColor"
              @close-picker="closeColorPicker"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="settings-style__color">
      <div class="settings-style__circle" :style="[seletedColor]"></div>
    </div>
  </div>
</template>

<script setup>
import { UiButton, UiIcon } from 'account-ui';
import { computed, ref } from 'vue';
import ColorPicker from '../../components/color-picker.vue';

const props = defineProps({
  siteData: {
    type: Object,
    required: true,
  },
});

const colorSelector = ref(null);
const isPickerOpened = ref(false);

const openColorPicker = () => {
  window.HSTooltip.show(colorSelector.value);
  isPickerOpened.value = true;
};

const closeColorPicker = () => {
  window.HSTooltip.hide(colorSelector.value);
  isPickerOpened.value = false;
};

const emit = defineEmits(['select-color']);

const selectCustomColor = (hex) => {
  emit('select-color', hex);
};

const seletedColor = computed(() => {
  return `background-color: ${props.siteData.color};`;
});
</script>

<style lang="postcss" scoped>
.settings-style {
  @apply flex justify-between text-gray-700;

  &__main {
    @apply pr-10;
  }

  &__title {
    @apply text-sm font-medium pb-2;
  }

  &__description {
    @apply text-sm leading-6 text-gray-400 pb-4;
  }

  &__button {
    @apply w-full max-w-[89px];
  }

  &__popover {
    @apply relative;

    &-tooltip {
      @apply w-full max-w-[241px] min-w-[241px] transition-opacity inline-block absolute right-0 bottom-0 translate-y-[20%] mr-[-40px] invisible z-10 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 rounded-2xl;

      &.show {
        @apply visible;
      }
    }

    &-header {
      @apply flex items-center justify-between p-2 text-gray-700;
    }

    &-title {
      @apply px-3 py-2 text-sm font-medium;
    }

    &-close {
      @apply w-8 h-8 rounded-lg flex items-center justify-center;

      &:hover {
        @apply bg-gray-100;
      }
    }
  }

  &__color {
    @apply w-full max-w-[240px] h-[144px] flex items-center justify-center border border-gray-200 rounded-lg overflow-hidden;
  }

  &__circle {
    @apply rounded-full w-16 h-16;
  }
}
</style>
