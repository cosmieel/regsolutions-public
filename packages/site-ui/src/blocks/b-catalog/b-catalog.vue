<template>
  <article :id="'block-' + block.id" class="b-catalog">
    <ds-container :title="block.title" :backed="false">
      <ds-list type="horizontal">
        <ds-list-item v-for="(item, index) in currentItems" :key="getKey(index)">
          <DsProductCard
            :id="item.id"
            :title="item.title"
            :price="item.price"
            :currency="getCurrency(item)"
            :description="trimString(item.text, 80)"
            :url="getUrl(item.slug)"
            :brand="item.brand"
            :tags="item.tags"
            :button="getButtonParameters()"
            :image="item.images?.[0]"
            :badge="item.badge"
            :resizer-params="resizeConfig.products"
            @click="clickToButtonProduct(item)"
          />
        </ds-list-item>
      </ds-list>
      <div v-if="itemsNumber < catalogItems.length" class="b-catalog__button-wrapper">
        <DsButton
          theme="ghost"
          icon="chevron-m-down"
          :text="localizer.t('cardGroup.show')"
          @click="showMore"
        />
      </div>
    </ds-container>
    <DsOrder
      v-if="showOrder"
      :item="currentItem"
      :checkout="catalog.checkout"
      :action="action"
      @close="closeOrder"
    />
  </article>
</template>

<script setup>
import { resizeConfig } from 'site-ui/src/configs/resize-config.js';
import DsButton from 'site-ui/src/design-system/ds-button/ds-button.vue';
import { useCartStorage } from 'site-ui/src/design-system/ds-cart/cart-storage.js';
import DsContainer from 'site-ui/src/design-system/ds-container/ds-container.vue';
import DsListItem from 'site-ui/src/design-system/ds-list/ds-list-item.vue';
import DsList from 'site-ui/src/design-system/ds-list/ds-list.vue';
import { notificationManager } from 'site-ui/src/design-system/ds-notification/manager/notification-manager.js';
import DsOrder from 'site-ui/src/design-system/ds-order/ds-order.vue';
import DsProductCard from 'site-ui/src/design-system/ds-product-card/ds-product-card.vue';
import { localizer } from 'site-ui/src/localizer/localizer';
import { trimString } from 'site-ui/src/services/trim-string/trim-string.js';
import { useSiteMode } from 'site-ui/src/site-mode/site-mode';
import { computed, ref } from 'vue';

const siteMode = useSiteMode();
const cartStorage = useCartStorage();

const property = defineProps({
  block: {
    type: Object,
    required: true,
  },

  catalogs: {
    type: Array,
    default: () => [],
  },

  catalogItems: {
    type: Array,
    default: () => [],
  },

  action: {
    type: Object,
    required: true,
  },
});

const itemsNumber = ref(6);
const showOrder = ref(false);
const currentItem = ref(null);

const catalog = computed(() => {
  return property.catalogs.find((item) => {
    return item.id === property.block.catalogId;
  });
});

const catalogItems = computed(() => {
  return property.catalogItems.filter((item) => {
    return item.catalogId === property.block.catalogId;
  });
});

const currentItems = computed(() => {
  if (catalogItems.value.length <= itemsNumber.value) {
    return catalogItems.value;
  }

  return catalogItems.value.slice(0, itemsNumber.value);
});

function showMore() {
  if (siteMode.isEdit) {
    return;
  }

  itemsNumber.value =
    catalogItems.value.length >= itemsNumber.value + 6
      ? itemsNumber.value + 6
      : catalogItems.value.length;
}

function clickToButtonProduct(item) {
  if (
    catalog.value.checkout.type === 'CART' &&
    item.price.stock > cartStorage.getItemCount(item.id)
  ) {
    cartStorage.addItem(item);
    notificationManager.add({
      type: 'info',
      autoClose: true,
      item: {
        type: 'plain',
        icon: 'checkmark',
        title: localizer.t('notifier.cart'),
      },
    });
  }

  if (catalog.value.checkout.type === 'FORM') {
    currentItem.value = item;
    showOrder.value = true;
  }
}

function closeOrder() {
  currentItem.value = null;
  showOrder.value = false;
}

function getButtonParameters() {
  const text = catalog.value.button?.text || localizer.t('cardGroup.order');
  const url = catalog.value.checkout.type === 'URL' ? catalog.value.checkout.url : '';
  const target = '_blank';

  return url ? { text, url, target } : { text };
}

function getCurrency(item) {
  const currentUnit = item.price?.unit || catalog.value.currency?.unit || '';

  return {
    code: catalog.value.currency?.code,
    symbol: catalog.value.currency?.symbol,
    unit: currentUnit,
  };
}

function getUrl(slugItem) {
  return `/item/${slugItem}`;
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
