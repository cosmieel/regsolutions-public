<template>
  <div class="ui-checkbox">
    <label class="ui-checkbox__label">
      <input
        type="checkbox"
        :value="value"
        :checked="isChecked"
        class="ui-checkbox__input focus:ring-blue-500"
        @change="updateValue"
      />
      <slot></slot>
    </label>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: [Array, Boolean],
    required: true,
  },

  value: {
    type: [Boolean, Object, Number],
    default: false,
  },
});
const emit = defineEmits(['update:modelValue']);

const isChecked = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.includes(props.value);
  }

  return props.modelValue;
});

const updateValue = function () {
  let model = props.modelValue;

  if (Array.isArray(model)) {
    if (isChecked.value) {
      model.splice(model.indexOf(props.value), 1);
    } else {
      model.push(props.value);
    }
  } else {
    model = !model;
  }

  emit('update:modelValue', model);
};

// const model = computed({
//   get() {
//     return props.modelValue;
//   },
//   set(value) {
//     emit('update:modelValue', value);
//   },
// });
</script>

<style lang="postcss" scoped>
.ui-checkbox {
  &__label {
    @apply flex justify-start items-center;
  }

  &__input {
    @apply form-checkbox shrink-0 border-gray-300 bg-gray-50 rounded text-blue-500;

    &:hover {
      @apply border-white ring-4 ring-gray-100;
    }

    &:focus {
      @apply border-blue-500 outline-none ring-4 ring-blue-100 ring-offset-0;
    }
  }
}
</style>
