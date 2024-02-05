<template>
  <form class="logo-form">
    <div class="logo-form__input-wrapper">
      <UiImageInput
        :error-message="logoValidationErrorMessage"
        :image-src="logoUri"
        @get-image-data="getImageData"
        @get-image-data-uri="getImageDataUri"
        @upload-image="uploadImage"
      />
    </div>
    <UiButton :disabled="isLogoUploading" @click="submit">Дальше</UiButton>
  </form>
</template>

<script setup>
import { UiButton, UiImageInput } from 'account-ui';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useWizardStore } from '../../stores/wizard-store.js';

const router = useRouter();

const wizardStore = useWizardStore();
const { logo, logoUri, logoValidationErrorMessage, isLogoUploading } = storeToRefs(wizardStore);

const uploadImage = () => wizardStore.uploadRequest();

const getImageData = (image) => {
  if (!image) {
    wizardStore.abortUploading();
  }

  logo.value = image;
};

const getImageDataUri = (imageUri) => {
  logoUri.value = imageUri;
};

const submit = async () => {
  router.push({ name: 'wizardStepColor' });
};
</script>

<style lang="postcss" scoped>
.logo-form {
  &__input-wrapper {
    @apply mb-10;
  }
}
</style>
