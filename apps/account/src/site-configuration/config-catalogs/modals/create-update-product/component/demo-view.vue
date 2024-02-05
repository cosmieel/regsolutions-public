<template>
  <ProductDemoMock>
    <div class="product-demo">
      <div class="product-demo__image-block">
        <div v-if="formValues?.images?.[0]" class="product-demo__image">
          <MediaImage
            :path="formValues.images[0]"
            :size="config.resize.createUpdateModal.demoView"
          />
        </div>
        <div v-else class="product-demo__stub">
          <div class="product-demo__stub-icon">
            <UiSvg name="image" />
          </div>
          <div class="product-demo__stub-text">Нет изображения...</div>
        </div>
      </div>

      <div class="product-demo__name-block">
        <input
          v-if="formValues?.name"
          v-model.trim="formValues.name"
          class="product-demo__name"
          type="text"
          readonly
          maxlength="100"
        />
        <span v-else class="product-demo__name-skeleton"></span>
      </div>

      <div class="product-demo__description-block">
        <textarea
          v-if="formValues?.text"
          v-model="formValues.text"
          type="text"
          class="product-demo__description"
          readonly
        />
        <ul v-else class="product-demo__description-skeleton">
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>

      <div class="product-demo__button-block">
        <UiButton
          v-if="currentSite.color"
          class="product-demo__button transition-none"
          size="small"
          :style="{ 'background-color': currentSite.color }"
        >
          <span v-if="product?.buttons?.[0]?.name">
            {{ product.buttons[0].name }}
          </span>
          <span v-else>Купить</span>
        </UiButton>
      </div>
    </div>
  </ProductDemoMock>
</template>

<script setup>
import MediaImage from 'account/src/components/media/media-image.vue';
import config from 'account/src/config/config.js';
import { UiButton, UiSvg } from 'account-ui';
import { storeToRefs } from 'pinia';
import { inject } from 'vue';
import ProductDemoMock from './demo-mock.vue';
import { useSiteConfigurationStore } from '../../../../stores/site-configuration-store.js';
import { PRODUCT_PROVIDE_KEY, FORM_VALUES_PROVIDE_KEY } from '../form/constants.js';

const siteConfigurationStore = useSiteConfigurationStore();
const { currentSite } = storeToRefs(siteConfigurationStore);

const product = inject(PRODUCT_PROVIDE_KEY);
const formValues = inject(FORM_VALUES_PROVIDE_KEY);
</script>

<style lang="postcss" scoped>
.product-demo {
  @apply max-w-[240px] mx-auto py-20;

  &__image-block {
    @apply w-full max-w-[240px] h-[230px] flex items-center justify-center border border-gray-200 rounded-lg overflow-hidden;
  }

  &__image {
    @apply w-full h-full overflow-hidden;

    img {
      @apply object-cover w-full h-full;
    }
  }

  &__stub-icon {
    @apply w-[50px] mx-auto;
  }

  &__stub-text {
    @apply text-sm leading-6 pt-[11px];
  }

  &__name-block {
    @apply pt-8 pb-5;
  }

  &__name {
    @apply block w-full mx-auto border-none outline-none text-center text-xl font-medium text-gray-700 py-0;

    &:focus {
      @apply outline-none border-none ring-0;
    }
  }

  &__name-skeleton {
    @apply block w-full h-4 bg-gray-100 rounded mx-auto;
  }

  &__description-block {
    @apply overflow-auto pb-8;
  }

  &__description {
    @apply block w-full h-[68px] px-[60px] mx-auto border-none outline-none resize-none text-center text-sm leading-6 text-gray-600 py-0;

    &:focus {
      @apply outline-none border-none ring-0;
    }
  }

  &__description-skeleton {
    @apply space-y-2.5;

    li {
      @apply w-full h-4 bg-gray-100 rounded mx-auto;
    }
  }
}
</style>
