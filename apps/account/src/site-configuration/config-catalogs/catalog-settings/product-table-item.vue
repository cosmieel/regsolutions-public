<template>
  <tr class="product-table-item">
    <td class="product-table-item__td _main">
      <div class="product-table-item__checkbox">
        <UiCheckbox
          :id="catalogItemId"
          :model-value="checked"
          :name="catalogItemId"
          :value="catalogItemId"
          @change="onCatalogItemCheck"
        />
      </div>
      <div class="product-table-item__cover">
        <MediaImage v-if="image" :path="image" :size="config.resize.productTableItem" />
      </div>
      <button class="product-table-item__name" @click="handelOpenUpdateModal">
        {{ name }}
      </button>
    </td>

    <td class="product-table-item__td _count">
      <div class="product-table-item__count" :title="`${count} шт`">{{ count || 0 }} шт</div>
    </td>

    <td class="product-table-item__td _price">
      <div class="product-table-item__price">{{ price }} {{ currency }}</div>
    </td>

    <td class="product-table-item__td _options">
      <div
        class="hs-dropdown product-table-item__options relative inline-flex [--placement:right-top] [--strategy:absolute]"
      >
        <button
          id="product-table-item-options"
          class="hs-dropdown-toggle product-table-item__options-toggle"
          is-outline
        >
          <UiIcon name="more" :size="16" />
        </button>

        <UiDropdown
          class="product-table-item__options-dropdown divide-y divide-gray-100"
          aria-labelledby="product-table-item-options"
        >
          <div class="product-table-item__options-section">
            <button type="button" class="ui-dropdown-link">
              <UiSwitch v-model="activeModel" need-label is-reversed>Показывать на сайте</UiSwitch>
            </button>
          </div>

          <div class="product-table-item__options-section">
            <button type="button" class="ui-dropdown-link" @click="handelOpenUpdateModal">
              <UiIcon name="edit" :size="16" />
              Редактировать
            </button>
            <button type="button" class="ui-dropdown-link" @click="onDuplicateCatalogItem">
              <UiIcon name="copy" :size="16" />
              Дублировать
            </button>
          </div>

          <div class="product-table-item__options-section">
            <button
              type="button"
              class="ui-dropdown-link_red"
              @click="callDeleteProductModal(onDeleteCatalogItem, isBulkDeletion)"
            >
              <UiIcon name="trash-delete" :size="16" />
              Удалить
            </button>
          </div>
        </UiDropdown>
      </div>
    </td>
  </tr>
</template>

<script setup>
import MediaImage from 'account/src/components/media/media-image.vue';
import config from 'account/src/config/config.js';
import { UiCheckbox, UiDropdown, UiIcon, UiSwitch } from 'account-ui';
import { computed, watch } from 'vue';
import { callOpenCreateUpdateModal } from '../modals/create-update-product/create-update-product.js';
import { callDeleteProductModal } from '../modals/delete-product-modal.js';

const props = defineProps({
  catalogItemId: {
    type: Number,
    default: -1,
  },

  catalogItemsList: {
    type: Array,
    default: () => [],
  },

  image: {
    type: String,
    default: '',
  },

  name: {
    type: String,
    default: '',
  },

  count: {
    type: Number,
    default: 0,
  },

  price: {
    type: Number,
    default: 0,
  },

  currency: {
    type: String,
    default: 'RUB',
  },

  active: {
    type: Boolean,
    default: false,
  },

  catalogsList: {
    type: Array,
    default: () => [],
  },

  catalog: {
    type: Object,
    required: true,
  },

  checked: {
    type: Boolean,
    required: false,
    default: false,
  },

  isBulkDeletion: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits([
  'delete-catalog-item',
  'duplicate-catalog-item',
  'update:active',
  'update-active-state',
  'update:checkedItems',
  'catalog-item-check',
]);

const onDeleteCatalogItem = async () => {
  emit('delete-catalog-item');
};

const onDuplicateCatalogItem = () => {
  emit('duplicate-catalog-item');
};

const activeModel = computed({
  get() {
    return props.active;
  },
  set(value) {
    emit('update:active', value);
  },
});

watch(
  () => props.active,
  (value) => {
    emit('update-active-state', value, props.catalogItemId);
  },
  { deep: true }
);

const onCatalogItemCheck = () => emit('catalog-item-check');

const handelOpenUpdateModal = () => {
  const product = props.catalogItemsList.find((item) => item.id === props.catalogItemId);

  callOpenCreateUpdateModal({
    product: product || null,
    catalogId: product?.catalogId || null,
    catalogsList: props.catalogsList || [],
  });
};
</script>

<style lang="postcss" scoped>
.product-table-item {
  @apply flex;

  &__td {
    @apply inline-flex whitespace-nowrap text-sm leading-6 text-gray-700 p-0;

    &._main {
      @apply flex items-center pl-4 py-2 max-w-[329px] grow;
    }

    &._count {
      @apply pl-4 py-4 w-[56px] max-w-[56px];
    }

    &._price {
      @apply px-4 py-4 w-[98px] max-w-[98px];
    }

    &._options {
      @apply px-2 w-[54px] max-w-[54px];
    }
  }

  &__cover {
    @apply ml-4 w-10 h-10 rounded-lg bg-gray-100 overflow-hidden flex-none;

    img {
      @apply w-full h-full object-cover rounded-lg;
    }
  }

  &__name {
    @apply truncate ml-4 max-w-[241px];
  }

  &__count {
    @apply truncate;
  }

  &__price {
    @apply truncate;
  }

  &__options {
    @apply w-full h-full relative;

    &-toggle {
      @apply cursor-pointer flex-none border-transparent bg-transparent flex justify-center items-center w-full;

      svg {
        @apply flex-none;
      }
    }

    &-dropdown {
      @apply w-[248px];
    }

    &-section {
      @apply py-2;

      &:first-child {
        @apply pt-0;
      }

      &:last-child {
        @apply pb-0;
      }
    }
  }
}
</style>
