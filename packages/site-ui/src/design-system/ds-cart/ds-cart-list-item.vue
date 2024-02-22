<template>
  <div class="ds-cart-list-item">
    <DsImage :path="image" :alt="title" class="ds-cart-list-item__image" />
    <div class="ds-cart-list-item__content">
      <div class="ds-cart-list-item__description">
        <strong class="ds-cart-list-item__title">{{ title }}</strong>
        <p v-if="false">Доп инфо из селекта</p>
        <DsBadge
          v-if="statuses.includes(STATUSES.STOCK_CHANGED)"
          color="orange-soft"
          :text="localizer.t('cart.stockChanged')"
        />
        <DsBadge
          v-if="statuses.includes(STATUSES.NOT_AVAILABLE)"
          color="red-soft"
          :text="localizer.t('cart.outOfStock')"
        />
        <DsCounter
          v-if="price.stock"
          :count="count"
          class="ds-cart-list-item__counter"
          :max-count="price.stock"
          @cange-count="cangeCount"
        />
      </div>
      <div class="ds-cart-list-item__wrapper">
        <div v-if="price.stock" class="ds-cart-list-item__price-wrapper">
          <DsBadge
            v-if="statuses.includes(STATUSES.PRICE_CHANGED)"
            color="orange-soft"
            :text="localizer.t('cart.priceChanged')"
            class="ds-cart-list-item__price-badge"
          />
          <strong class="ds-cart-list-item__price">
            {{ price.currentPrice }} {{ symbol }}{{ unit }}
          </strong>
          <p v-if="price.oldPrice" class="ds-cart-list-item__old-price">
            {{ price.oldPrice }} {{ symbol }}{{ unit }}
          </p>
        </div>
        <DsButton theme="fab" size="xs" icon="trash-delete" @click="deleteItem" />
      </div>
    </div>
  </div>
</template>

<script setup>
import DsBadge from 'site-ui/src/design-system/ds-badge/ds-badge.vue';
import DsButton from 'site-ui/src/design-system/ds-button/ds-button.vue';
import { useCartStorage } from 'site-ui/src/design-system/ds-cart/cart-storage.js';
import DsCounter from 'site-ui/src/design-system/ds-counter/ds-counter.vue';
import DsImage from 'site-ui/src/design-system/ds-image/ds-image.vue';
import { localizer } from 'site-ui/src/localizer/localizer';
import { STATUSES } from './constants/statuses.js';

const cartStorage = useCartStorage();

const property = defineProps({
  id: {
    type: Number,
    required: true,
  },

  title: {
    type: String,
    default: '',
  },

  price: {
    type: Object,
    default: () => {},
  },

  symbol: {
    type: String,
    default: '',
  },

  unit: {
    type: String,
    default: '',
  },

  count: {
    type: Number,
    default: 1,
  },

  image: {
    type: String,
    default: '',
  },

  statuses: {
    type: Array,
    default: () => [],
  },
});

function cangeCount(value) {
  cartStorage.changeCount(property.id, value);
}

function deleteItem() {
  cartStorage.deleteItem(property.id);
}
</script>

<style lang="postcss" scoped>
@import 'site-ui/src/tokens/ui-tokens.css';
.ds-cart-list-item {
  display: flex;
  gap: 16px;

  @add-mixin desktop-all {
    gap: 20px;
  }

  &__image {
    width: 74px;
    height: 74px;
    flex-shrink: 0;
    border-radius: $radius-s;
    object-fit: cover;

    @add-mixin desktop-all {
      width: 115px;
      height: 115px;
    }
  }

  &__content {
    display: flex;
    gap: 12px;
    justify-content: space-between;
    flex-grow: 1;

    @add-mixin desktop-all {
      gap: 16px;
    }
  }

  &__description {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  &__title {
    display: block;
    margin-bottom: 4px;
    color: var(--font-primary);
    font-weight: 500;
    @add-mixin b4;

    @add-mixin desktop-all {
      @add-mixin b3;
    }
  }

  &__counter {
    margin-top: 8px;

    @add-mixin desktop-all {
      margin-top: 12px;
    }
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
    flex-shrink: 0;

    @add-mixin desktop-all {
      flex-direction: row;
      align-items: flex-start;
      gap: 16px;
    }
  }

  &__price-wrapper {
    display: flex;
    flex-direction: column;
    gap: 4px;
    text-align: right;
  }

  &__price-badge {
    margin-bottom: 4px;
  }

  &__price {
    color: var(--font-primary);
    font-weight: 400;
    @add-mixin b4;

    @add-mixin desktop-all {
      @add-mixin b3;
    }
  }

  &__old-price {
    color: var(--font-secondary);
    text-decoration: line-through;
    font-weight: 300;
    @add-mixin b4;

    @add-mixin desktop-all {
      @add-mixin b3;
    }
  }
}
</style>
