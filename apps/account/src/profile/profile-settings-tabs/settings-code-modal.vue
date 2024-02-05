<template>
  <div
    class="hs-overlay-open:mt-0 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hs-overlay-backdrop-open:z-[63] opacity-0 modal-profile-setting-code__overlay"
  >
    <div class="modal-profile-setting-code__container">
      <div class="modal-profile-setting-code__head">
        <div class="modal-profile-setting-code__close">
          <UiButton
            class="modal-profile-setting-code__close-button"
            size="small"
            is-ghost
            :data-hs-overlay="`#hs-profile-setting-code-modal`"
          >
            <UiIcon name="close" :size="16" />
          </UiButton>
        </div>

        <div class="modal-profile-setting-code__title">Введите код подтверждения</div>
      </div>
      <div class="modal-profile-setting-code__body">
        <UiInput
          v-model="code"
          label=""
          placeholder="Код на вашей почте"
          type="text"
          :max-length="'10'"
        ></UiInput>
      </div>

      <div class="modal-profile-setting-code__buttons">
        <UiButton
          class="modal-profile-setting-code__button"
          is-outline
          size="big"
          :data-hs-overlay="`#hs-profile-setting-code-modal`"
          >Отменить</UiButton
        >

        <UiButton
          class="modal-profile-setting-code__button"
          size="big"
          :disabled="isAddButtonDisabled"
          @click="onContinueClick"
        >
          <UiSpinner v-if="isLoading" />
          <span v-else>Продолжить</span>
        </UiButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { UiButton, UiIcon, UiSpinner, UiInput } from 'account-ui';
import { storeToRefs } from 'pinia';
import { ref, computed, watch } from 'vue';
import { useProfileSettingsStore } from '../stores/profile-settings.js';

const profileSettingsStore = useProfileSettingsStore();
const { isLoading } = storeToRefs(profileSettingsStore);

const emit = defineEmits(['success', 'close']);

const code = ref('');

const isAddButtonDisabled = computed(() => {
  return code.value.length === 0;
});

const onContinueClick = async () => {
  profileSettingsStore.setCode(code.value);
  code.value = '';
  emit('success');
  emit('close');
};

watch(code, () => {
  profileSettingsStore.clearCodeErrorMessage();
});
</script>

<style lang="postcss" scoped>
.modal-profile-setting-code {
  @apply w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto transition-all;

  &.open {
    @apply bg-gray-800/20;
  }

  &__overlay {
    @apply ease-out transition-all max-w-[415px] w-full m-3 mt-0 mx-auto min-h-[calc(100%-3.5rem)] flex items-center;
  }

  &__container {
    @apply flex flex-col bg-white shadow-lg rounded-2xl overflow-hidden w-full;
  }

  &__close {
    @apply p-2 absolute right-0 top-0;

    &-button {
      @apply w-8 h-8;

      svg {
        @apply flex-none;
      }
    }
  }

  &__head {
    @apply py-4 pr-12 pl-6 border-b border-gray-100;
  }

  &__title {
    @apply text-base leading-6 font-medium;
  }

  &__body {
    @apply p-6;
  }

  &__buttons {
    @apply flex mx-[-1px];
  }

  &__button {
    &.ui-button {
      @apply rounded-none border-none;
    }

    &:first-child {
      &.ui-button {
        @apply bg-gray-100;

        &:hover {
          @apply bg-gray-200;
        }
      }
    }
  }
}
</style>
