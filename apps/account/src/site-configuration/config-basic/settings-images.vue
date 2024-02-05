<template>
  <div class="settings-images">
    <div class="settings-images__item">
      <FileSection
        title="Логотип"
        :file-src="siteData.logo"
        @get-file-data="getLogoData"
        @upload-file="uploadLogoImage"
        @remove-file="removeLogoImage"
      >
        Логотип будет размещен в верхней части экрана (в шапке сайта).<br />
        Рекомендуем формат SVG/PNG
      </FileSection>
    </div>
    <div class="settings-images__item">
      <FileSection
        image-shape="rounded"
        title="Фавикон"
        :file-src="siteData.favicon"
        @get-file-data="getFaviconData"
        @upload-file="uploadFaviconImage"
        @remove-file="removeFaviconImage"
      >
        Значок веб-сайта или страницы.<br />
        Отображается в браузере перед названием страницы.<br />
        Рекомендуем PNG 32х32px
      </FileSection>
    </div>
    <div class="settings-images__item">
      <FileSection
        image-shape="full"
        title="Соцсети"
        :file-src="siteData.thumbnail"
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
  siteData: {
    type: Object,
    required: true,
  },
});

const logoFile = ref('');
const faviconFile = ref('');
const socialsFile = ref('');

const getLogoData = (file) => {
  logoFile.value = file;
};
const getFaviconData = (file) => {
  faviconFile.value = file;
};
const getSocialsData = (file) => {
  socialsFile.value = file;
};

const emit = defineEmits(['upload-file', 'remove-file']);

const uploadFile = (property, file) => {
  emit('upload-file', property, file);
};

const uploadLogoImage = () => uploadFile('logo', logoFile.value);
const uploadFaviconImage = () => uploadFile('favicon', faviconFile.value);
const uploadSocialsImage = () => uploadFile('thumbnail', socialsFile.value);

const removeFile = (property) => {
  emit('remove-file', property);
};

const removeLogoImage = () => removeFile('logo');
const removeFaviconImage = () => removeFile('favicon');
const removeSocialsImage = () => removeFile('thumbnail');
</script>

<style lang="postcss" scoped>
.settings-images {
  @apply space-y-10;
}
</style>
