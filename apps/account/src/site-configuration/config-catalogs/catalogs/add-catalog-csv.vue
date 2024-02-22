<template>
  <div class="add-catalog-csv">
    <UiDropzone :accept="[FILE_DOCUMENT_TYPES.csv]" @drop="$emit('get-file-data', $event)">
      <template #description> Загрузите каталог с товарами </template>
      <template #acceptedFilesDescription="{ acceptedFileLabels }">
        Формат {{ acceptedFileLabels.join(' ') }}
      </template>
    </UiDropzone>

    <div class="add-catalog-csv__download">
      <a class="add-catalog-csv__download-link" :href="csvExampleLink" download="catalog-example">
        <UiIcon name="download" :size="14" />
        Скачать шаблон
      </a>
    </div>
  </div>
</template>

<script setup>
import { UiIcon, UiDropzone, FILE_DOCUMENT_TYPES } from 'account-ui';
import { onMounted, ref } from 'vue';

defineEmits('get-file-data');

const csvExampleLink = ref('');

async function createDownloadExampleLink() {
  const response = await fetch('/catalog-example.csv');
  const data = await response.blob();

  csvExampleLink.value = window.URL.createObjectURL(data);
}

onMounted(async () => {
  await createDownloadExampleLink();
});
</script>

<style lang="postcss" scoped>
.add-catalog-csv {
  @apply py-4 text-center;

  &__download {
    @apply pt-4;

    &-link {
      @apply text-sm leading-6 text-blue-600 inline-flex items-center;

      &:hover {
        @apply underline underline-offset-2;
      }

      svg {
        @apply mr-1 flex-none;
      }
    }
  }
}
</style>
