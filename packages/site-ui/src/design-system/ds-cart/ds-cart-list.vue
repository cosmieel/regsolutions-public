<template>
  <article class="ds-cart-list">
    <header class="ds-cart-list__header">
      <strong class="ds-cart-list__title">Корзина</strong>
      <span class="ds-cart-list__counter">{{ cartStorage.counter }}</span>
    </header>
    <section>
      <ds-list type="vertical">
        <ds-list-item v-for="item in curentItems" :key="item.title">
          <DsCartListItem
            :id="item.id"
            :title="item.title"
            :image="item.images?.[0]"
            :price="item.price"
            :count="getCount(item.id)"
          />
        </ds-list-item>
      </ds-list>
    </section>
    <footer class="ds-cart-list__footer">
      <div class="ds-cart-list__footer-wrapper">
        <p class="ds-cart-list__price-text">Итого</p>
        <div class="ds-cart-list__price-wrapper">
          <span v-if="oldPrice !== price" class="ds-cart-list__old-price">{{ oldPrice }} ₽</span>
          <strong class="ds-cart-list__price">{{ price }} ₽</strong>
        </div>
      </div>
      <DsButton text="Оформить заказ" :stretch="true" @click="onClick" />
    </footer>
  </article>
</template>

<script setup>
import DsButton from 'site-ui/src/design-system/ds-button/ds-button.vue';
import { useCartStorage } from 'site-ui/src/design-system/ds-cart/cart-storage.js';
import DsCartListItem from 'site-ui/src/design-system/ds-cart/ds-cart-list-item.vue';
import DsListItem from 'site-ui/src/design-system/ds-list/ds-list-item.vue';
import DsList from 'site-ui/src/design-system/ds-list/ds-list.vue';
import { computed } from 'vue';

const property = defineProps({
  catalogItems: {
    type: Array,
    default: () => [],
  },

  storageHost: {
    type: String,
    default: '',
  },
});

const cartStorage = useCartStorage();

const emit = defineEmits(['click']);

const curentItems = computed(() => {
  const idArray = new Set(cartStorage.storage.map((item) => item.id));

  return property.catalogItems.filter((item) => {
    return idArray.has(item.id);
  });
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

function onClick() {
  emit('click', { price: price.value, oldPrice: oldPrice.value });
}

function getCount(id) {
  return cartStorage.storage.find((item) => item.id === id).count;
}

function getSum(price) {
  let sum = 0;

  for (const storageItem of cartStorage.storage) {
    const count = storageItem.count;

    for (const currentItem of curentItems.value) {
      if (storageItem.id === currentItem.id) {
        sum += getPrice(currentItem, price) * count;
      }
    }
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
