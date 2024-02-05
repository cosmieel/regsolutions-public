<template>
  <FormCardLayout
    :title="CARD_TITLE"
    :action-disabled="isActionDisabled"
    :action-pending="isSubmitLoading"
    @on-save="handleSave()"
  >
    <FormView />
    <PreviewView />
  </FormCardLayout>
</template>

<script setup>
import { computed } from 'vue';
import FormView from './components/form-view.vue';
import PreviewView from './components/preview-view.vue';
import { CARD_TITLE } from './constants.js';
import { useUpdatePageBasicSettings } from './form/use-update-page-basic-settings.js';
import FormCardLayout from '../../components/form-card-layout.vue';

const { handleSave, isDirty, isSubmitLoading } = useUpdatePageBasicSettings();

const isActionDisabled = computed(() => !isDirty.value || isSubmitLoading.value);
</script>
