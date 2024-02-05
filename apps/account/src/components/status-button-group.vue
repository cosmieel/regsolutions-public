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
      class="status-button-group__button"
      :class="{ 'status-button-group__button_pending': isPending }"
      :pending="isPending"
      :disabled="isPending"
      is-outline
      size="small"
      is-button-icon
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
});

const statusText = computed(() => {
  if (props.isSuccess) {
    return props.successfulStatusText;
  }

  return props.unsuccessfulStatusText;
});
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
