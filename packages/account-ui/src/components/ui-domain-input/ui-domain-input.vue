<template>
  <UiInput
    :model-value="value"
    class="domain-input"
    :type="'text'"
    :placeholder="placeholder"
    :is-disabled="isDisabled"
    :error-message="errorMessage"
    :is-success="isSuccess"
    :max-length="maxLength"
    @update:model-value="handleChange"
    @input-blur="handleBlur"
    @keyup.enter="handleEnter"
  >
    <template v-if="placeholderDomain" #right>
      <span ref="placeholderDomainReference" class="domain-input__domain">
        {{ placeholderDomain }}
      </span>
    </template>
  </UiInput>
</template>

<script setup>
import { computed, ref } from 'vue';
import { removeProtocolFromUrl } from './formatters.js';
import UiInput from '../ui-input.vue';

const placeholderDomainReference = ref(null);

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },

  placeholder: {
    type: String,
    required: false,
    default: 'Домен',
  },

  placeholderDomain: {
    type: String,
    required: false,
    default: '',
  },

  errorMessage: {
    type: String,
    default: '',
  },

  isSuccess: {
    type: Boolean,
    default: false,
  },

  isDisabled: {
    type: Boolean,
    default: false,
  },

  maxLength: {
    type: String,
    required: false,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue', 'blur']);

const value = computed(() => {
  return props.modelValue.replaceAll(props.placeholderDomain, '');
});

const domainPlaceholderSize = computed(() => {
  const width = placeholderDomainReference.value?.getBoundingClientRect()?.width;

  return `${width}px`;
});

const mergeDomain = (value) => {
  return `${value}${props.placeholderDomain}`.toLowerCase();
};

const handleChange = (value) => {
  emit('update:modelValue', mergeDomain(removeProtocolFromUrl(value)));
};

const handleReplaceValue = (value) => {
  const replacedValue = removeProtocolFromUrl(value);

  emit('update:modelValue', mergeDomain(replacedValue));
};

const handleBlur = (event) => {
  handleReplaceValue(event.target.value);
};

const handleEnter = () => {
  handleReplaceValue(value.value);
};
</script>

<style lang="postcss" scoped>
.domain-input {
  :deep(.ui-input) {
    padding-right: v-bind(domainPlaceholderSize);
  }

  &__domain {
    @apply absolute bottom-0 right-0 text-sm px-4 py-3 leading-4 text-gray-500;
  }
}
</style>
