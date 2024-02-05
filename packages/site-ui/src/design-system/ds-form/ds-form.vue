<template>
  <form class="ds-form" :class="{ 'ds-form_inverse': inverse }" @submit.prevent="sendForm">
    <h3 v-if="title" class="ds-form__title">{{ title }}</h3>
    <p v-if="description" class="ds-form__description">{{ description }}</p>
    <template v-for="formItem in fields" :key="formItem.name">
      <DsTextarea
        v-if="formItem.type === 'textarea'"
        v-model="formData[formItem.name]"
        :label="formItem.label"
        class="ds-form__item"
        :state="getState(formItem.name, v$)"
        :hint="getHint(formItem.name, v$)"
        :validate="v$[formItem.name]"
      />
      <DsInput
        v-else
        v-model="formData[formItem.name]"
        :label="formItem.label"
        class="ds-form__item"
        :type="formItem.type"
        :state="getState(formItem.name, v$)"
        :hint="getHint(formItem.name, v$)"
        :validate="v$[formItem.name]"
      />
    </template>

    <slot />

    <DsButton
      type="submit"
      :color="button.color"
      :size="button.size"
      :disabled="button.disabled"
      :stretch="true"
      :text="button.text"
      :icon="button.icon"
    />

    <p v-if="privacyText" class="ds-form__privacy" v-html="privacyText"></p>
  </form>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core';
import DsButton from 'site-ui/src/design-system/ds-button/ds-button.vue';
import DsInput from 'site-ui/src/design-system/ds-input/ds-input.vue';
import DsTextarea from 'site-ui/src/design-system/ds-textarea/ds-textarea.vue';
import { reactive, toRaw } from 'vue';
import { getFormData } from './get-form-data.js';
import { getHint } from './get-hint.js';
import { getRules } from './get-rules.js';
import { getState } from './get-state.js';

const property = defineProps({
  title: {
    type: String,
    default: '',
  },

  description: {
    type: String,
    default: '',
  },

  button: {
    type: Object,

    default() {
      return;
    },
  },

  privacyText: {
    type: String,
    default: '',
  },

  fields: {
    type: Array,
    required: true,
  },

  inverse: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['submit']);

const rules = getRules(property.fields);
const formData = reactive(getFormData(property.fields));

const v$ = useVuelidate(rules, formData);

async function sendForm() {
  const result = await v$.value.$validate();

  if (result) {
    emit('submit', toRaw(formData));
  }
}
</script>

<style scoped lang="postcss">
@import '../../tokens/ui-tokens.css';

.ds-form {
  display: flex;
  position: relative;
  flex-direction: column;

  &_inverse {
    & .ds-form__title {
      color: var(--font-primary-inverse);
    }

    & .ds-form__description {
      color: var(--font-secondary-inverse);
    }

    & .ds-form__privacy {
      color: var(--font-secondary-inverse);
    }
  }

  &__title {
    text-align: center;
    margin-bottom: 16px;
    color: var(--font-primary);
    font-weight: 700;
    @add-mixin h5;

    @add-mixin desktop-all {
      @add-mixin h3;
    }
  }

  &__description {
    text-align: center;
    margin-bottom: 40px;
    color: var(--font-thertiary);
    font-weight: 400;
    white-space: pre-wrap;
    @add-mixin b4;

    @add-mixin desktop-all {
      @add-mixin b3;
    }
  }

  &__privacy {
    text-align: center;
    margin-top: 10px;
    color: var(--font-secondary);
    font-weight: 400;
    white-space: pre-wrap;
    @add-mixin b5;

    @add-mixin desktop-all {
      @add-mixin b4;
    }
  }

  &__item {
    margin-bottom: 32px;
  }
}
</style>
