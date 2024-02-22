<template>
  <article class="ds-product-card">
    <a
      :[attributeHref]="url"
      class="ds-product-card__link"
      :class="{ 'ds-product-card__link_edit': !siteMode.isView }"
    >
      <div class="ds-product-card__image-wrapper">
        <DsImage
          :path="image"
          :size="resizerParams"
          loading="lazy"
          class="ds-product-card__image"
          :alt="title"
        />
      </div>
      <DsBadge
        v-if="badge"
        :text="badge.text"
        :icon="badge.icon"
        size="s"
        color="dark"
        class="ds-product-card__badge"
      />
      <template v-if="price">
        <div v-if="price.stock !== 0" class="ds-product-card__price-wrapper">
          <span
            v-if="price.currentPrice"
            class="ds-product-card__price"
            :class="{ 'ds-product-card__price_with-old-price': price.oldPrice }"
          >
            {{ price.currentPrice }}
            <template v-if="currency.symbol">{{ currency.symbol }}</template>
            <template v-if="currency.unit">{{ currency.unit }}</template>
          </span>
          <span v-if="price.oldPrice" class="ds-product-card__old-price">
            {{ price.oldPrice }}
            <template v-if="currency.symbol">{{ currency.symbol }}</template>
            <template v-if="currency.unit">{{ currency.unit }}</template>
          </span>
        </div>
        <span v-else class="ds-product-card__notice">{{ localizer.t('cardGroup.out') }}</span>
      </template>
      <strong class="ds-product-card__title">{{ title }}</strong>
      <p v-if="description" class="ds-product-card__description">{{ description }}</p>
      <span v-if="brand" class="ds-product-card__brand">{{ brand }}</span>
      <DsTagList
        v-if="tags && tags.length > 0"
        :tags="tags"
        :type="breakPoint.isMobileAll ? 'inline' : 'wrap'"
        :max-row="2"
        :class="{ 'ds-product-card__tags': button }"
      />
    </a>

    <DsButton
      v-if="button"
      :theme="button.theme"
      :color="button.color"
      :size="button.size"
      :disabled="button.disabled"
      :stretch="true"
      :text="button.text"
      :icon="button.icon"
      :url="button.url"
      :target="button.target"
      class="ds-product-card__button"
      @click="clickButton"
    />
  </article>
</template>

<script setup>
import { useBreakPoint } from 'site-ui/src/break-point/break-point';
import DsBadge from 'site-ui/src/design-system/ds-badge/ds-badge.vue';
import DsButton from 'site-ui/src/design-system/ds-button/ds-button.vue';
import DsImage from 'site-ui/src/design-system/ds-image/ds-image.vue';
import DsTagList from 'site-ui/src/design-system/ds-tag-list/ds-tag-list.vue';
import { localizer } from 'site-ui/src/localizer/localizer';
import { useSiteMode } from 'site-ui/src/site-mode/site-mode';
import { computed } from 'vue';

const breakPoint = useBreakPoint();
const siteMode = useSiteMode();

const emit = defineEmits(['click']);

const property = defineProps({
  id: {
    type: Number,
    default: null,
  },

  title: {
    type: String,
    default: '',
  },

  description: {
    type: String,
    default: '',
  },

  url: {
    type: String,
    default: '',
  },

  brand: {
    type: String,
    default: '',
  },

  tags: {
    type: Array,

    default() {
      return;
    },
  },

  price: {
    type: Object,

    default() {
      return;
    },
  },

  currency: {
    type: Object,

    default() {
      return;
    },
  },

  button: {
    type: Object,

    default() {
      return;
    },
  },

  badge: {
    type: Object,

    default() {
      return;
    },
  },

  image: {
    type: String,
    default: '',
  },

  resizerParams: {
    type: String,
    required: false,
    default: '600x',
  },
});

const attributeHref = computed(() => (siteMode.isView ? 'href' : null));

function clickButton() {
  if (property.button.url) {
    return;
  }

  emit('click', property.id);
}
</script>

<style lang="postcss" scoped>
@import 'site-ui/src/tokens/ui-tokens.css';

.ds-product-card {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;

  &__link {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    text-decoration: none;

    &_edit {
      cursor: not-allowed;
    }
  }

  &__image-wrapper {
    overflow: hidden;
    width: 100%;
    height: 296px;
    margin-bottom: 16px;
    border-radius: $radius-m;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.35s ease-in-out;

    &:hover {
      transform: scale(1.1);
    }

    &:active {
      transition: transform 0.35s ease-in-out;
      transform: scale(1);
    }
  }

  &__badge {
    position: absolute;
    top: 12px;
    right: 12px;
  }

  &__price-wrapper {
    margin-bottom: 8px;
  }

  &__price {
    color: var(--font-primary);
    font-weight: 700;
    @add-mixin b2;

    @add-mixin tablet-v {
      @add-mixin b1;
    }

    @add-mixin desktop-all {
      @add-mixin b1;
    }

    &_with-old-price {
      margin-right: 10px;
    }
  }

  &__old-price {
    display: inline-block;
    color: var(--font-secondary);
    font-weight: 300;
    text-decoration-line: line-through;
    @add-mixin b2;

    @add-mixin tablet-v {
      @add-mixin b1;
    }

    @add-mixin desktop-all {
      @add-mixin b1;
    }
  }

  &__notice {
    color: var(--font-danger);
    font-weight: 400;
    @add-mixin b4;

    @add-mixin tablet-v {
      @add-mixin b3;
    }

    @add-mixin desktop-all {
      @add-mixin b3;
    }
  }

  &__title {
    margin-bottom: 8px;
    color: var(--font-primary);
    font-weight: 500;
    @add-mixin b3;

    @add-mixin tablet-v {
      @add-mixin b2;
    }

    @add-mixin desktop-all {
      @add-mixin b2;
    }
  }

  &__description {
    margin-bottom: 16px;
    color: var(--font-secondary);
    white-space: pre-wrap;
    font-weight: 400;
    @add-mixin b4;
  }

  &__brand {
    margin-bottom: 16px;
    color: var(--font-primary);
    font-weight: 400;
    @add-mixin b4;
  }

  &__tags {
    margin-bottom: 16px;
  }

  &__button {
    margin-top: auto;
  }
}
</style>
