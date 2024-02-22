<template>
  <UiTable class="catalog-table" :list="catalogsList" @change-order="onChangeOrder">
    <template #ui-table-head>
      <tr class="catalog-table__tr">
        <th scope="col" class="catalog-table__th _checkbox">
          <UiCheckbox :model-value="allSelected" @change="handleSelectAll()" />
        </th>
        <th scope="col" class="catalog-table__th _filter">Все</th>
      </tr>
    </template>
    <template #ui-table-body>
      <CatalogTableItem
        v-for="catalog in catalogsList"
        :key="catalog.id"
        v-model:active="catalog.active"
        :checked="selectedItems.some((item) => item === catalog.id)"
        :catalog-id="catalog.id"
        :name="catalog.name"
        :image="catalog.image"
        :count="catalog.count"
        :is-bulk-deletion="getIsBulk(catalog.id)"
        @delete-catalog="onDeleteCatalog(catalog.id)"
        @update-active-state="onUpdateActiveState"
        @catalog-check="handleChange(catalog.id)"
      />
    </template>
  </UiTable>
</template>

<script setup>
import { useBulkItems } from 'account/src/utility/composition/use-bulk-items.js';
import { UiCheckbox, UiTable } from 'account-ui';
import { computed } from 'vue';
import CatalogTableItem from './catalog-table-item.vue';

const props = defineProps({
  catalogsList: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['delete-catalog', 'update-active-state', 'update-order']);

const {
  selectedItems,
  handleSelectAll,
  allSelected,
  handleChange,
  hasInList,
  getIsBulk,
  handleRemoveSeveral,
} = useBulkItems(computed(() => props.catalogsList.map((item) => item.id)));

const onDeleteCatalog = (catalogId) => {
  const inList = hasInList(catalogId);

  emit('delete-catalog', inList ? selectedItems.value : catalogId);

  if (inList) {
    handleRemoveSeveral(selectedItems.value);
  }
};

const onUpdateActiveState = (activeValue, catalogId) => {
  emit('update-active-state', activeValue, catalogId);
};

const onChangeOrder = () => emit('update-order');
</script>

<style lang="postcss" scoped>
.catalog-table {
  &__tr {
    @apply flex;
  }

  &__th {
    &._checkbox {
      @apply py-5 pl-4 pr-0;
    }

    &._filter {
      @apply px-4 py-4 text-left text-sm text-gray-500 leading-6 flex-grow;
    }
  }
}
</style>
