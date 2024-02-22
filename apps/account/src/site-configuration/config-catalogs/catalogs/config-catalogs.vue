<template>
  <section v-if="isCatalogsLoading || catalogsFetchStatus === 'fetching'">Загрузка...</section>
  <section v-else-if="isCatalogsError">Произошла ошибка: {{ catalogsError }}</section>
  <section v-else-if="isCatalogsSuccess" class="config-catalogs">
    <UiCard
      v-if="currentCatalogsListFiltered.length > 0"
      :title="'Каталоги'"
      :description="'Добавьте каталоги с товарами вручную или загрузите список файлом CSV'"
      :need-divider="false"
    >
      <template #ui-card-button>
        <CatalogCreationDropdown :button="'Добавить'" />
      </template>
      <template #default>
        <CatalogTable
          :catalogs-list="currentCatalogsListFiltered"
          @delete-catalog="onDeleteCatalog"
          @update-active-state="onUpdateActiveState"
          @update-order="onUpdateOrder"
        />
      </template>
    </UiCard>

    <UiCard
      v-else
      :title="'Создадим первый каталог?'"
      :need-controls="false"
      :need-header="false"
      :need-divider="false"
    >
      <template #default>
        <EmptyCatalog />
      </template>
    </UiCard>

    <ModalAddBnovo />
  </section>
</template>

<script setup>
import { UiCard } from 'account-ui';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import CatalogTable from './catalog-table.vue';
import EmptyCatalog from './empty-catalog.vue';
import ModalAddBnovo from './modal-add-bnovo.vue';
import { useCatalogConfigurationStore } from '../../stores/catalog-configuration-store.js';
import CatalogCreationDropdown from '../catalog-creation-dropdown.vue';

const catalogConfigurationStore = useCatalogConfigurationStore();
const {
  isCatalogsSuccess,
  isCatalogsLoading,
  isCatalogsError,
  catalogsError,
  catalogsFetchStatus,
  currentCatalogsListFiltered,
} = storeToRefs(catalogConfigurationStore);

const onDeleteCatalog = async (catalogId) => {
  await catalogConfigurationStore.deleteCatalog(catalogId);
};

const onUpdateActiveState = async (active, id) => {
  await catalogConfigurationStore.updateActiveState(id, active);
};

const onUpdateOrder = async () => {
  await catalogConfigurationStore.batchUpdateCatalogRequest();
};

onMounted(async () => {
  await catalogConfigurationStore.forceDeletion();
});
</script>

<style lang="postcss" scoped>
.config-catalogs {
  @apply space-y-6;

  &__add {
    &-button {
      @apply flex items-center justify-center;

      svg {
        @apply mr-1;
      }
    }

    &-dropdown {
      @apply w-[200px] translate-y-1;
    }
  }
}
</style>
