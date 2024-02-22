<template>
  <article class="ds-cart-list">
    <header class="ds-cart-list__header">
      <strong class="ds-cart-list__title">{{ localizer.t('cart.cart') }}</strong>
      <span class="ds-cart-list__counter">{{ cartStorage.counter }}</span>
    </header>
    <section class="ds-cart-list__section">
      <DsCartWarning
        v-if="cartStorage.storageStatuses.includes(STATUSES.DELETED)"
        status="deleted"
      />
      <DsCartWarning v-if="hasChanged" status="changed" />
      <ds-list type="vertical">
        <ds-list-item v-for="currentItem in currentItems" :key="currentItem.id">
          <DsCartListItem
            :id="currentItem.id"
            :title="currentItem.item.title"
            :image="currentItem.item.images?.[0]"
            :price="currentItem.item.price"
            :count="currentItem.count"
            :statuses="currentItem.statuses"
            :symbol="getSymbol(currentItem.item)"
            :unit="getUnit(currentItem.item)"
          />
        </ds-list-item>
      </ds-list>

      <DsCartWarning
        v-if="notAvailableItems.length > 0"
        status="not available"
        @delete-items="deleteNotAvailableItems"
      />

      <ds-list>
        <ds-list-item v-for="notAvailableItem in notAvailableItems" :key="notAvailableItem.id">
          <DsCartListItem
            :id="notAvailableItem.id"
            :title="notAvailableItem.item.title"
            :image="notAvailableItem.item.images?.[0]"
            :price="notAvailableItem.item.price"
            :count="notAvailableItem.count"
            :statuses="notAvailableItem.statuses"
          />
        </ds-list-item>
      </ds-list>
    </section>
    <footer class="ds-cart-list__footer">
      <div class="ds-cart-list__footer-wrapper">
        <p class="ds-cart-list__price-text">{{ localizer.t('cart.total') }}</p>
        <div class="ds-cart-list__price-wrapper">
          <span v-if="oldPrice !== price" class="ds-cart-list__old-price">{{ oldPrice }} ₽</span>
          <strong class="ds-cart-list__price">{{ price }} ₽</strong>
        </div>
      </div>
      <DsButton :text="localizer.t('cart.order')" :stretch="true" @click="onClick" />
    </footer>
  </article>
</template>

<script setup>
import DsButton from 'site-ui/src/design-system/ds-button/ds-button.vue';
import { useCartStorage } from 'site-ui/src/design-system/ds-cart/cart-storage.js';
import DsCartListItem from 'site-ui/src/design-system/ds-cart/ds-cart-list-item.vue';
import DsCartWarning from 'site-ui/src/design-system/ds-cart/ds-cart-warning.vue';
import DsListItem from 'site-ui/src/design-system/ds-list/ds-list-item.vue';
import DsList from 'site-ui/src/design-system/ds-list/ds-list.vue';
import { localizer } from 'site-ui/src/localizer/localizer';
import { computed, onBeforeMount, onBeforeUnmount } from 'vue';
import { STATUSES } from './constants/statuses.js';

const property = defineProps({
  catalogs: {
    type: Array,
    default: () => [],
  },
});

const cartStorage = useCartStorage();

const emit = defineEmits(['click']);

onBeforeMount(() => {
  cartStorage.openCartList();
});

onBeforeUnmount(() => {
  cartStorage.closeCartList();
});

const currentItems = computed(() => {
  return cartStorage.storage.filter((item) => {
    return !item.statuses.some(
      (status) => status === STATUSES.NOT_AVAILABLE || status === STATUSES.DELETED
    );
  });
});

const notAvailableItems = computed(() => {
  return cartStorage.storage.filter((item) => {
    return item.statuses.includes(STATUSES.NOT_AVAILABLE);
  });
});

const hasChanged = computed(() => {
  return cartStorage.storageStatuses.some(
    (status) => status === STATUSES.STOCK_CHANGED || status === STATUSES.PRICE_CHANGED
  );
});

const price = computed(() => {
  return getSum('currentPrice')
    .toFixed(2)
    .replace(/[,.]?0+$/, '');
});

const oldPrice = computed(() => {
  return getSum('oldPrice')
    .toFixed(2)
    .replace(/[,.]?0+$/, '');
});

function getSymbol(item) {
  return property.catalogs.find((catalog) => catalog.id === item.catalogId).currency.symbol;
}

function getUnit(item) {
  const catalogUnit = property.catalogs.find((catalog) => catalog.id === item.catalogId)?.currency
    ?.unit;

  return item.price.unit || catalogUnit;
}

function onClick() {
  emit('click', { price: price.value, oldPrice: oldPrice.value });
}

function deleteNotAvailableItems() {
  for (const item of notAvailableItems.value) {
    cartStorage.deleteItem(item.id);
  }
}

function getSum(price) {
  let sum = 0;

  for (const currentItem of currentItems.value) {
    const count = currentItem.count;

    sum += getPrice(currentItem.item, price) * count;
  }

  return sum;
}

function getPrice(currentItem, price) {
  if (currentItem.price[price]) {
    return currentItem.price[price];
  }

  return currentItem.price.currentPrice;
}
</script>

<style lang="postcss" scoped>
@import 'site-ui/src/tokens/ui-tokens.css';

.ds-cart-list {
  padding: 16px 16px 0;

  @add-mixin desktop-all {
    padding: 24px 24px 0;
  }

  &__header {
    text-align: center;
    margin-bottom: 24px;
  }

  &__section {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  &__title {
    color: var(--font-primary);
    @add-mixin h4;

    @add-mixin desktop-all {
      text-align: center;
      @add-mixin h3;
    }
  }

  &__counter {
    color: var(--font-secondary);
    margin-left: 12px;
    @add-mixin b3;

    @add-mixin desktop-all {
      @add-mixin b2;
    }
  }

  &__footer {
    position: sticky;
    bottom: 0;
    padding: 16px 0 16px;
    margin-top: 16px;
    border-top: 1px solid var(--border-divider);
    background-color: var(--bg-layout-section);
    z-index: $z-sticky;

    @add-mixin desktop-all {
      padding: 24px 0;
      margin-top: 24px;
    }
  }

  &__footer-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 16px;

    @add-mixin desktop-all {
      margin-bottom: 24px;
    }
  }

  &__price-text {
    font-weight: 500;
    color: var(--font-primary);
    @add-mixin b3;

    @add-mixin desktop-all {
      @add-mixin b2;
    }
  }

  &__old-price {
    margin-right: 16px;
    text-decoration: line-through;
    font-weight: 300;
    color: var(--font-secondary);
    @add-mixin b3;

    @add-mixin desktop-all {
      @add-mixin b2;
    }
  }

  &__price {
    font-weight: 500;
    color: var(--font-primary);
    @add-mixin b3;

    @add-mixin desktop-all {
      @add-mixin b2;
    }
  }
}
</style>
