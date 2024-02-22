<template>
  <div v-click-outside="{ handler: handleClose }" class="color-picker-popover">
    <slot name="trigger" :handle-open="handleOpen" />

    <div ref="popoverContainerReference" class="color-picker-popover__container">
      <div class="color-picker-popover__content hs-tooltip-content" role="tooltip">
        <div class="color-picker-popover__header">
          <span class="color-picker-popover__title">Выбрать цвет</span>
          <button class="color-picker-popover__close" @click="handleClose">
            <UiIcon name="close" :size="16" />
          </button>
        </div>

        <ColorPicker
          is-opened
          :color="modelValue"
          @select-custom-color="handleChange"
          @close-picker="handleClose"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { vClickOutside } from 'account/src/utility/formatters/click-outside';
import { UiIcon } from 'account-ui';
import { ref } from 'vue';
import ColorPicker from './color-picker.vue';

const props = defineProps({
  modelValue: {
    type: String,
    required: false,
    default: '#ffffff',
  },
});

const emit = defineEmits(['update:modelValue']);

const popoverContainerReference = ref(null);

const handleOpen = () => {
  if (popoverContainerReference.value) {
    window.HSTooltip.show(popoverContainerReference.value);
  }
};

const handleClose = () => {
  if (popoverContainerReference.value) {
    window.HSTooltip.hide(popoverContainerReference.value);
  }
};

const handleChange = (value) => {
  if (!props.modelValue || props.modelValue !== value) {
    emit('update:modelValue', value);
  }
};
</script>

<style lang="postcss" scoped>
.color-picker-popover {
  @apply relative max-w-max;

  &__container {
    @apply w-full max-w-[241px] min-w-[241px] transition-opacity inline-block absolute left-0 top-0 invisible z-10 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 rounded-2xl;
    @apply shadow-[2px_2px_12px_0px_rgba(46_64_100_/_4%),_1px_4px_20px_0px_rgba(46_64_100_/_8%)];

    &.show {
      @apply visible;
    }
  }

  &__header {
    @apply flex items-center justify-between p-2 text-gray-700;
  }

  &__title {
    @apply px-3 py-2 text-sm font-medium;
  }

  &__close {
    @apply w-8 h-8 rounded-lg flex items-center justify-center;

    &:hover {
      @apply bg-gray-100;
    }
  }
}
</style>
