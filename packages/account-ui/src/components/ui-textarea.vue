<template>
  <div>
    <div class="relative">
      <label>
        <div class="ui-textarea__head">
          <span v-if="label" class="ui-textarea__label">{{ label }}</span>
          <span v-if="counter" class="ui-textarea__counter">{{ currentCount }}/{{ counter }}</span>
        </div>
        <textarea
          :value="modelValue"
          :disabled="isDisabled"
          :placeholder="placeholder"
          class="ui-textarea"
          :class="{
            'ui-textarea_invalid': errorMessage,
            'ui-textarea_disabled': isDisabled,
          }"
          rows="3"
          :maxlength="maxLength || counter"
          @input="updateTextarea"
        ></textarea>
      </label>
    </div>
    <p v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },

  placeholder: {
    type: String,
    required: true,
  },

  label: {
    type: String,
    default: '',
  },

  counter: {
    type: String,
    default: '',
  },

  maxLength: {
    type: String,
    default: '',
  },

  errorMessage: {
    type: String,
    default: '',
  },

  isDisabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);

function updateTextarea(event) {
  emit('update:modelValue', event.target.value);
}

const currentCount = ref('');

const setCurrentCount = (value) => {
  currentCount.value = value.length > 0 ? value.length : '';
};

watch(
  () => props.modelValue,
  (value) => {
    setCurrentCount(value);
  }
);

onMounted(() => {
  setCurrentCount(props.modelValue);
});
</script>

<style lang="postcss" scoped>
.ui-textarea {
  @apply form-textarea py-[11px] px-[15px] block w-full bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 leading-4 transition duration-100;

  &:not(.ui-textarea_disabled) {
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
    @apply border-red-100 ring-4 ring-red-100;

    &:hover {
      @apply border-red-100 ring-4 ring-red-100;
    }

    &:focus {
      @apply border-red-100 ring-4 ring-red-100;
    }
  }

  &__head {
    @apply flex justify-between mb-2;
  }

  &__label {
    @apply text-xs text-[13px] text-gray-500 text-left;
  }

  &__counter {
    @apply text-sm leading-4 text-gray-400 text-right;
  }
}

.error-message {
  @apply text-sm text-left text-red-400 leading-none relative top-3;
}
</style>
