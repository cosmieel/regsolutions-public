<template>
  <UiInput
    :model-value="localValue"
    class="ui-search-input"
    :class="{ 'ui-search-input_not-empty': !!localValue }"
    placeholder="Поиск по домену"
    type="text"
    @update:model-value="handleDebounce"
  >
    <template #right>
      <UiButton
        v-if="!!localValue"
        class="ui-search-input__clear"
        size="small"
        is-button-icon
        is-ghost
        @click="handleClear"
      >
        <UiIcon name="close" :size="12" />
      </UiButton>
    </template>
  </UiInput>
</template>

<script setup>
import debounce from 'lodash.debounce';
import { ref, watch } from 'vue';
import UiButton from '../ui-button.vue';
import UiIcon from '../ui-icon.vue';
import UiInput from '../ui-input.vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },

  debounceTime: {
    type: Number,
    default: 300,
  },
});

const localValue = ref();

watch(
  () => props.modelValue,
  (value) => {
    localValue.value = value;
  }
);

const emit = defineEmits(['update:modelValue']);

const handleChange = (value) => {
  localValue.value = value;

  emit('update:modelValue', decodeURIComponent(value));
};

const handleDebounce = debounce(handleChange, props.debounceTime);

const handleClear = () => {
  localValue.value = '';

  emit('update:modelValue', '');
};
</script>

<style lang="postcss" scoped>
.ui-search-input {
  :deep(.ui-input__input-wrapper) {
    @apply flex relative;
  }

  &__clear {
    @apply absolute right-1 top-[5px] max-w-[32px];
  }

  &_not-empty {
    :deep(.ui-input) {
      @apply pr-[44px];
    }
  }
}
</style>
