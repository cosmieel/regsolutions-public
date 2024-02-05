<template>
  <div class="ds-input">
    <label v-if="label" class="ds-input__label">
      <input
        v-model.trim.lazy="inputValue"
        class="ds-input__input"
        :class="inputClass"
        :type="type"
        :disabled="disabled"
        @focus="displaceLabel"
        @blur="updateValue"
      />
      <span
        ref="textLabel"
        class="ds-input__text-label"
        :class="{
          'ds-input__text-label_displaced': inputValue,
          'ds-input__text-label_disabled': disabled,
        }"
      >
        {{ trimString(label, 32) }}
      </span>
    </label>

    <input
      v-else
      v-model.trim.lazy="inputValue"
      class="ds-input__input"
      :class="inputClass"
      :type="type"
      :disabled="disabled"
      @blur="updateValue"
    />

    <button
      v-if="inputValue && !disabled"
      class="ds-input__close-button"
      aria-label="Close"
      @click="deleteValue"
    >
      <DsIcon name="close" :size="16" />
    </button>

    <span v-if="hint" class="ds-input__hint" :class="hintClass">
      {{ hint }}
    </span>
  </div>
</template>

<script setup>
import DsIcon from 'site-ui/src/design-system/ds-icon/ds-icon.vue';
import { trimString } from 'site-ui/src/services/trim-string/trim-string.js';
import { ref, computed } from 'vue';

const property = defineProps({
  modelValue: {
    type: [String, Number],
    required: true,
  },

  type: {
    type: String,
    default: 'text',
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

  validate: {
    type: Object,

    default() {
      return;
    },
  },
});

const emit = defineEmits(['update:modelValue']);

const inputValue = ref(property.modelValue);
const textLabel = ref();

const inputClass = computed(() => {
  return property.label
    ? `ds-input__input_with-label ds-input__input_state_${property.state}`
    : `ds-input__input_state_${property.state}`;
});

const hintClass = computed(() => {
  return property.disabled
    ? `ds-input__hint_state_${property.state} ds-input__hint_disabled`
    : `ds-input__hint_state_${property.state}`;
});

const updateValue = () => {
  if (!inputValue.value && textLabel.value) {
    textLabel.value.classList.remove('ds-input__text-label_displaced');
  }

  emit('update:modelValue', inputValue.value);

  if (property.validate) {
    property.validate.$touch();
  }
};

const displaceLabel = () => {
  if (textLabel.value.classList.contains('ds-input__text-label_displaced')) {
    return;
  }

  textLabel.value.classList.add('ds-input__text-label_displaced');
};

const deleteValue = () => {
  inputValue.value = '';
  updateValue();
};
</script>

<style lang="postcss">
@import '../../tokens/ui-tokens.css';

.ds-input {
  position: relative;

  &__label {
    position: relative;
    display: block;
  }

  &__text-label {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
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

  &__input {
    width: 100%;
    padding: 15px 36px 15px 12px;
    border: none;
    border-radius: $radius-s;
    color: var(--font-primary);
    background-color: var(--bg-input-default);
    transition: background-color 0.2s ease-in;
    @add-mixin b4;

    @add-mixin desktop-all {
      padding: 14px 36px 14px 12px;
    }

    &_with-label {
      padding: 23px 36px 7px 12px;

      @add-mixin desktop-all {
        padding: 22px 36px 6px 12px;
      }
    }

    &:hover {
      background-color: var(--bg-input-hover);
    }

    &:focus {
      outline: 1px solid var(--border-input-active);
      background-color: var(--bg-input-active);
    }

    &:disabled {
      background-color: var(--bg-input-disable);
    }

    &_state_error {
      outline: 1px solid var(--border-input-danger);
      background-color: var(--bg-input-danger-default);

      &:hover {
        background-color: var(--bg-input-danger-hover);
      }

      &:focus {
        outline: 1px solid var(--border-input-active);
        background-color: var(--bg-input-active);
      }

      &:disabled {
        background-color: var(--bg-input-disable);
      }
    }
  }

  &__close-button {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 10px;
    right: 10px;
    padding: 6px;
    color: var(--font-secondary);
    border: 0;
    background: none;
    cursor: pointer;
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
