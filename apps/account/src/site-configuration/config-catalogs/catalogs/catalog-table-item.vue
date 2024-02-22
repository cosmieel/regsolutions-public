<template>
  <tr class="catalog-table-item">
    <td class="catalog-table-item__td _checkbox">
      <UiCheckbox
        :id="catalogId"
        :model-value="checked"
        :name="catalogId"
        :value="catalogId"
        @change="onCatalogCheck"
      />
    </td>

    <td class="catalog-table-item__td _cover">
      <div class="catalog-table-item__cover">
        <MediaImage v-if="image" :path="image" :size="config.resize.catalogTableItem" />
      </div>
    </td>

    <td class="catalog-table-item__td _name">
      <router-link :to="{ name: 'siteConfigurationCatalogSettings', params: { catalogId } }">
        <div class="catalog-table-item__name">
          {{ name }}
        </div>
      </router-link>
    </td>

    <td class="catalog-table-item__td _count">
      <div class="catalog-table-item__count" :title="`${count} шт`">{{ count }} шт</div>
    </td>

    <td class="catalog-table-item__td _toggle">
      <div class="catalog-table-item__activate">
        <UiSwitch v-model="activeModel" tooltip="Показывать на сайте" />
      </div>
    </td>

    <td class="catalog-table-item__td _delete">
      <div
        class="catalog-table-item__delete"
        @click="callDeleteCatalogModal(onDeleteCatalog, isBulkDeletion)"
      >
        <UiIcon name="trash-delete" :size="16" />
      </div>
    </td>
  </tr>
</template>

<script setup>
import MediaImage from 'account/src/components/media/media-image.vue';
import config from 'account/src/config/config.js';
import { UiCheckbox, UiIcon, UiSwitch } from 'account-ui';
import { computed, watch } from 'vue';
import { callDeleteCatalogModal } from '../modals/delete-catalog-modal.js';

const props = defineProps({
  catalogId: {
    type: Number,
    default: -1,
  },

  name: {
    type: String,
    default: '',
  },

  count: {
    type: Number,
    default: 0,
  },

  image: {
    type: String,
    default: '',
  },

  active: {
    type: Boolean,
    default: false,
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
  'delete-catalog',
  'update:active',
  'update-active-state',
  'catalog-check',
]);

const activeModel = computed({
  get() {
    return props.active;
  },
  set(value) {
    emit('update:active', value);
  },
});

const onDeleteCatalog = () => {
  emit('delete-catalog');
};

watch(
  () => props.active,
  (value) => {
    emit('update-active-state', value, props.catalogId);
  },
  { deep: true }
);

const onCatalogCheck = () => {
  emit('catalog-check');
};
</script>

<style lang="postcss" scoped>
.catalog-table-item {
  @apply flex;

  &__td {
    @apply whitespace-nowrap text-sm leading-6 text-gray-700 p-0;

    &._checkbox {
      @apply py-5 pl-4 w-8;
    }

    &._cover {
      @apply pl-4 py-2 w-[56px];
    }

    &._name {
      @apply px-4 py-4 max-w-[260px] flex-grow;
    }

    &._count {
      @apply pl-4 py-4 w-[60px] max-w-[60px];
    }

    &._toggle {
      @apply px-4 py-4 w-[74px] max-w-[74px];
    }

    &._delete {
      @apply px-4 py-[18px] w-[52px] max-w-[52px];
    }
  }

  &__cover {
    @apply w-10 h-10 rounded-lg bg-gray-100 overflow-hidden;

    img {
      @apply w-full h-full object-cover rounded-lg;
    }
  }

  &__name {
    @apply truncate;
  }

  &__count {
    @apply truncate;
  }

  &__delete {
    @apply cursor-pointer flex justify-center items-center;
  }
}
</style>
