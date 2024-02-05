<template>
  <div class="ds-textarea">
    <label class="ds-textarea__label" :class="labelClass">
      <textarea
        v-model.trim.lazy="textareaValue"
        class="ds-textarea__textarea"
        :disabled="disabled"
        :rows="rows"
        @focus="inFocus = true"
        @blur="updateValue"
      />
      <span
        v-if="label"
        class="ds-textarea__text-label"
        :class="{
          'ds-textarea__text-label_displaced': textareaValue || inFocus,
          'ds-textarea__text-label_disabled': disabled,
        }"
      >
        {{ trimString(label, 32) }}
      </span>
    </label>

    <span v-if="hint" class="ds-textarea__hint" :class="hintClass">
      {{ hint }}
    </span>
  </div>
</template>

<script setup>
import { trimString } from 'site-ui/src/services/trim-string/trim-string.js';
import { ref, computed } from 'vue';

const property = defineProps({
  modelValue: {
    type: [String, Number],
    required: true,
  },

  state: {
    type: String,
    default: 'default',
  },

  label: {
    type: String,
    default: '',
  },

  hint: {
    type: String,
    default: '',
  },

  disabled: {
    type: Boolean,
    default: false,
  },

  rows: {
    type: Number,
    default: 2,
  },

  validate: {
    type: Object,

    default() {
      return;
    },
  },
});

const emit = defineEmits(['update:modelValue']);

const textareaValue = ref(property.modelValue);
const inFocus = ref(false);

const labelClass = computed(() => {
  let labelClass = property.label ? '' : 'ds-textarea__label_no-label';
  labelClass = inFocus.value ? `${labelClass} ds-textarea__label_focused` : labelClass;
  labelClass = property.disabled ? `${labelClass} ds-textarea__label_disabled` : labelClass;
  labelClass =
    property.state && inFocus.value
      ? `ds-textarea__label_default ${labelClass}`
      : `ds-textarea__label_state_${property.state} ${labelClass}`;
  return labelClass;
});

const hintClass = computed(() => {
  return property.disabled
    ? `ds-textarea__hint_state_${property.state} ds-textarea__hint_disabled`
    : `ds-textarea__hint_state_${property.state}`;
});

const updateValue = () => {
  inFocus.value = false;

  emit('update:modelValue', textareaValue.value);

  if (property.validate) {
    property.validate.$touch();
  }
};
</script>

<style lang="postcss">
@import '../../tokens/ui-tokens.css';

.ds-textarea {
  position: relative;

  &__label {
    position: relative;
    display: flex;
    padding: 24px 4px 4px 0px;
    border: none;
    border-radius: $radius-s;
    background-color: var(--bg-input-default);
    transition: background-color 0.2s ease-in;

    &:hover {
      background-color: var(--bg-input-hover);
    }

    &_no-label {
      padding-top: 8px;
    }

    &_focused {
      outline: 1px solid var(--border-input-active);
      background-color: var(--bg-input-active);

      &:hover {
        background-color: var(--bg-input-active);
      }
    }

    &_disabled {
      background-color: var(--bg-input-disable);

      &:hover {
        background-color: var(--bg-input-disable);
      }
    }

    &_state {
      &_error {
        outline: 1px solid var(--border-input-danger);
        background-color: var(--bg-input-danger-default);

        &:hover {
          background-color: var(--bg-input-danger-hover);
        }
      }
    }
  }

  &__text-label {
    position: absolute;
    top: 14px;
    left: 12px;
    @add-mixin b4;
    color: var(--font-secondary);

    @add-mixin desktop-all {
      @add-mixin b3;
    }

    &_displaced {
      top: 6px;
      transform: translateY(0);
      @add-mixin b5;
    }

    &_disabled {
      color: var(--font-disable);
    }
  }

  &__textarea {
    width: 100%;
    padding: 0px 16px 4px 12px;
    border: none;
    border-radius: $radius-s;
    color: var(--font-primary);
    background-color: initial;
    @add-mixin b4;

    &:focus {
      outline: none;
    }
  }

  &__hint {
    position: absolute;
    bottom: -18px;
    color: var(--font-secondary);
    @add-mixin b5;

    &_state {
      &_error {
        color: var(--font-danger);
      }

      &_warning {
        color: var(--font-warning);
      }
    }

    &_disabled {
      color: var(--font-disable);
    }
  }
}
</style>
