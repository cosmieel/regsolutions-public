<template>
  <UiInput
    class="promo-code-input"
    :class="{ 'promo-code-input_not-empty': !!modelValue }"
    :model-value="modelValue"
    placeholder="Промокод"
    type="text"
    @update:model-value="handleChange"
  >
    <template #right>
      <UiButton
        v-if="!!modelValue"
        class="promo-code-input__clear"
        size="small"
        is-button-icon
        is-ghost
        @click="handleClear"
      >
        <UiIcon name="close" :size="16" />
      </UiButton>
    </template>
  </UiInput>
</template>

<script setup>
import { UiInput, UiIcon, UiButton } from 'account-ui';

defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

const handleChange = (value) => {
  emit('update:modelValue', value);
};

const handleClear = () => {
  emit('update:modelValue', '');
};
</script>

<style lang="postcss" scoped>
.promo-code-input {
  :deep(.ui-input__input-wrapper) {
    display: flex;
    position: relative;
  }

  :deep(.ui-input) {
    padding: 8px 12px;
  }

  &__clear {
    max-width: 18px;
    min-width: 18px;
    height: 18px;
    padding: 0;
    position: absolute;
    right: 12px;
    top: 8px;
  }

  &_not-empty {
    :deep(.ui-input) {
      padding-right: 44px;
    }
  }
}
</style>
