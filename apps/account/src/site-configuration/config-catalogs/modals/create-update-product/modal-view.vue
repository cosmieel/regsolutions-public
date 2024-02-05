<template>
  <div class="modal-create-product" style="margin-top: 0">
    <div class="modal-create-product__container">
      <div class="modal-create-product__head">
        <div class="modal-create-product__title">
          {{ isEditing ? 'Редактировать' : 'Добавить' }} товар
        </div>
        <div class="modal-create-product__catalog">{{ catalogName?.name }}</div>

        <div class="modal-create-product__close">
          <UiButton
            class="modal-create-product__close-button"
            size="small"
            is-ghost
            is-button-icon
            @click="handleClose"
          >
            <UiIcon name="close" :size="16" />
          </UiButton>
        </div>
      </div>
      <div class="modal-create-product__body">
        <ContentWrapper>
          <InfoFields />

          <UiPrimarySecondaryButtons
            class="modal-create-product__controls"
            :disabled-primary="isActionsDisabled"
            :disabled-secondary="isActionsDisabled"
            @on-primary-click="handleSave()"
            @on-secondary-click="handleSaveAndClose()"
          >
            <template #secondary>Сохранить и закрыть</template>
            <template #primary>Сохранить</template>
          </UiPrimarySecondaryButtons>
        </ContentWrapper>
      </div>
    </div>
  </div>
</template>

<script setup>
import { modalManager } from 'account/src/instances/modal-manager.js';
import { callDiscardUnsavedDataModal } from 'account/src/utility/modals/unsaved/discard-unsaved-data-modal.js';
import { UiButton, UiIcon, UiPrimarySecondaryButtons } from 'account-ui';
import { computed } from 'vue';
import ContentWrapper from './component/content-wrapper.vue';
import InfoFields from './component/info-fields.vue';
import { useCreateUpdateProductForm } from './form/use-create-update-product-form.js';

const {
  catalogsList,
  isEditing,
  values,
  isSubmitLoading,
  isDirty,
  isMediaLoading,
  handleSave,
  handleSaveAndClose,
} = useCreateUpdateProductForm();

const catalogName = computed(() =>
  catalogsList.value.find((item) => String(item.value) === String(values.catalogId))
);

const isActionsDisabled = computed(
  () => !isDirty.value || isSubmitLoading.value || isMediaLoading.value
);

const handleClose = () => {
  if (isDirty.value) {
    return callDiscardUnsavedDataModal(() => modalManager.close());
  }

  modalManager.close();
};
</script>

<style lang="postcss" scoped>
.modal-create-product {
  @apply w-full max-h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto transition-all;

  &.open {
    @apply bg-gray-800/20;
  }

  &__overlay {
    @apply ease-out transition-all w-full h-full mt-0 mx-auto flex items-center justify-center;
  }

  &__container {
    @apply w-full bg-white overflow-hidden;
  }

  &__head {
    @apply text-center py-4 px-10 border-b border-gray-100 relative;
  }

  &__title {
    @apply text-base leading-6 font-medium;
  }

  &__catalog {
    @apply text-sm leading-6 text-gray-500;
  }

  &__close {
    @apply inline-flex absolute top-2 right-2;
  }

  &__body {
    @apply px-10 pt-6 pb-[82px];
  }

  &__controls {
    @apply flex fixed left-0 bottom-0 w-1/2;
  }
}
</style>
