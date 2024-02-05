<template>
  <label class="item-checkbox" :class="{ 'item-checkbox_disabled': disabled }">
    <input
      class="item-checkbox__input"
      type="checkbox"
      hidden
      :disabled="disabled"
      :checked="modelValue"
      @change="updateCheckbox"
    />

    <div class="item-checkbox__item">
      <svg
        class="item-checkbox__mark"
        width="11"
        height="8"
        viewBox="0 0 11 8"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.14404 0.473692C9.20376 0.412763 9.27503 0.364359 9.35368 0.331315C9.43234 0.29827 9.51679 0.28125 9.60211 0.28125C9.68742 0.28125 9.77188 0.29827 9.85053 0.331315C9.92918 0.364359 10.0005 0.412763 10.0602 0.473692C10.3104 0.726567 10.3139 1.13519 10.0689 1.39244L4.89504 7.50869C4.8363 7.5732 4.76502 7.62504 4.68555 7.66105C4.60608 7.69706 4.5201 7.71648 4.43287 7.71811C4.34565 7.71975 4.259 7.70358 4.17824 7.67058C4.09747 7.63758 4.02429 7.58845 3.96317 7.52619L0.814919 4.33594C0.693501 4.21212 0.625488 4.04561 0.625488 3.87219C0.625488 3.69877 0.693501 3.53227 0.814919 3.40844C0.874634 3.34751 0.945905 3.29911 1.02456 3.26606C1.10321 3.23302 1.18767 3.216 1.27298 3.216C1.35829 3.216 1.44275 3.23302 1.5214 3.26606C1.60006 3.29911 1.67133 3.34751 1.73104 3.40844L4.40154 6.11482L9.12654 0.492942C9.13199 0.48618 9.13783 0.479752 9.14404 0.473692Z"
        />
      </svg>
    </div>

    <div class="item-checkbox__content">
      <slot></slot>
    </div>
  </label>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },

  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);

function updateCheckbox(event) {
  emit('update:modelValue', event.target.checked);
}
</script>

<style lang="postcss" scoped>
.item-checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 12px;
  padding: 8px;

  &.item-checkbox_disabled {
    opacity: 0.5;
    cursor: default;
  }

  &__input {
    &[type='checkbox']:checked + .item-checkbox__item {
      background: var(--blue-700, #3755fa);
      border: 1px solid var(--blue-700, #3755fa);

      .item-checkbox__mark {
        opacity: 1;
      }
    }
  }

  &__item {
    width: 16px;
    height: 16px;
    border-radius: 4px;
    border: 1px solid var(--gray-300, #d7dadf);
    color: var(--white-white, #fff);
    display: flex;
    justify-content: center;
    align-items: center;

    .item-checkbox__mark {
      opacity: 0;
    }
  }

  &__content {
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    color: var(--gray-700, var(--colors-gray-700, #374151));
  }
}
</style>
