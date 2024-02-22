<template>
  <FormCardLayout
    :title="CARD_TITLE"
    :action-pending="isSubmitLoading"
    :action-disabled="isActionDisabled"
    :need-divider="false"
    description="Пользователи вашего сайта будут заполнять эту форму перед оплатой всех товаров в корзине"
    @on-save="handleSave()"
  >
    <FormOrder />
  </FormCardLayout>
</template>

<script setup>
import FormOrder from 'account/src/components/form/form-order/form-order.vue';
import { computed } from 'vue';
import { CARD_TITLE } from './constants.js';
import { useUpdateConfigOrderForm } from './form/use-update-config-order-form.js';
import FormCardLayout from '../../components/form-card-layout.vue';

const { handleSave, isDirty, isSubmitLoading } = useUpdateConfigOrderForm();

const isActionDisabled = computed(() => !isDirty.value || isSubmitLoading.value);
</script>
