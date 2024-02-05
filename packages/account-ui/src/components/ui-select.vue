<template>
  <div>
    <div class="relative">
      <label>
        <span v-if="label" class="ui-select__label">
          {{ label }}
        </span>
        <div class="ui-select__input-wrapper">
          <select
            :value="modelValue"
            :class="{ 'ui-select_invalid': errorMessage }"
            class="ui-select"
            @change="updateSelect"
          >
            <option v-for="option in options" :key="option.value" :value="option.value">
              {{ option.name }}
            </option>
          </select>
        </div>
      </label>
    </div>
    <p v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },

  options: {
    type: Array,
    default: () => [],
  },

  label: {
    type: String,
    default: '',
  },

  errorMessage: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

function updateSelect(event) {
  emit('update:modelValue', event.target.value);
}
</script>

<style lang="postcss" scoped>
.ui-select {
  @apply form-select py-[11px] px-[15px] block w-full bg-gray-50 border border-gray-200 max-h-10 rounded-lg text-sm text-gray-700 leading-4 transition duration-100;

  &:hover {
    @apply border-white ring-1 ring-offset-0 ring-blue-500 border-blue-500;
  }

  &:focus {
    @apply border-blue-500 outline-none ring-1 bg-white;
  }

  &::placeholder {
    @apply text-gray-400;
  }

  &_invalid {
    @apply border-red-100 ring-4 ring-red-100;

    &:hover {
      @apply border-red-100 ring-4 ring-red-100;
    }

    &:focus {
      @apply border-red-100 ring-4 ring-red-100;
    }
  }

  &__label {
    @apply block text-xs text-[13px] text-gray-500 mb-2 text-left;
  }

  &__input-wrapper {
    @apply relative;
  }
}

.error-message {
  @apply text-sm text-left text-red-400 leading-none relative top-3;
}
</style>
