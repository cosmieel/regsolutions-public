<template>
  <UiModalContainer class="modal-confirmation">
    <UiModalHeader class="modal-confirmation__header">
      <UiModalHeaderContent>
        <UiModalHeaderContentText>
          <template v-if="title" #title>{{ title }}</template>
          <template v-if="description" #description>{{ description }}</template>
        </UiModalHeaderContentText>
      </UiModalHeaderContent>
      <UiModalCloseButton />
    </UiModalHeader>

    <UiModalFooter class="modal-confirmation__actions">
      <UiButton
        class="modal-confirmation__action"
        is-soft
        size="big"
        :disabled="loading"
        @click="handleCancel"
      >
        {{ cancelText }}
      </UiButton>

      <UiButton
        class="modal-confirmation__action modal-confirmation__action_accept"
        is-red
        size="big"
        :disabled="loading"
        @click="handleAccept"
      >
        {{ acceptText }}
      </UiButton>
    </UiModalFooter>
  </UiModalContainer>
</template>

<script setup>
import { useAttrs, computed, ref, inject } from 'vue';
import UiButton from '../ui-button.vue';
import { PROVIDE_MODAL_INSTANCE_KEY } from '../ui-modal/constants.js';
import UiModalCloseButton from '../ui-modal/ui-modal-close-button.vue';
import UiModalContainer from '../ui-modal/ui-modal-container.vue';
import UiModalFooter from '../ui-modal/ui-modal-footer.vue';
import UiModalHeaderContentText from '../ui-modal/ui-modal-header-content-text.vue';
import UiModalHeaderContent from '../ui-modal/ui-modal-header-content.vue';
import UiModalHeader from '../ui-modal/ui-modal-header.vue';

const attributes = useAttrs();

const instance = inject(PROVIDE_MODAL_INSTANCE_KEY);

const loading = ref(false);

const modalProps = attributes?.modalProps;

const title = computed(() => modalProps.title);
const description = computed(() => modalProps.description);
const acceptText = computed(() => modalProps.acceptText);
const cancelText = computed(() => modalProps.cancelText);

const handleClose = () => {
  instance.close?.();
};

const handleCancel = async () => {
  if (modalProps?.onCancel) {
    loading.value = true;

    try {
      await modalProps.onCancel?.();

      handleClose();
    } finally {
      loading.value = false;
    }
  } else {
    handleClose();
  }
};

const handleAccept = async () => {
  loading.value = true;

  try {
    await modalProps.onAccept?.();

    handleClose();
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="postcss" scoped>
.modal-confirmation {
  max-width: 415px;
  width: 100%;

  &__header {
    gap: 16px;
    border-bottom: none;
  }

  &__actions {
    display: flex;
  }

  &__action {
    border-radius: 0;
    border: none;
  }
}
</style>
