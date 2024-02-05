<template>
  <div class="color-popover">
    <button
      class="color-popover__toggle"
      :class="[
        {
          'color-popover__toggle_active': isPickerOpened,
          'color-popover__toggle_selected': !isPaletteColorSelected && isColorSelected,
        },
      ]"
      :style="[seletedToggleStyle]"
      @click="triggerColorPicker"
    >
      <UiIcon name="eye-dropper" :size="14" :style="[seletedToggleIconStyle]" />
    </button>

    <div
      ref="colorSelector"
      class="color-popover__tooltip shadow-[2px_2px_12px_0px_rgba(46_64_100_/_4%),_1px_4px_20px_0px_rgba(46_64_100_/_8%)]"
    >
      <div class="color-popover__content hs-tooltip-content" role="tooltip">
        <div class="color-popover__header">
          <span class="color-popover__title">Выбрать цвет</span>
          <UiButton
            is-button-icon
            is-ghost
            size="small"
            class="color-popover__close"
            @click="closeColorPicker"
          >
            <UiIcon name="close" :size="16" />
          </UiButton>
        </div>

        <ColorPicker
          :color="color"
          :is-opened="isPickerOpened"
          @select-custom-color="selectCustomColor"
          @close-picker="closeColorPicker"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { UiButton, UiIcon } from 'account-ui';
import { computed, onMounted, ref } from 'vue';
import ColorPicker from '../../../components/color-picker.vue';

const props = defineProps({
  isPaletteColorSelected: {
    type: Boolean,
    default: false,
  },
});

const colorSelector = ref(null);
const isPickerOpened = ref(false);
const isColorSelected = ref(false);
const color = ref('');

const setDefaultColor = () => {
  color.value = isColorInStorage.value ? getColorFromStorage.value : '#406CFF';
};

const openColorPicker = () => {
  setDefaultColor();

  window.HSTooltip.show(colorSelector.value);
  isPickerOpened.value = true;
};

const closeColorPicker = () => {
  window.HSTooltip.hide(colorSelector.value);
  isPickerOpened.value = false;
};

const triggerColorPicker = () => {
  if (isPickerOpened.value) {
    closeColorPicker();

    return;
  }

  openColorPicker();
};

const emit = defineEmits(['select-custom-color']);

const selectCustomColor = (customColorHex) => {
  emit('select-custom-color', customColorHex);
  color.value = customColorHex;

  isColorSelected.value = true;
};

onMounted(() => {
  const isPallete = localStorage.getItem('isPaletteColorSelected');

  if ((!isPallete || isPallete === 'false') && isColorInStorage.value) {
    color.value = getColorFromStorage.value;
  }
});

const getColorFromStorage = computed(() => {
  let wizardColor;

  if (localStorage.getItem('wizard')) {
    wizardColor = JSON.parse(localStorage.getItem('wizard')).color;
  }

  return wizardColor;
});

const isColorInStorage = computed(() => {
  return getColorFromStorage?.value?.length > 0;
});

const isToggleSelected = computed(() => {
  return !props.isPaletteColorSelected && isColorSelected.value && color.value;
});

const seletedToggleStyle = computed(() => {
  return isToggleSelected.value && `box-shadow: 0px 0px 0px 4px ${color.value};`;
});

const seletedToggleIconStyle = computed(() => {
  return isToggleSelected.value && `color: ${color.value};`;
});
</script>

<style lang="postcss" scoped>
.color-popover {
  @apply relative;

  &__toggle {
    @apply w-8 h-8 border border-gray-200 rounded-full flex justify-center items-center text-gray-700 shadow-[2px_2px_12px_0px_rgba(46_64_100_/_4%)];

    &:hover {
      @apply bg-gray-100;
    }

    &_active {
      @apply border-2 border-white ring-4 ring-gray-200;
    }

    &_selected {
      @apply border-2 border-white;
    }
  }

  &__tooltip {
    @apply w-full max-w-[241px] min-w-[241px] transition-opacity inline-block absolute right-0 bottom-0 translate-y-2/4 translate-x-full mr-[-40px] invisible z-10 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 rounded-2xl;

    &.show {
      @apply visible;
    }
  }

  &__header {
    @apply flex items-center justify-between p-2 text-gray-700;
  }

  &__title {
    @apply px-2 pt-1 text-sm leading-6 font-medium;
  }

  &__close {
    @apply w-8;
  }
}
</style>
