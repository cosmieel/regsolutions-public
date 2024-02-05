<template>
  <div>
    <div class="relative">
      <label>
        <span v-if="label" class="ui-input__label">{{ label }}</span>
        <div class="ui-input__input-wrapper">
          <span v-if="isSuccess" class="ui-input__success">
            <UiIcon name="checkmark" :size="18" />
          </span>
          <slot name="left" />
          <input
            :name="name"
            :value="modelValue"
            :type="type"
            :placeholder="placeholder"
            :disabled="isDisabled"
            class="ui-input"
            :class="{
              'ui-input_invalid': errorMessage,
              'ui-input_success': isSuccess,
              'ui-input_trailing': trailing,
              'ui-input_disabled': isDisabled,
            }"
            :maxlength="maxLength"
            @input="updateInput"
            @focus="onFocus"
            @blur="onBlur"
          />
          <span v-if="trailing" class="ui-input__trailing">
            {{ trailing }}
          </span>
          <slot name="right" />
        </div>
      </label>
    </div>
    <p v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup>
import UiIcon from './ui-icon.vue';

defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },

  name: {
    type: String,
    required: false,
    default: undefined,
  },

  type: {
    type: String,
    required: true,
  },

  placeholder: {
    type: String,
    required: true,
  },

  errorMessage: {
    type: String,
    default: '',
  },

  isSuccess: {
    type: Boolean,
    default: false,
  },

  label: {
    type: String,
    default: '',
  },

  trailing: {
    type: String,
    default: '',
  },

  maxLength: {
    type: String,
    default: '',
  },

  isDisabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue', 'input-focus', 'input-blur']);

function updateInput(event) {
  emit('update:modelValue', event.target.value);
}

function onFocus(event) {
  emit('input-focus', event);
}

function onBlur(event) {
  emit('input-blur', event);
}
</script>

<style lang="postcss" scoped>
.ui-input {
  @apply form-input py-[11px] px-[15px] block w-full bg-gray-50 border border-gray-200 max-h-10 rounded-lg text-sm text-gray-700 leading-4 transition duration-100;
  &:not(.ui-input_disabled, .ui-input_invalid, .ui-input_success) {
    &:hover {
      @apply border-white ring-1 ring-offset-0 ring-blue-500 border-blue-500;
    }
  }

  &:focus {
    @apply border-blue-500 outline-none ring-1 bg-white;
  }

  &::placeholder {
    @apply text-gray-400;
  }

  &_invalid {
    @apply bg-white border-red-100 ring-4 ring-red-100;

    &:hover {
      @apply border-red-100 ring-4 ring-red-100;
    }

    &:focus {
      @apply border-red-100 ring-4 ring-red-100;
    }
  }

  &_success {
    @apply bg-white border-blue-500 ring-4 ring-blue-100 pl-[43px];

    &:hover {
      @apply border-blue-500 ring-4 ring-blue-100;
    }

    &:focus {
      @apply border-blue-500 ring-4 ring-blue-100;
    }
  }

  &_trailing {
    @apply pr-[112px];
  }

  &__label {
    @apply block text-xs text-[13px] mb-2 text-left text-gray-500;
  }

  &__input-wrapper {
    @apply relative;
  }

  &__trailing {
    @apply absolute bottom-0 right-0 text-sm px-4 py-3 leading-4;
  }

  &__success {
    @apply absolute bottom-0 left-0 z-10 px-4 py-3;
  }
}

.error-message {
  @apply text-sm text-left text-red-400 leading-none relative top-3;
}
</style>
