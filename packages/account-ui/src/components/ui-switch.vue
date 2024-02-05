<template>
  <div class="ui-switch">
    <div class="ui-switch__main" :class="{ 'hs-tooltip': tooltip }">
      <label class="ui-switch__label" :class="{ 'ui-switch__label_reversed': isReversed }">
        <input
          type="checkbox"
          :value="value"
          :checked="isChecked"
          class="ui-switch__toggle hs-tooltip-toggle"
          :class="{ 'hs-tooltip-toggle': tooltip }"
          @input="updateValue"
        />
        <div v-if="needLabel" class="ui-switch__label-text">
          <slot></slot>
        </div>
      </label>
      <div
        v-if="tooltip"
        class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm"
        role="tooltip"
      >
        {{ tooltip }}
      </div>
    </div>
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
    type: [Boolean, Object],
    default: false,
  },

  tooltip: {
    type: String,
    default: '',
  },

  needLabel: {
    type: Boolean,
    default: false,
  },

  isReversed: {
    type: Boolean,
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
</script>

<style lang="postcss" scoped>
.ui-switch {
  @apply w-full;

  &__main {
    @apply flex items-center;
  }

  &__label {
    @apply flex items-center text-sm leading-6 cursor-pointer;

    &_reversed {
      @apply flex-row-reverse justify-between;
    }
  }

  &__label-text {
    @apply pl-4;

    .ui-switch__label_reversed & {
      @apply pl-0 pr-4;
    }
  }

  &__toggle {
    @apply form-checkbox flex items-center relative w-[42px] h-6 bg-gray-100 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 appearance-none text-gray-100 outline-none ring-0 ring-offset-0;

    &:before {
      @apply absolute content-[''] inline-block w-5 h-5 bg-white translate-x-0 shadow rounded-full transform ring-0 transition ease-in-out duration-200;
    }

    &:checked {
      @apply bg-none bg-blue-700 text-blue-700;

      &:before {
        @apply bg-white translate-x-[calc(100%-2px)];
      }
    }

    &:focus {
      @apply outline-none ring-0 ring-offset-0;

      &:hover {
        @apply ring-4 ring-offset-0 ring-blue-700/20;
      }
    }
  }
}
</style>
