<template>
  <div class="product-info">
    <div class="product-info__section product-info__section_basic">
      <div class="product-info__head">
        <div class="product-info__title">Основное</div>
      </div>
      <div class="product-info__item">
        <div class="product-info__active">
          <FormSwitch :name="ACTIVE_KEY" need-label> Доступен к заказу </FormSwitch>
        </div>
      </div>
      <div class="product-info__item">
        <div class="product-info__item-inner">
          <FormSelect :name="CATALOG_ID_KEY" label="Выберите каталог" :options="catalogList" />
          <FormInput
            :name="SLUG_KEY"
            class="product-info__input"
            :type="'text'"
            :placeholder="'URL'"
            :label="'URL'"
            :max-length="'250'"
          />
        </div>
      </div>
      <div class="product-info__item">
        <FormTextArea
          :name="NAME_KEY"
          label="Название товара"
          counter="200"
          placeholder="Название товара"
        />
      </div>
      <div class="product-info__item">
        <FormTextArea
          :name="DESCRIPTION"
          label="Описание товара"
          counter="2000"
          placeholder="Описание товара"
        />
        <div class="product-info__note">
          Дополнительная информация о товаре. Описание будет расположено на странице товара под
          названием
        </div>
      </div>
      <div class="product-info__item">
        <div class="product-info__item-inner">
          <FormInput
            :name="PRICE_KEY"
            class="product-info__input product-info__price"
            :type="'text'"
            :placeholder="'Цена'"
            :label="'Цена'"
            :max-length="'50'"
          >
            <template #right
              ><p ref="currencyUnitReference" class="product-info__currency-with-unit">
                {{ currencyWithUnit }}
              </p></template
            >
          </FormInput>
          <!--          <FormInput-->
          <!--            :name="PRICE_UNIT_KEY"-->
          <!--            class="product-info__input product-info__input_labelless"-->
          <!--            :type="'text'"-->
          <!--            :placeholder="'₽/шт.'"-->
          <!--            :max-length="'50'"-->
          <!--          />-->

          <FormInput
            :name="PRICE_OLD_KEY"
            class="product-info__input product-info__price"
            :type="'text'"
            :placeholder="'Старая цена'"
            :label="'Старая цена'"
            :max-length="'50'"
          >
            <template #right
              ><p class="product-info__currency-with-unit">{{ currencyWithUnit }}</p></template
            >
          </FormInput>
          <!--          <FormInput-->
          <!--            :name="PRICE_UNIT_KEY"-->
          <!--            class="product-info__input product-info__input_labelless"-->
          <!--            :type="'text'"-->
          <!--            :placeholder="'₽/шт.'"-->
          <!--            :max-length="'50'"-->
          <!--          />-->
        </div>
      </div>
      <div class="product-info__item">
        <FormFileSectionMultiple
          title="Изображение"
          :name="IMAGES_KEY"
          :file-upload="imagesUploader"
          :disabled="isMediaLoading"
        >
          Изображения в карточке и на странице товара. Рекомендуем размер 296х296 px.<br />
          Можно добавить до 10 изображений
        </FormFileSectionMultiple>
      </div>
    </div>

    <div class="product-info__section">
      <div class="product-info__head">
        <div class="product-info__title">Дополнительно</div>
        <div class="product-info__divider"></div>
      </div>
      <div class="product-info__item">
        <FormTagsInput :name="TAGS_KEY" label="Теги" placeholder="Например: Новая коллекция" />
      </div>
      <div class="product-info__item">
        <FormTagsInput
          :name="BADGE_KEY"
          label="Бейдж"
          placeholder="Например: NEW"
          :max-tags="1"
          is-tag-single
        />
      </div>
      <div class="product-info__item">
        <FormInput
          :name="CATEGORY_KEY"
          class="product-info__input"
          :type="'text'"
          :placeholder="'Категория товара/бренд'"
          :error-message="''"
          :label="'Категория товара/бренд'"
          :max-length="'50'"
        />
      </div>
      <div class="product-info__item">
        <FormInput
          :name="SKU_KEY"
          class="product-info__input"
          :type="'text'"
          :placeholder="'SKU'"
          :label="'SKU'"
          :max-length="'50'"
        />
      </div>
      <div class="product-info__item">
        <FormInput
          :name="COUNT_KEY"
          class="product-info__input"
          :type="'text'"
          :placeholder="'Количество доступных единиц'"
          :label="'Количество доступных единиц'"
          :max-length="'50'"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCurrencySymbol } from 'account/src/utility/composition/use-currency-symbol';
import { computed, inject, ref } from 'vue';
import FormFileSectionMultiple from '../../../../../components/form/form-file-section-multiple.vue';
import FormInput from '../../../../../components/form/form-input.vue';
import FormSelect from '../../../../../components/form/form-select.vue';
import FormSwitch from '../../../../../components/form/form-switch.vue';
import FormTagsInput from '../../../../../components/form/form-tags-input.vue';
import FormTextArea from '../../../../../components/form/form-text-area.vue';
import {
  ACTIVE_KEY,
  NAME_KEY,
  IMAGES_KEY,
  CATEGORY_KEY,
  BADGE_KEY,
  COUNT_KEY,
  PRICE_KEY,
  PRICE_OLD_KEY,
  SLUG_KEY,
  TAGS_KEY,
  SKU_KEY,
  DESCRIPTION,
  CATALOG_ID_KEY,
  CATALOG_LIST_OPTIONS_KEY,
  MEDIA_UPLOAD_KEY,
  MEDIA_UPLOAD_LOADING_KEY,
  CURRENT_CATALOG_KEY,
  // PRICE_UNIT_KEY,
} from '../form/constants.js';

const currencyUnitReference = ref(null);

const imagesUploader = inject(MEDIA_UPLOAD_KEY);
const isMediaLoading = inject(MEDIA_UPLOAD_LOADING_KEY);
const catalogList = inject(CATALOG_LIST_OPTIONS_KEY);
const currentCatalog = inject(CURRENT_CATALOG_KEY);

const currencyWithUnit = computed(() =>
  useCurrencySymbol(currentCatalog.value.currency, currentCatalog.value.unit)
);

const currencyUnitSize = computed(() => {
  const width = currencyUnitReference.value?.getBoundingClientRect()?.width;

  return `${(width ?? 39) + 28}px`;
});
</script>

<style lang="postcss" scoped>
.product-info {
  &__section {
    @apply space-y-6;

    &_basic {
      @apply pb-20;
    }
  }

  &__price {
    :deep(.ui-input) {
      padding-right: v-bind(currencyUnitSize);
    }
  }

  &__currency-with-unit {
    position: absolute;
    right: 16px;
    top: 12px;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    color: var(--Gray-500, #6b7280);
  }

  &__title {
    @apply text-xl font-medium leading-6;
  }

  &__divider {
    @apply h-px w-full bg-gray-200;
  }

  &__item-inner {
    @apply columns-2 gap-5;

    &_four-col {
      @apply columns-4;
    }
  }

  &__input {
    &_labelless {
      @apply pt-6;
    }
  }

  &__active {
    @apply py-4;
  }

  &__note {
    @apply text-sm text-gray-400 leading-4 mt-2;
  }
}
</style>
