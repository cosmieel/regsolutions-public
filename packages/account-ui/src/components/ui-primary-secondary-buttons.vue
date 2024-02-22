<template>
  <div class="primary-secondary-buttons">
    <UiButton
      class="primary-secondary-buttons__button primary-secondary-buttons__button_secondary"
      is-outline
      size="big"
      :disabled="disabledSecondary"
      :pending="pendingSecondary"
      @click="$emit('on-secondary-click')"
    >
      <slot name="secondary" />
    </UiButton>

    <UiButton
      class="primary-secondary-buttons__button primary-secondary-buttons__button_primary"
      size="big"
      :disabled="disabledPrimary"
      :pending="pendingPrimary"
      @click="$emit('on-primary-click')"
    >
      <slot name="primary" />
    </UiButton>
  </div>
</template>

<script setup>
import UiButton from './ui-button.vue';

defineProps({
  disabledPrimary: {
    type: Boolean,
    required: false,
    default: false,
  },

  pendingPrimary: {
    type: Boolean,
    required: false,
    default: false,
  },

  disabledSecondary: {
    type: Boolean,
    required: false,
    default: false,
  },

  pendingSecondary: {
    type: Boolean,
    required: false,
    default: false,
  },
});

defineEmits(['on-primary-click', 'on-secondary-click']);
</script>

<style lang="postcss" scoped>
.primary-secondary-buttons {
  display: flex;
  width: 100%;

  &__button {
    border-radius: 0;
    border: none;
    flex: 1;

    &_secondary {
      background-color: var(--gray-100, #f3f4f6);

      &:hover {
        background-color: var(--gray-200, #ebedf1);
      }
    }
  }
}
</style>
