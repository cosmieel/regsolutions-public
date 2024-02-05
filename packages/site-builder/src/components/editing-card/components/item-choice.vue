<template>
  <div class="item-choice">
    <button class="item-choice__button" :disabled="modelValue" @click="updateChoice(true)">
      Да
    </button>
    <button class="item-choice__button" :disabled="!modelValue" @click="updateChoice(false)">
      Нет
    </button>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);

function updateChoice(value) {
  emit('update:modelValue', value);
}
</script>

<style lang="postcss" scoped>
.item-choice {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  padding: 4px;
  border-radius: 8px;
  background: var(--gray-50, #f9fafb);

  &__button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 32px;
    padding: 0px 16px;
    border-radius: 6px;
    background: var(--gray-50, #f9fafb);
    box-shadow: none;
    font-size: 13px;

    &:hover {
      background: var(--gray-100, #f3f4f6);
    }

    &:disabled {
      background: var(--white-white, #fff);
      box-shadow: 0px 2px 6px 0px rgba(46, 64, 100, 0.08), 0px 4px 16px 0px rgba(46, 64, 100, 0.04);
    }

    &:disabled&:hover {
      background: var(--white-white, #fff);
    }
  }

  &:focus {
    outline: none;
  }
}
</style>
