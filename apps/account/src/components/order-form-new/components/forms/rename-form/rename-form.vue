<template>
  <div class="rename-form">
    <FormInput :name="NAME_KEY" type="text" class="rename-form__input" />
    <UiButton is-outline class="rename-form__action" :disabled="!isDirty" @click="handleSave">
      <UiIcon name="checkmark" :size="16" />
    </UiButton>
  </div>
</template>

<script setup>
import FormInput from 'account/src/components/form/form-input.vue';
import { UiButton, UiIcon } from 'account-ui';
import { useForm } from 'vee-validate';
import { computed } from 'vue';
import { NAME_KEY } from './constants.js';
import { getInitialValues } from './data.js';
import { validationSchema } from './validation-schema.js';

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['change']);

const { handleSubmit, resetForm, initialValues, meta } = useForm({
  initialValues: getInitialValues({ name: props.name }),
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
.rename-form {
  @apply w-full flex;

  &__input {
    @apply w-64 h-16;
  }

  &__action {
    @apply w-10 h-10 flex-none ml-[8px];

    svg {
      @apply flex-none;
    }
  }
}
</style>
