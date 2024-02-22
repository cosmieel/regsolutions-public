<template>
  <NestedMenu
    ref="menuReference"
    trigger-icon="settings"
    trigger-label="Настроить ссылки"
    @close="handleReset"
  >
    <TermsSettingsForm
      ref="termsSettingsFormReference"
      :policy-link="terms.policyLink"
      :rules-link="terms.rulesLink"
      @change="handleChangeForm"
    />
  </NestedMenu>
</template>

<script setup>
import { ref } from 'vue';
import TermsSettingsForm from '../forms/terms-settings-form/terms-settings-form.vue';
import NestedMenu from '../menu/nested-menu.vue';

defineProps({
  terms: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['change-form']);

const menuReference = ref(null);
const termsSettingsFormReference = ref(null);

const handleReset = () => {
  termsSettingsFormReference.value?.handleReset();
};

const handleChangeForm = (value) => {
  emit('change-form', value);

  menuReference.value?.handleClose?.();
};
</script>
