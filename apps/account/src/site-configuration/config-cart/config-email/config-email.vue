<template>
  <FormCardLayout
    :title="CARD_TITLE"
    :action-disabled="isActionDisabled"
    :action-pending="isSubmitLoading"
    description="На этот адрес будут приходить уведомления о новых заказах с вашего сайта"
    @on-save="handleSave()"
  >
    <FormView />
  </FormCardLayout>
</template>

<script setup>
import { computed } from 'vue';
import FormView from './components/form-view.vue';
import { CARD_TITLE } from './constants.js';
import { useUpdateEmailSettingsForm } from './form/use-update-email-settings-form.js';
import FormCardLayout from '../../components/form-card-layout.vue';

const { handleSave, isDirty, isSubmitLoading } = useUpdateEmailSettingsForm();

const isActionDisabled = computed(() => !isDirty.value || isSubmitLoading.value);
</script>
