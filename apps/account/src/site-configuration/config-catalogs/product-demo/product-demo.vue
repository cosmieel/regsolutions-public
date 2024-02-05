<template>
  <ProductDemoMock>
    <div class="product-demo">
      <div class="product-demo__image-block">
        <div v-if="currentCatalogItem?.images?.[0]" class="product-demo__image">
          <img
            :src="fullImageSource(currentCatalogItem?.images?.[0], currentImagesStorage)"
            alt=""
          />
        </div>
        <div v-else class="product-demo__stub">
          <div class="product-demo__stub-icon">
            <UiSvg name="empty-image" />
          </div>
          <div class="product-demo__stub-text">Нет изображения...</div>
        </div>
      </div>

      <div class="product-demo__name-block">
        <input
          v-if="currentCatalogItem?.name"
          v-model.trim="currentCatalogItem.name"
          class="product-demo__name"
          type="text"
          readonly
          maxlength="100"
        />
        <span v-else class="product-demo__name-skeleton"></span>
      </div>

      <div class="product-demo__description-block">
        <textarea
          v-if="currentCatalogItem?.description"
          v-model="currentCatalogItem.description"
          type="text"
          class="product-demo__description"
          readonly
        ></textarea>
        <textarea
          v-else-if="currentCatalogItem.description"
          v-model="currentCatalogItem.description"
          type="text"
          class="product-demo__description"
          readonly
        ></textarea>
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
          <span v-if="currentCatalogItem?.button?.name">
            {{ currentCatalogItem?.button?.name }}
          </span>
          <span v-else>Купить</span>
        </UiButton>
      </div>
    </div>
  </ProductDemoMock>
</template>

<script setup>
import { UiButton, UiSvg } from 'account-ui';
import { storeToRefs } from 'pinia';
import ProductDemoMock from './product-demo-mock.vue';
import { fullImageSource } from '../../../components/composables/full-image-source.js';
import { useCatalogItemsConfigurationStore } from '../../stores/catalog-items-configuration-store.js';
import { useSiteConfigurationStore } from '../../stores/site-configuration-store.js';

const siteConfigurationStore = useSiteConfigurationStore();
const { currentSite, currentImagesStorage } = storeToRefs(siteConfigurationStore);

const catalogItemsConfigurationStore = useCatalogItemsConfigurationStore();
const { currentCatalogItem } = storeToRefs(catalogItemsConfigurationStore);
</script>

<style lang="postcss" scoped>
.product-demo {
  @apply max-w-[240px] mx-auto py-20;

  &__image-block {
    @apply w-full max-w-[240px] h-[240px] flex items-center justify-center border border-gray-200 rounded-lg overflow-hidden;
  }

  &__image {
    @apply w-full h-full overflow-hidden;

    img {
      @apply object-cover w-full h-full;
    }
  }

  &__stub {
    &-icon {
      @apply w-[50px] mx-auto;
    }

    &-text {
      @apply text-sm leading-6 pt-4;
    }
  }

  &__name-block {
    @apply pt-8 pb-5;
  }

  &__name {
    @apply block w-full mx-auto border-none outline-none text-center text-xl font-bold text-gray-700 py-0;

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
