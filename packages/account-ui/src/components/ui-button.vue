<template>
  <button type="button" class="ui-button" :class="uiButtonClass" :disabled="disabled">
    <span v-if="pending" class="ui-button__spinner"><UiSpinner /></span>
    <span class="ui-button__inner"><slot></slot></span>
  </button>
</template>

<script setup>
import { computed } from 'vue';
import UiSpinner from './ui-spinner.vue';

const props = defineProps({
  isOutline: {
    type: Boolean,
    default: false,
  },

  isGhost: {
    type: Boolean,
    default: false,
  },

  isGhostWhite: {
    type: Boolean,
    default: false,
  },

  isGhostBlue: {
    type: Boolean,
    default: false,
  },

  isSoft: {
    type: Boolean,
    default: false,
  },

  isRed: {
    type: Boolean,
    default: false,
  },

  size: {
    type: String,
    default: 'normal',
  },

  disabled: {
    type: Boolean,
    default: false,
  },

  pending: {
    type: Boolean,
    default: false,
  },

  isButtonIcon: {
    type: Boolean,
    default: false,
  },
});

const buttonSize = computed(() => {
  if (props.size === 'small') {
    return props.isButtonIcon ? 'ui-button_small ui-button_small_icon' : 'ui-button_small';
  }

  if (props.size === 'big') {
    return props.isButtonIcon ? 'ui-button_big ui-button_big_icon' : 'ui-button_big';
  }

  return props.isButtonIcon ? 'ui-button_normal ui-button_normal_icon' : 'ui-button_normal';
});

const defaultButton = computed(() => {
  return props.disabled ? 'ui-button_default_disabled' : 'ui-button_default';
});

const outlineButton = computed(() => {
  return props.disabled ? 'ui-button_outline_disabled' : 'ui-button_outline';
});

const ghostButton = computed(() => {
  return props.disabled ? 'ui-button_ghost_disabled' : 'ui-button_ghost';
});

const ghostWhiteButton = computed(() => {
  return props.disabled ? 'ui-button_ghost-white_disabled' : 'ui-button_ghost-white';
});

const ghostBlueButton = computed(() => {
  return props.disabled ? 'ui-button_ghost-blue_disabled' : 'ui-button_ghost-blue';
});

const softButton = computed(() => {
  return props.disabled ? 'ui-button_soft_disabled' : 'ui-button_soft';
});

const redButton = computed(() => {
  return props.disabled ? 'ui-button_red_disabled' : 'ui-button_red';
});

const buttonType = computed(() => {
  if (props.isOutline) {
    return outlineButton.value;
  }

  if (props.isGhost) {
    return ghostButton.value;
  }

  if (props.isGhostWhite) {
    return ghostWhiteButton.value;
  }

  if (props.isGhostBlue) {
    return ghostBlueButton.value;
  }

  if (props.isSoft) {
    return softButton.value;
  }

  if (props.isRed) {
    return redButton.value;
  }

  return defaultButton.value;
});

const buttonPending = computed(() => {
  return props.pending && 'ui-button_pending';
});

const uiButtonClass = computed(() => {
  return [buttonSize.value, buttonType.value, buttonPending.value];
});
</script>

<style lang="postcss" scoped>
.ui-button {
  @apply w-full rounded-lg flex justify-center items-center border align-middle transition-all font-medium relative;

  &_small {
    @apply py-[7px] px-[11px] text-sm leading-4 max-h-8;

    &_icon {
      @apply p-2 min-w-[32px] px-1;
    }
  }

  &_big {
    @apply p-[15.5px] text-[15px] leading-none max-h-12;

    &_icon {
      @apply p-4 min-w-[48px] px-1;
    }
  }

  &_normal {
    @apply py-[11px] px-[15px] text-sm leading-4 max-h-10;

    &_icon {
      @apply p-3 min-w-[40px] px-1;
    }
  }

  &_default {
    @apply border-transparent bg-blue-700 text-white;

    &:hover {
      @apply bg-blue-800;
    }

    &:active {
      @apply bg-blue-700 ring-4 ring-blue-100;
    }

    &_disabled {
      @apply border-transparent bg-blue-200 text-white pointer-events-none;
    }
  }

  &_outline {
    @apply border-gray-200 bg-white text-gray-700 shadow-[2px_2px_4px_0px_rgba(46_64_100_/_4%)];

    &:hover {
      @apply bg-gray-50;
    }

    &:active {
      @apply bg-white ring-4 ring-gray-100;
    }

    &_disabled {
      @apply text-gray-300 border-gray-200 bg-white pointer-events-none;
    }
  }

  &_ghost {
    @apply border-transparent bg-transparent text-gray-700;

    &:hover {
      @apply border-gray-100 bg-gray-100;
    }

    &:active {
      @apply border-transparent bg-transparent;
    }

    &_disabled {
      @apply text-gray-300 border-transparent bg-transparent pointer-events-none;
    }
  }

  &_cancel {
    @apply bg-white text-red-500 border-gray-100;

    &:hover {
      @apply bg-red-500 text-white text-white border-red-500;
    }

    &:active {
      @apply border-transparent bg-transparent;
    }

    &_disabled {
      @apply text-gray-300 border-transparent bg-transparent pointer-events-none;
    }
  }

  &_ghost-white {
    @apply border-white/[.15] bg-white/[.10] text-white;

    &:hover {
      @apply bg-white/[.15];
    }

    &:active {
      @apply bg-white/[.10] ring-4 ring-white/[.15];
    }

    &_disabled {
      @apply text-white/[.30] border-white/[.10] bg-white/[.10] pointer-events-none;
    }
  }

  &_ghost-blue {
    @apply border-transparent bg-transparent text-blue-600;

    &:hover {
      @apply border-transparent bg-blue-50;
    }

    &:active {
      @apply border-transparent bg-blue-50 ring-4 ring-blue-500/[.20];
    }

    &_disabled {
      @apply text-blue-200 border-transparent bg-transparent pointer-events-none;
    }
  }

  &_soft {
    @apply border-transparent bg-gray-100 text-gray-700;

    &:hover {
      @apply bg-gray-200;
    }

    &:active {
      @apply bg-gray-200 ring-4 ring-gray-800/[.05];
    }

    &_disabled {
      @apply border-transparent bg-gray-100 text-gray-300 pointer-events-none;
    }
  }

  &_red {
    @apply border-transparent bg-red-500 text-white;

    &:hover {
      @apply bg-red-600;
    }

    &:active {
      @apply bg-red-500 ring-4 ring-red-800/[.10];
    }

    &_disabled {
      @apply border-transparent bg-red-200 text-white pointer-events-none;
    }
  }

  &_pending {
    .ui-button__inner {
      @apply text-transparent;
    }
  }

  &__inner {
    @apply flex justify-center items-center font-medium;
  }

  &__spinner {
    @apply absolute inline-flex;

    .ui-spinner {
      @apply text-inherit;
    }
  }

  :deep(svg) {
    @apply flex-none;
  }
}
</style>
