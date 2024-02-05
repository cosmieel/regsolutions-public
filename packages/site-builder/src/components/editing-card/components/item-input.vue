<template>
  <input
    :type="type"
    class="item-input"
    :value="modelValue"
    :disabled="disabled"
    @input="updateInput"
  />
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: '',
  },

  type: {
    type: String,
    default: 'text',
  },

  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);

function updateInput(event) {
  emit('update:modelValue', event.target.value);
}
</script>

<style lang="postcss" scoped>
.item-input {
  padding: var(--m-outer-radius, 8px) 12px;
  border-radius: var(--m-outer-radius, 8px);
  border: 1px solid var(--gray-200, #ebedf1);
  background: var(--gray-50, #f9fafb);
  color: var(--gray-700, var(--colors-gray-700, #374151));
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;

  &:hover {
    outline: 1.3px solid var(--blue-500, #4f7fff);
  }

  &:focus {
    outline: 2px solid var(--blue-500, #4f7fff);
  }

  &:disabled {
    color: #ebedf1;
    outline: none;
  }
}
</style>
