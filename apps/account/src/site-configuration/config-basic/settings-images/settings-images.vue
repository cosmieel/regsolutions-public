<template>
  <FormCardLayout
    :title="CARD_TITLE"
    :action-disabled="isActionDisabled"
    :action-pending="isSubmitLoading"
    @on-save="handleSave()"
  >
    <FormView ref="formViewReference" />
  </FormCardLayout>
</template>

<script setup>
import { computed, ref } from 'vue';
import FormView from './components/form-view.vue';
import { CARD_TITLE } from './constants.js';
import { useImagesSettingsForm } from './form/use-images-settings-form.js';
import FormCardLayout from '../../components/form-card-layout.vue';

const formViewReference = ref(null);

const { handleSave, isDirty, isSubmitLoading } = useImagesSettingsForm();

const isActionDisabled = computed(() => {
  const isAnyDropzoneLoading = formViewReference.value?.isSomeImageUploading || false;

  return !isDirty.value || isSubmitLoading.value || isAnyDropzoneLoading;
});
</script>
