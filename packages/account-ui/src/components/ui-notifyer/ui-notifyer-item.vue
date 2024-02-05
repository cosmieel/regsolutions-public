<template>
  <div class="ui-notify" :class="`ui-notify_${type}`" role="alert">
    <div class="ui-notify__wrapper">
      <div class="ui-notify__icon">
        <UiIcon :name="icon" :size="20" />
      </div>
      <div class="ui-notify__content">
        <div class="ui-notify__main">
          <div class="ui-notify__text">
            <div v-if="title" class="ui-notify__title">
              {{ title }}
            </div>
            <div class="ui-notify__message" :class="{ 'ui-notify__message_small': title }">
              {{ message }}
            </div>
          </div>
          <div v-if="!!action?.component" class="ui-notify__button">
            <component :is="action.component" v-bind="action.props" @click="handleActionClick">{{
              action?.slotValue
            }}</component>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted, inject } from 'vue';
import { TYPES, TIMEOUT_VALUE } from './notification-manager.js';
import UiIcon from '../ui-icon.vue';

const timerId = ref(null);

const notifyer = inject('notifyer');

const props = defineProps({
  id: {
    type: String,
    required: true,
  },

  icon: {
    type: String,
    required: false,
    default: 'checkmark',
  },

  type: {
    type: String,
    required: true,
    validate: (value) => Object.values(TYPES).includes(value),
  },

  title: {
    type: String,
    required: false,
    default: null,
  },

  message: {
    type: String,
    required: true,
  },

  timeOut: {
    type: Number,
    required: false,
    default: TIMEOUT_VALUE,
  },

  action: {
    type: Object,
    required: false,
    default: null,
  },
});

const emit = defineEmits(['timer-completed']);

onMounted(() => {
  if (props.timeOut) {
    setTimeout(() => {
      emit('timer-completed');

      handleClose();
    }, props.timeOut);
  }
});

onUnmounted(() => {
  handleClose();
});

const handleClose = () => {
  notifyer.remove(props.id);

  if (props.timeOut && timerId.value) {
    clearTimeout(timerId.value);
  }
};

const handleActionClick = () => {
  props.action?.click?.();

  handleClose();
};
</script>

<style lang="postcss" scoped>
.ui-notify {
  @apply bg-gray-800 text-white rounded-2xl py-4 px-4 max-w-[calc(100vw-24px)] w-max;

  &_error {
    @apply bg-red-500;
  }

  &_success {
    @apply bg-teal-500;
  }

  &_info__message {
    .ui-notify {
      @apply text-white;
    }
  }

  &__wrapper {
    @apply flex items-center justify-start;
  }

  &__icon {
    @apply w-5 h-5;
  }

  &__content {
    @apply pl-4;
  }

  &__main {
    @apply flex items-center justify-between;
  }

  &__text {
    @apply text-sm leading-6 break-all;
  }

  &__button {
    @apply ml-4;
  }

  &__message {
    @apply text-white;

    &_small {
      @apply text-xs;
    }
  }
}
</style>
