<template>
  <div class="settings-images-form-view">
    <FormDropzoneImageSection ref="logoReference" :name="LOGO_KEY">
      <template #title>Логотип</template>
      <template #description>
        Логотип будет размещен в верхней части экрана (в шапке сайта).<br />
        Рекомендуем формат SVG/PNG
      </template>
    </FormDropzoneImageSection>

    <FormDropzoneImageSection ref="faviconReference" :name="FAVICON_KEY" image-shape="rounded">
      <template #title>Фавикон</template>
      <template #description>
        Значок веб-сайта или страницы.<br />
        Отображается в браузере перед названием страницы.<br />
        Рекомендуем PNG 32х32px
      </template>
    </FormDropzoneImageSection>

    <FormDropzoneImageSection ref="thumbnailReference" :name="THUMBNAIL_KEY" image-shape="full">
      <template #title>Соцсети</template>
      <template #description>
        Заставка, которая появится при отправке ссылки на сайт в соцсетях.<br />
        Рекомендуем размер 1200х630px
      </template>
    </FormDropzoneImageSection>
  </div>
</template>

<script setup>
import FormDropzoneImageSection from 'account/src/components/form/files/drop-zone/form-dropzone-image-section.vue';
import { computed, ref } from 'vue';
import { FAVICON_KEY, LOGO_KEY, THUMBNAIL_KEY } from '../form/constants.js';

const logoReference = ref(null);
const faviconReference = ref(null);
const thumbnailReference = ref(null);

const isSomeImageUploading = computed(() => {
  return (
    logoReference.value.exposeValues.isLoading ||
    faviconReference.value.exposeValues.isLoading ||
    thumbnailReference.value.exposeValues.isLoading
  );
});

defineExpose({
  isSomeImageUploading,
});
</script>

<style lang="postcss" scoped>
.settings-images-form-view {
  @apply flex flex-col gap-10;
}
</style>
