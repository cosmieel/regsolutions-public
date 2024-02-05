<template>
  <div class="page-settings-images">
    <div class="page-settings-images__item">
      <FileSection
        image-shape="full"
        title="Соцсети"
        :file-src="pageData.image"
        @get-file-data="getSocialsData"
        @upload-file="uploadSocialsImage"
        @remove-file="removeSocialsImage"
      >
        Заставка, которая появится при отправке ссылки на сайт в соцсетях.<br />
        Рекомендуем размер 1200х630px
      </FileSection>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import FileSection from '../../components/file-section.vue';

defineProps({
  pageData: {
    type: Object,
    required: true,
  },
});

const socialsFile = ref('');

const getSocialsData = (file) => {
  socialsFile.value = file;
};

const emit = defineEmits(['upload-file', 'remove-file']);

const uploadFile = (file) => {
  emit('upload-file', file);
};

const uploadSocialsImage = () => uploadFile(socialsFile.value);
const removeSocialsImage = () => emit('remove-file');
</script>

<style lang="postcss" scoped>
.page-settings-images {
  @apply space-y-10;

  &__item {
  }
}
</style>
