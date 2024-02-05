<template>
  <FormCardLayout
    :title="CARD_TITLE"
    description="Добавленый код будет применен ко всем страницам на сайте"
    :action-disabled="isActionDisabled"
    :action-pending="isSubmitLoading"
    @on-save="handleSave()"
  >
    <FormView />
  </FormCardLayout>
</template>

<script setup>
import { computed } from 'vue';
import FormView from './components/form-view.vue';
import { CARD_TITLE } from './constants.js';
import { useUpdateCustomSettingsForm } from './form/use-update-custom-settings-form.js';
import FormCardLayout from '../../components/form-card-layout.vue';

const { handleSave, isDirty, isSubmitLoading } = useUpdateCustomSettingsForm();

const isActionDisabled = computed(() => !isDirty.value || isSubmitLoading.value);
</script>
