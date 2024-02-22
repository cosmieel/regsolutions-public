<template>
  <FormCardLayout
    :title="CARD_TITLE"
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
import { useUpdateSeoSettings } from './form/use-update-seo-settings.js';
import FormCardLayout from '../../components/form-card-layout.vue';

const { handleSave, isDirty, isSubmitLoading } = useUpdateSeoSettings();

const isActionDisabled = computed(() => !isDirty.value || isSubmitLoading.value);
</script>
