<template>
  <UiCard :title="title" :description="description" :need-divider="needDivider">
    <template #ui-card-button>
      <UiButton
        size="small"
        :disabled="actionDisabled"
        :pending="actionPending"
        @click="$emit('on-save')"
      >
        Сохранить
      </UiButton>
    </template>

    <div class="content">
      <slot />
    </div>
  </UiCard>
</template>

<script setup>
import { UiCard, UiButton } from 'account-ui';

defineEmits(['on-save']);

defineProps({
  title: {
    type: String,
    required: true,
    default: '',
  },

  description: {
    type: String,
    required: false,
    default: '',
  },

  actionDisabled: {
    type: Boolean,
    required: false,
    default: false,
  },

  actionPending: {
    type: Boolean,
    required: false,
    default: false,
  },

  needDivider: {
    type: Boolean,
    required: false,
    default: true,
  },
});
</script>

<style lang="postcss" scoped>
.content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
