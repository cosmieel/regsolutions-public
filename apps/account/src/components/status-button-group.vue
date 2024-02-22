<template>
  <div class="status-button-group">
    <UiBadge
      class="status-button-group__status"
      :red="!isSuccess"
      :icon="isSuccess ? 'circle-checkmark' : ''"
    >
      {{ statusText }}
    </UiBadge>

    <UiButton
      v-if="withAction"
      class="status-button-group__button"
      :class="{ 'status-button-group__button_pending': isPending }"
      :pending="isPending"
      :disabled="isPending || isDisabled"
      is-outline
      size="small"
      is-button-icon
      @click="$emit('action')"
    >
      <UiIcon name="retry" :size="16" />
    </UiButton>
  </div>
</template>

<script setup>
import { UiBadge, UiButton, UiIcon } from 'account-ui';
import { computed } from 'vue';

const props = defineProps({
  isSuccess: {
    type: Boolean,
    default: true,
  },

  unsuccessfulStatusText: {
    type: String,
    default: '',
  },

  successfulStatusText: {
    type: String,
    default: '',
  },

  isPending: {
    type: Boolean,
    default: false,
  },

  isDisabled: {
    type: Boolean,
    required: false,
    default: false,
  },

  withAction: {
    type: Boolean,
    required: false,
    default: true,
  },
});

const statusText = computed(() => {
  if (props.isSuccess) {
    return props.successfulStatusText;
  }

  return props.unsuccessfulStatusText;
});

defineEmits(['action']);
</script>

<style lang="postcss" scoped>
.status-button-group {
  @apply flex;

  &__status {
    @apply mr-2;
  }

  &__button {
    @apply w-8;

    &_pending {
      :deep(.ui-button__spinner) {
        @apply hidden;
      }

      :deep(.ui-button__inner) {
        @apply text-inherit;
      }

      svg {
        @apply animate-spin;
      }
    }
  }
}
</style>
