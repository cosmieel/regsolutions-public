<template>
  <div class="ds-cart-list-item">
    <DsImage :path="image" :alt="title" class="ds-cart-list-item__image" />
    <div class="ds-cart-list-item__content">
      <div class="ds-cart-list-item__description">
        <strong class="ds-cart-list-item__title">{{ title }}</strong>
        <p v-if="false">Доп инфо из селекта</p>

        <DsCounter
          v-if="price.stock && price.stock !== 1"
          :count="count"
          class="ds-cart-list-item__counter"
          :max-count="price.stock"
          @cange-count="cangeCount"
        />
      </div>
      <div class="ds-cart-list-item__wrapper">
        <div class="ds-cart-list-item__price-wrapper">
          <strong class="ds-cart-list-item__price">
            {{ price.currentPrice }} {{ price.unit }}
          </strong>
          <p v-if="price.oldPrice" class="ds-cart-list-item__old-price">
            {{ price.oldPrice }} {{ price.unit }}
          </p>
        </div>
        <DsButton theme="fab" size="s" icon="trash-delete" @click="deleteItem" />
      </div>
    </div>
  </div>
</template>

<script setup>
import DsButton from 'site-ui/src/design-system/ds-button/ds-button.vue';
import { useCartStorage } from 'site-ui/src/design-system/ds-cart/cart-storage.js';
import DsCounter from 'site-ui/src/design-system/ds-counter/ds-counter.vue';
import DsImage from 'site-ui/src/design-system/ds-image/ds-image.vue';

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

  count: {
    type: Number,
    default: 1,
  },

  image: {
    type: String,
    default: '',
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
    gap: 16px;
    justify-content: space-between;
    flex-grow: 1;
  }

  &__title {
    display: block;
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
      margin-top: 16px;
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
