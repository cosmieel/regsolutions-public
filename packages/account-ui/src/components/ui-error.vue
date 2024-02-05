<template>
  <div id="dismiss-alert" class="ui-error" :class="{ '_is-visible': isVisible }" role="alert">
    <div class="ui-error__wrapper">
      <div class="ui-error__icon">
        <UiIcon name="warning-filled" :size="20" />
      </div>
      <div class="ui-error__content">
        <div class="ui-error__main">
          <div class="ui-error__text">
            <div class="ui-error__title">
              {{ errorText }}
            </div>
            <div v-if="errorDescription" class="ui-error__description">
              {{ errorDescription }}
            </div>
          </div>
          <div v-if="!notifyWithoutControls" class="ui-error__button" @click.stop="onCloseClick">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import UiIcon from './ui-icon.vue';

const props = defineProps({
  errorText: {
    type: String,
    default: '',
  },

  errorDescription: {
    type: String,
    default: '',
  },

  notifyWithoutControls: {
    type: Boolean,
    default: false,
  },

  needDestroyOnUnmount: {
    type: Boolean,
    default: false,
  },

  longClosingTimeout: {
    type: Number,
    default: -1,
  },
});

const isVisible = ref(false);
const defaultClosingTimeout = ref(5000);
const defaultClosingEmitTimeout = ref(300);

const emit = defineEmits(['close']);

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 100);

  if (!props.notifyWithoutControls || !props.longClosingTimeout) {
    return;
  }

  if (props.notifyWithoutControls) {
    setTimeout(() => onCloseClick(), defaultClosingTimeout.value);

    return;
  }

  if (props.longClosingTimeout) {
    setTimeout(() => onCloseClick(), props.longClosingTimeout);

    return;
  }
});

onUnmounted(() => {
  if (props.needDestroyOnUnmount) {
    isVisible.value = false;
    emit('close');
  }
});

const onCloseClick = () => {
  isVisible.value = false;

  setTimeout(() => {
    emit('close');
  }, defaultClosingEmitTimeout.value);
};
</script>

<style lang="postcss" scoped>
.ui-error {
  @apply opacity-0 translate-x-5 transition duration-300 bg-red-500 text-white rounded-2xl py-4 pr-6 pl-5;

  &:hover {
    .ui-error__close {
      @apply visible;
    }
  }

  &._is-visible {
    @apply translate-x-0 opacity-100 transition duration-300;
  }

  &__wrapper {
    @apply flex items-center justify-start;
  }

  &__content {
    @apply pl-2;
  }

  &__main {
    @apply flex items-center justify-between;
  }

  &__text {
    @apply text-sm leading-6;
  }

  &__button {
    @apply ml-4;
  }

  &__description {
    @apply text-xs text-red-200 max-w-[160px];
  }
}
</style>
