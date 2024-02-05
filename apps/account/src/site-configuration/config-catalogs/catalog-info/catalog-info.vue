<template>
  <div class="catalog-info">
    <div class="catalog-info__item">
      <div class="catalog-info__item-inner">
        <UiInput
          v-model="catalogDataModel.name"
          class="catalog-info__input"
          :type="'text'"
          :placeholder="'Название'"
          :error-message="catalogNameErrorMessage"
          :label="'Название*'"
          :max-length="'150'"
        />
        <UiInput
          v-model="catalogDataModel.slug"
          class="catalog-info__input"
          :type="'text'"
          :placeholder="'URL'"
          :error-message="''"
          :label="'URL'"
          :max-length="'150'"
        />
      </div>
    </div>

    <div class="catalog-info__item">
      <div class="catalog-info__item-inner">
        <UiInput
          v-model="catalogDataModel.button.text"
          class="catalog-info__input"
          :type="'text'"
          :placeholder="'Например: Заказать'"
          :error-message="''"
          :label="'Текст кнопки'"
        />

        <UiSelect
          v-model="catalogDataModel.checkout.type"
          label="Куда ведет*"
          :options="[
            { name: 'Форма заказа', value: 'FORM' },
            { name: 'Корзина', value: 'CART' },
            { name: 'Ссылка', value: 'URL' },
          ]"
        />
      </div>
    </div>
    <div v-if="catalogDataModel.checkout.type == 'URL'" class="catalog-info__item">
      <UiInput
        v-model="catalogDataModel.checkout.url"
        class="catalog-info__input"
        :type="'text'"
        :placeholder="'Ссылка'"
        :error-message="''"
      />
    </div>
    <div v-if="catalogDataModel.checkout.type == 'FORM'" class="catalog-info__item">
      <CatalogForm :store-type="'catalog'" />
    </div>
    <div class="catalog-info__item">
      <div class="catalog-info__item-inner">
        <UiSelect
          v-model="catalogDataModel.currency"
          label="Валюта*"
          :options="currencySymbolOptions"
        />
        <UiInput
          v-model="catalogDataModel.unit"
          class="catalog-info__input"
          label="Единица товара"
          type="text"
          placeholder="/шт."
          max-length="50"
          :error-message="''"
        />
      </div>
    </div>
    <div class="catalog-info__item">
      <UiTextarea
        v-model="catalogDataModel.description"
        label="Описание"
        counter="300"
        placeholder="Описание"
        :error-message="''"
        :max-length="'300'"
      />
      <div class="catalog-info__note">
        Дополнительная информация о товарах. Описание будет расположено в карточке под названием
      </div>
    </div>
    <div class="catalog-info__item">
      <FileSection
        image-shape="full"
        title="Обложка"
        :file-src="catalogDataModel.image"
        is-square
        @get-file-data="getCoverData"
        @upload-file="uploadCoverImage"
        @remove-file="removeCoverImage"
      >
        Изображение для каталога.<br />
        Рекомендуем размер 296х296 px
      </FileSection>
    </div>
  </div>
</template>

<script setup>
import { currencySymbolOptions } from 'account/src/utility/options/currency';
import { UiInput, UiSelect, UiTextarea } from 'account-ui';
import { computed, ref } from 'vue';
import FileSection from '../../../components/file-section.vue';
import CatalogForm from '../../../components/order-form/order-form.vue';

const props = defineProps({
  catalogData: {
    type: Object,
    required: true,
  },

  catalogNameErrorMessage: {
    type: String,
    default: '',
  },
});

const coverFile = ref('');

const emit = defineEmits(['update:catalogData', 'upload-file', 'remove-file']);

const catalogDataModel = computed({
  get() {
    return props.catalogData;
  },
  set(value) {
    emit('update:catalogData', value);
  },
});

const getCoverData = (file) => {
  coverFile.value = file;
};

const uploadFile = (file) => {
  emit('upload-file', file);
};

const uploadCoverImage = () => uploadFile(coverFile.value);
const removeCoverImage = () => emit('remove-file');
</script>

<style lang="postcss" scoped>
.catalog-info {
  @apply space-y-6;

  &__item-inner {
    @apply columns-2 gap-5;
  }

  &__note {
    @apply text-sm text-gray-400 leading-4 mt-2;
  }
}
</style>
