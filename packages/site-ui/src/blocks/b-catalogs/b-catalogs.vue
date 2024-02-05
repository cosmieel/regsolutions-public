<template>
  <article :id="'block-' + block.id" class="b-catalogs">
    <ds-container :title="block.title" :backed="false">
      <ds-list type="horizontal">
        <ds-list-item v-for="(item, index) in currentCatalogs" :key="getKey(index)">
          <DsProductCard
            :title="item.title"
            :description="trimString(item.text, 80)"
            :image="item.image"
            :resizer-params="imageSize"
            :url="getUrl(item)"
          />
        </ds-list-item>
      </ds-list>
      <div v-if="itemsNumber < catalogs.length" class="b-catalog__button-wrapper">
        <DsButton theme="ghost" icon="chevron-m-down" text="Показать еще" @click="showMore" />
      </div>
    </ds-container>
  </article>
</template>

<script setup>
import config from 'site-ui/src/configs/configs.js';
import DsButton from 'site-ui/src/design-system/ds-button/ds-button.vue';
import DsContainer from 'site-ui/src/design-system/ds-container/ds-container.vue';
import DsListItem from 'site-ui/src/design-system/ds-list/ds-list-item.vue';
import DsList from 'site-ui/src/design-system/ds-list/ds-list.vue';
import DsProductCard from 'site-ui/src/design-system/ds-product-card/ds-product-card.vue';
import { getSizesByCount } from 'site-ui/src/services/get-sizes-by-count/get-sizes-by-count';
import { trimString } from 'site-ui/src/services/trim-string/trim-string.js';
import { useSiteMode } from 'site-ui/src/site-mode/site-mode';
import { computed, ref } from 'vue';

const siteMode = useSiteMode();

const property = defineProps({
  block: {
    type: Object,
    required: true,
  },

  catalogs: {
    type: Array,
    default: () => [],
  },

  storageHost: {
    type: String,
    default: '',
  },
});

const itemsNumber = ref(6);

const catalogs = computed(() => {
  return property.catalogs.filter((catalog) => {
    return property.block.catalogsId.includes(catalog.id);
  });
});

const currentCatalogs = computed(() => {
  if (!catalogs.value) {
    return [];
  }

  if (catalogs.value.length <= itemsNumber.value) {
    return catalogs.value;
  }

  return catalogs.value.slice(0, itemsNumber.value);
});

const imageSize = computed(() =>
  getSizesByCount(currentCatalogs.value.length, 3, config.resize.catalogs.size)
);

function showMore() {
  if (siteMode.isEdit) {
    return;
  }

  itemsNumber.value =
    catalogs.value.length >= itemsNumber.value + 6 ? itemsNumber.value + 6 : catalogs.value.length;
}

function getUrl(item) {
  return `/catalog/${item.slug}`;
}

function getKey(index) {
  return `${index}${Math.random()}`;
}
</script>

<style lang="postcss" scoped>
@import 'site-ui/src/tokens/ui-tokens.css';

.b-catalog {
  &__button-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 32px;

    @add-mixin desktop-all {
      margin-top: 56px;
    }
  }
}
</style>
