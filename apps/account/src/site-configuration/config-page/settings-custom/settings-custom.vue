<template>
  <FormCardLayout
    :title="CARD_TITLE"
    :action-disabled="isActionDisabled"
    :action-pending="isSubmitLoading"
    description='description="Добавленый код будет применен ко всем страницам на сайте"'
    @on-save="handleSave()"
  >
    <FormView />
  </FormCardLayout>
</template>

<script setup>
import { computed } from 'vue';
import FormView from './components/form-view.vue';
import { CARD_TITLE } from './constants.js';
import { useUpdatePageSettingsForm } from './form/use-update-page-settings-form.js';
import FormCardLayout from '../../components/form-card-layout.vue';

const { handleSave, isDirty, isSubmitLoading } = useUpdatePageSettingsForm();

const isActionDisabled = computed(() => !isDirty.value || isSubmitLoading.value);
</script>
