<template>
  <div class="terms-settings-form">
    <div class="terms-settings-form__row">
      <FormInput
        :name="RULES_URL_KEY"
        label="Правила пользования сайтом"
        type="text"
        class="terms-settings-form__input"
      />
    </div>
    <div class="terms-settings-form__row">
      <FormInput
        :name="POLICY_URL_KEY"
        label="Политика обработки данных"
        type="text"
        class="terms-settings-form__input terms-settings-form__input_action"
      >
        <template #right>
          <UiButton
            is-outline
            class="terms-settings-form__action"
            :disabled="!isDirty"
            @click="handleSave"
          >
            <UiIcon name="checkmark" :size="16" />
          </UiButton>
        </template>
      </FormInput>
    </div>
  </div>
</template>

<script setup>
import FormInput from 'account/src/components/form/form-input.vue';
import { UiButton, UiIcon } from 'account-ui';
import { useForm } from 'vee-validate';
import { computed } from 'vue';
import { RULES_URL_KEY, POLICY_URL_KEY } from './constants.js';
import { getInitialValues } from './data.js';
import { validationSchema } from './validation-schema.js';

const props = defineProps({
  rulesLink: {
    type: String,
    required: true,
  },

  policyLink: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['change']);

const { handleSubmit, resetForm, initialValues, meta } = useForm({
  initialValues: getInitialValues({
    [RULES_URL_KEY]: props.rulesLink,
    [POLICY_URL_KEY]: props.policyLink,
  }),
  validationSchema,
});

const isDirty = computed(() => meta.value.dirty);

const handleSave = () =>
  handleSubmit((values) => {
    emit('change', values);

    handleReset(values);
  })();

const handleReset = (values) => {
  resetForm({
    values: values || initialValues.value,
  });
};

defineExpose({
  handleReset,
});
</script>

<style lang="postcss" scoped>
.terms-settings-form {
  @apply flex flex-col gap-[16px];

  &__row {
    @apply w-full flex;
  }

  &__input {
    @apply w-64 h-16;

    &_action {
      :deep(.ui-input__input-wrapper) {
        @apply flex gap-[8px];
      }
    }
  }

  &__action {
    @apply w-10 h-10 flex-none;

    svg {
      @apply flex-none;
    }
  }
}
</style>
