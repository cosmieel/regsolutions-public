<template>
  <div
    :id="`hs-add-catalog-bnovo-modal`"
    ref="addBnovoReference"
    class="hs-overlay modal-add-bnovo hidden [--overlay-backdrop:static]"
    style="margin-top: 0px"
    data-hs-overlay-keyboard="false"
  >
    <div
      class="hs-overlay-open:mt-0 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hs-overlay-backdrop-open:z-[63] opacity-0 modal-add-bnovo__overlay"
    >
      <div class="modal-add-bnovo__container">
        <div class="modal-add-bnovo__head">
          <div class="modal-add-bnovo__close">
            <UiButton
              class="modal-add-bnovo__close-button"
              size="small"
              is-ghost
              :data-hs-overlay="`#hs-add-catalog-bnovo-modal`"
            >
              <UiIcon name="close" :size="16" />
            </UiButton>
          </div>

          <div class="modal-add-bnovo__title">Добавить каталог из Bnovo</div>
        </div>
        <div class="modal-add-bnovo__body">
          <AddCatalogBnovo
            :error-message="bnovoCatalogErrorMessage"
            @bnovo-catalog-id-input="onBnovoCatalogIdInput"
          />
        </div>

        <div class="modal-add-bnovo__buttons">
          <UiButton
            class="modal-add-bnovo__button"
            is-outline
            size="big"
            :data-hs-overlay="`#hs-add-catalog-bnovo-modal`"
            >Отменить</UiButton
          >

          <UiButton
            class="modal-add-bnovo__button"
            size="big"
            :disabled="isAddButtonDisabled"
            @click="onBnovoCatalogImportClick"
          >
            <UiSpinner v-if="isBnovoCatalogLoading" />
            <span v-else>Продолжить</span>
          </UiButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { UiButton, UiIcon, UiSpinner } from 'account-ui';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import AddCatalogBnovo from './add-catalog-bnovo.vue';
import { useCatalogConfigurationStore } from '../../stores/catalog-configuration-store.js';

const catalogConfigurationStore = useCatalogConfigurationStore();
const { bnovoCatalogErrorMessage, isBnovoCatalogLoading } = storeToRefs(catalogConfigurationStore);

const isAddButtonDisabled = ref(true);
const addBnovoReference = ref(null);
const bnovoCatalogId = ref('');

const onBnovoCatalogIdInput = (catalogId) => {
  bnovoCatalogId.value = catalogId;
  isAddButtonDisabled.value = false;
  bnovoCatalogErrorMessage.value = '';
};

const onBnovoCatalogImportClick = async () => {
  isAddButtonDisabled.value = true;

  await catalogConfigurationStore.importBnovoCatalogRequest(bnovoCatalogId.value);

  if (!isBnovoCatalogLoading.value) {
    if (bnovoCatalogErrorMessage.value) {
      isAddButtonDisabled.value = false;
      return;
    }

    await window.HSOverlay.close(addBnovoReference.value);
  }
};
</script>

<style lang="postcss" scoped>
.modal-add-bnovo {
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
        @apply w-[14px] h-[14px] flex-none;
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
