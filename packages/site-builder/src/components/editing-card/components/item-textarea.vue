<template>
  <textarea
    class="item-textarea"
    :value="modelValue"
    :rows="rows"
    :disabled="disabled"
    @input="updateTextarea"
  />
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: '',
  },

  rows: {
    type: Number,
    default: 6,
  },

  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);

function updateTextarea(event) {
  emit('update:modelValue', event.target.value);
}
</script>

<style lang="postcss" scoped>
.item-textarea {
  max-height: 380px;
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

  &:disabled {
    color: #ebedf1;
  }
}
</style>
