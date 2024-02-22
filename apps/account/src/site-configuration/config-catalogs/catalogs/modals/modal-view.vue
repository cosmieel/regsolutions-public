<template>
  <UiModalContainer class="modal-add-csv">
    <UiModalHeader>
      <UiModalHeaderContent>
        <UiModalHeaderContentText>
          <template #title>Добавить каталог файлом</template>
          <template #description>
            Скачайте шаблон каталога, заполните и загрузите сюда в формате CSV
          </template>
        </UiModalHeaderContentText>
      </UiModalHeaderContent>

      <UiModalCloseButton />
    </UiModalHeader>

    <UiModalBody>
      <AddCatalogCsv :error-message="catalogCsvErrorMessage" @get-file-data="onGetCsv" />
    </UiModalBody>

    <UiModalFooter>
      <UiPrimarySecondaryButtons
        :disabled-primary="isCatalogCsvLoading"
        :pending-primary="isCatalogCsvLoading"
        @on-primary-click="onCsvImport"
        @on-secondary-click="handleClose"
      >
        <template #secondary>Отменить</template>
        <template #primary>Продолжить</template>
      </UiPrimarySecondaryButtons>
    </UiModalFooter>
  </UiModalContainer>
</template>

<script setup>
import { modalManager } from 'account/src/instances/modal-manager';
import { notifyer } from 'account/src/instances/notifyer.js';
import {
  UiModalContainer,
  UiModalBody,
  UiModalHeader,
  UiModalCloseButton,
  UiModalHeaderContent,
  UiModalHeaderContentText,
  UiModalFooter,
  UiPrimarySecondaryButtons,
} from 'account-ui';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { useCatalogConfigurationStore } from '../../../stores/catalog-configuration-store.js';
import AddCatalogCsv from '../add-catalog-csv.vue';

const ERROR_UPLOADING_NOTIFICATION_ID = 'error_uploading_notification';

const catalogConfigurationStore = useCatalogConfigurationStore();
const { catalogCsvErrorMessage, isCatalogCsvLoading } = storeToRefs(catalogConfigurationStore);

const csvCatalog = ref('');

const onGetCsv = (result) => {
  if (result.acceptFiles?.[0]) {
    csvCatalog.value = result.acceptFiles[0];
  }
};

const onCsvImport = async () => {
  await catalogConfigurationStore.importCsvCatalogRequest(csvCatalog.value);

  if (!catalogCsvErrorMessage.value) {
    notifyer.success({
      message: 'Файл был загружен',
    });

    handleClose();
  }
};

const closeCatalogCsvErrorMessage = () => {
  catalogConfigurationStore.clearCatalogCsvErrorMessage();
};

const handleClose = () => {
  modalManager.close();
};

watch(catalogCsvErrorMessage, (value) => {
  if (value) {
    notifyer.error({
      id: ERROR_UPLOADING_NOTIFICATION_ID,
      title: 'Файл не загружен',
      message: 'Необходимо заполнить файл по шаблону',
      onTimerCompleted: closeCatalogCsvErrorMessage,
    });
  }
});
</script>

<style lang="postcss" scoped>
.modal-add-csv {
  width: 100%;
  max-width: 415px;
}
</style>
