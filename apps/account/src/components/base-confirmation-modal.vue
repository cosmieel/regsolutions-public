<template>
  <div :id="id" class="hs-overlay modal-confirmation hidden [--overlay-backdrop:static]">
    <div
      class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hs-overlay-backdrop-open:z-[63] opacity-0 modal-confirmation__overlay"
    >
      <div class="modal-confirmation__container">
        <div class="modal-confirmation__head">
          <div class="modal-confirmation__title">
            <slot name="title"></slot>
          </div>
          <div class="modal-confirmation__description">
            <slot name="description"></slot>
          </div>
        </div>

        <div class="modal-confirmation__buttons">
          <UiButton
            class="modal-confirmation__button"
            is-outline
            size="big"
            :data-hs-overlay="`#${primaryActionHsOverlay || id}`"
            data-hs-overlay-close
            @click="handleAccept"
          >
            <slot name="primary-action"></slot>
          </UiButton>

          <UiButton
            class="modal-confirmation__button"
            is-outline
            size="big"
            :data-hs-overlay="`#${secondaryActionHsOverlay || id}`"
          >
            <slot name="secondary-action"></slot>
          </UiButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { UiButton } from 'account-ui';

defineProps({
  id: {
    type: String,
    required: true,
  },

  primaryActionHsOverlay: {
    type: String,
    required: false,
    default: '',
  },

  secondaryActionHsOverlay: {
    type: String,
    required: false,
    default: '',
  },
});

const emit = defineEmits(['accept', 'open']);

const handleAccept = async () => {
  setTimeout(async () => {
    emit('accept');
  }, 200);
};
</script>

<style lang="postcss" scoped>
.modal-confirmation {
  @apply w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto transition-all;

  &.open {
    @apply bg-gray-800/20;
  }

  &__overlay {
    @apply ease-out transition-all max-w-[415px] w-full m-3 mt-0 mx-auto min-h-[calc(100%-3.5rem)] flex items-center;
  }

  &__container {
    @apply w-full flex flex-col bg-white shadow-lg rounded-2xl overflow-hidden;
  }

  &__head {
    @apply p-6 text-center;
  }

  &__title {
    @apply text-base font-bold leading-6 pb-2;
  }

  &__description {
    @apply text-sm leading-6;
  }

  &__buttons {
    @apply flex mx-[-1px];
  }

  &__button {
    &.ui-button {
      @apply rounded-none;
    }

    &:first-child {
      &.ui-button {
        @apply text-red-500;
      }
    }
  }
}
</style>
