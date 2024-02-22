<template>
  <UiTable class="product-table" :list="catalogItemsList" @change-order="onChangeOrder">
    <template #ui-table-head>
      <tr>
        <th scope="col" class="product-table__th _main">
          <div class="product-table__checkbox">
            <UiCheckbox v-model="allSelected" @change="handleSelectAll" />
          </div>
          <div class="product-table__filter">Все товары</div>
        </th>
      </tr>
    </template>
    <template #ui-table-body>
      <ProductTableItem
        v-for="catalogItem in catalogItemsList"
        :key="catalogItem.id"
        v-model:active="catalogItem.active"
        :checked="selectedItems.some((item) => item === catalogItem.id)"
        :catalog-item-id="Number(catalogItem.id)"
        :image="catalogItem.images?.[0]"
        :name="catalogItem.name"
        :count="catalogItem.count"
        :price="catalogItem.price"
        :currency="getCurrency(catalogItem)"
        :is-bulk-deletion="getIsBulk(catalogItem.id)"
        :catalog-items-list="catalogItemsList"
        :catalogs-list="catalogsList"
        :catalog="catalog"
        @delete-catalog-item="onDeleteCatalogItem(catalogItem.id)"
        @duplicate-catalog-item="onDuplicateCatalogItem(catalogItem.id)"
        @update-active-state="onUpdateActiveState"
        @catalog-item-check="handleChange(catalogItem.id)"
      />
    </template>
  </UiTable>
</template>

<script setup>
import { useBulkItems } from 'account/src/utility/composition/use-bulk-items';
import { useCurrencySymbol } from 'account/src/utility/composition/use-currency-symbol';
import { UiCheckbox, UiTable } from 'account-ui';
import { computed } from 'vue';
import ProductTableItem from './product-table-item.vue';

const props = defineProps({
  catalogItemsList: {
    type: Array,
    default: () => [],
  },

  currency: {
    type: String,
    default: null,
  },

  unit: {
    type: String,
    default: '',
  },

  catalogsList: {
    type: Array,
    default: () => [],
  },

  catalog: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits([
  'delete-catalog-item',
  'update-active-state',
  'duplicate-catalog-item',
  'update-order',
]);

const {
  selectedItems,
  handleSelectAll,
  allSelected,
  handleChange,
  hasInList,
  getIsBulk,
  handleRemoveSeveral,
} = useBulkItems(computed(() => props.catalogItemsList.map((item) => item.id)));

const onDeleteCatalogItem = async (catalogItemId) => {
  const inList = hasInList(catalogItemId);

  emit('delete-catalog-item', inList ? selectedItems.value : catalogItemId);

  if (inList) {
    handleRemoveSeveral(selectedItems.value);
  }
};

const onDuplicateCatalogItem = (catalogItemId) => {
  emit('duplicate-catalog-item', hasInList(catalogItemId) ? selectedItems.value : catalogItemId);
};

const onUpdateActiveState = (activeValue, catalogItemId) => {
  emit('update-active-state', activeValue, catalogItemId);
};

const getCurrency = (item) => {
  return useCurrencySymbol(props.currency, item?.unit || props?.unit || '');
};

const onChangeOrder = () => emit('update-order');
</script>

<style lang="postcss" scoped>
.product-table {
  &__th {
    @apply p-0;

    &._main {
      @apply flex items-center pl-4 py-4;
    }
  }

  &__filter {
    @apply px-4 text-left text-sm text-gray-500 leading-6;
  }
}
</style>
