<template>
  <article
    v-if="type === 'hero'"
    :id="'block-' + block.id"
    class="b-product-hero"
    :class="{ 'b-product-hero_backed-content': block.backedContent }"
  >
    <div
      class="b-product-hero__wrapper"
      :class="[
        { 'b-product-hero__wrapper_reverse': block.reverse },
        { 'b-product-hero__wrapper_backed-content': block.backedContent },
      ]"
    >
      <div class="b-product-hero__gallery">
        <DsBadge
          v-if="itemParameters.badge"
          :icon="itemParameters.badge.icon"
          :text="itemParameters.badge.text"
          size="m"
          class="b-product-hero__badge"
        />
        <template v-if="itemParameters.images?.length === 1">
          <DsImage :path="itemParameters.images[0]" alt="" class="b-product-hero__substrate" />
          <DsImage
            :path="itemParameters.images[0]"
            :alt="itemParameters.title"
            class="b-product-hero__image"
            @click="showGalleryModal(index)"
          />
        </template>

        <ds-slider
          v-else
          :items="itemParameters.images.length"
          type="single"
          :controls="controls"
          :need-gradient="true"
          pagination="inverse"
        >
          <ds-slide v-for="(image, index) in itemParameters.images" :key="getKey(index)">
            <DsImage :path="image" alt="" loading="lazy" class="b-product-hero__substrate" />
            <DsImage
              :path="image"
              :alt="itemParameters.title"
              loading="lazy"
              class="b-product-hero__image"
              @click="showGalleryModal(index)"
            />
          </ds-slide>
        </ds-slider>
      </div>
      <div
        ref="description"
        class="b-product-hero__description"
        :class="{
          'b-product-hero__description_backed-content': block.backedContent,
        }"
      >
        <p v-if="itemParameters.price?.stock === 0" class="b-product-hero__unavailable">
          Нет в наличие
        </p>
        <h1 class="b-product-hero__content-title">
          {{ itemParameters.title }}
        </h1>
        <div v-if="itemParameters.sku || itemParameters.brand" class="b-product-hero__category">
          {{ itemParameters.sku }}
          <template v-if="itemParameters.sku && itemParameters.brand"> · </template>
          {{ itemParameters.brand }}
        </div>

        <div v-if="itemParameters.price?.currentPrice" class="b-product-hero__price-wrapper">
          <span
            class="b-product-hero__price"
            :class="{ 'b-product-hero__price_with-old-price': itemParameters.price.oldPrice }"
          >
            {{ itemParameters.price.currentPrice }}
            <template v-if="currency.symbol">{{ currency.symbol }}</template>
            <template v-if="currency.unit">{{ currency.unit }}</template>
          </span>
          <span v-if="itemParameters.price.oldPrice" class="b-product-hero__old-price">
            {{ itemParameters.price.oldPrice }}
            <template v-if="currency.symbol">{{ currency.symbol }}</template>
            <template v-if="currency.unit">{{ currency.unit }}</template>
          </span>
        </div>

        <p
          ref="text"
          class="b-product-hero__text"
          :class="{ 'b-product-hero__text_gradient': needGradient }"
          @click="showModal"
        >
          {{ itemParameters.text }}
          <DsGradient v-if="needGradient" position="bottom" />
        </p>
        <DsTagList
          v-if="itemParameters.tags && itemParameters.tags.length > 0"
          :tags="itemParameters.tags"
          :modal="true"
          :type="breakPoint.isMobileAll ? 'inline' : 'wrap'"
          :max-row="2"
          class="b-product-hero__tag-list"
        />

        <div class="b-product-hero__button-wrapper">
          <DsButton
            :color="getButtonColor(1, 0)"
            :text="getButtonText()"
            :stretch="breakPoint.isMobileAll"
            :disabled="isDisabled()"
            class="b-product-hero__button"
            @click="clickToButtonProduct()"
          />
        </div>
      </div>
    </div>
    <ds-modal v-if="modal" @close="modal = false">
      <div class="b-product-hero__modal">
        <strong class="b-product-hero__content-title">
          {{ itemParameters.title }}
        </strong>
        <p class="b-product-hero__text">
          {{ itemParameters.text }}
        </p>
      </div>
    </ds-modal>
    <DsModalGallery
      v-if="modalGallery"
      :images="galleryImages"
      :active="activeImage"
      @close="modalGallery = false"
    />
    <DsOrder
      v-if="showOrder"
      :item="itemParameters"
      :checkout="catalog.checkout"
      :action="action"
      @close="showOrder = false"
    />
  </article>
</template>

<script setup>
import { useBreakPoint } from 'site-ui/src/break-point/break-point';
import DsBadge from 'site-ui/src/design-system/ds-badge/ds-badge.vue';
import DsButton from 'site-ui/src/design-system/ds-button/ds-button.vue';
import { useCartStorage } from 'site-ui/src/design-system/ds-cart/cart-storage.js';
import DsGradient from 'site-ui/src/design-system/ds-gradient/ds-gradient.vue';
import DsImage from 'site-ui/src/design-system/ds-image/ds-image.vue';
import DsModal from 'site-ui/src/design-system/ds-modal/ds-modal.vue';
import DsModalGallery from 'site-ui/src/design-system/ds-modal-gallery/ds-modal-gallery.vue';
import { notificationManager } from 'site-ui/src/design-system/ds-notification/manager/notification-manager.js';
import DsOrder from 'site-ui/src/design-system/ds-order/ds-order.vue';
import DsSlide from 'site-ui/src/design-system/ds-slider/ds-slide.vue';
import DsSlider from 'site-ui/src/design-system/ds-slider/ds-slider.vue';
import DsTagList from 'site-ui/src/design-system/ds-tag-list/ds-tag-list.vue';
import { ref, computed, onMounted, onUnmounted } from 'vue';

const cartStorage = useCartStorage();

const breakPoint = useBreakPoint();
const maxDescriptionHeightOnDesktop = 520;
const maxTextHeightOnMobile = 160;

const property = defineProps({
  block: {
    type: Object,
    required: true,
  },

  type: {
    type: String,
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

  storageHost: {
    type: String,
    default: '',
  },
});

onMounted(() => {
  if (text.value) {
    changeTextHeight();
    breakPoint.onResize(changeTextHeight);
  }
});

onUnmounted(() => {
  breakPoint.destroy(changeTextHeight);
});

const text = ref(null);
const description = ref(null);
const needGradient = ref(false);
const modal = ref(false);
const modalGallery = ref(false);
const activeImage = ref(0);
const showOrder = ref(false);

const itemParameters = computed(() => {
  return property.catalogItems.find((item) => {
    return item.id === property.block.itemId;
  });
});

const catalog = computed(() => {
  return property.catalogs.find((item) => {
    return item.id === itemParameters.value.catalogId;
  });
});

const currency = computed(() => {
  const currentUnit = itemParameters.value.price?.unit || catalog.value.currency?.unit || '';

  return {
    code: catalog.value.currency?.code,
    symbol: catalog.value.currency?.symbol,
    unit: currentUnit,
  };
});

const controls = computed(() => {
  return breakPoint.isMobileAll ? '' : 'secondary';
});

const galleryImages = computed(() => {
  const galleryImages = [];

  for (const image of itemParameters.value.images) {
    galleryImages.push({ url: image });
  }

  return galleryImages;
});

function changeTextHeight() {
  text.value.removeAttribute('style');
  needGradient.value = false;

  const textHeight = text.value.clientHeight;
  const descriptionHeight = description.value.clientHeight;

  if (breakPoint.isMobileAll && textHeight > maxTextHeightOnMobile) {
    addTextHeight(maxTextHeightOnMobile);
    needGradient.value = true;
  }

  if (!breakPoint.isMobileAll && descriptionHeight > maxDescriptionHeightOnDesktop) {
    const maxTextHeight = maxDescriptionHeightOnDesktop - (descriptionHeight - textHeight);
    addTextHeight(maxTextHeight);
    needGradient.value = true;
  }
}

function addTextHeight(height) {
  text.value.style.height = `${height}px`;
}

function showModal() {
  if (needGradient.value) {
    modal.value = true;
  }
}

function showGalleryModal(index) {
  activeImage.value = index;
  modalGallery.value = true;
}

function getButtonColor(length, index) {
  return length === 2 && index === 0 ? 'secondary' : 'primary';
}

function getButtonText() {
  const text = catalog.value.button?.text || 'Заказать';

  return text;
}

function clickToButtonProduct() {
  if (
    catalog.value.checkout.type === 'CART' &&
    itemParameters.value.price.stock > cartStorage.getItemCount(itemParameters.value.id)
  ) {
    cartStorage.addItem(itemParameters.value.id);
    notificationManager.add({
      type: 'info',
      autoClose: true,
      item: {
        type: 'plain',
        icon: 'checkmark',
        title: 'Добавлено в корзину',
      },
    });
  }

  if (catalog.value.checkout.type === 'FORM') {
    showOrder.value = true;
  }

  if (catalog.value.checkout.type === 'URL') {
    window.open(`${catalog.value.checkout.url}`, '_blank');
  }
}

function isDisabled() {
  return itemParameters.value.price.stock === 0 ? true : false;
}

function getKey(index) {
  return `${index}${Math.random()}`;
}
</script>

<style lang="postcss" scoped>
@import 'site-ui/src/tokens/ui-tokens.css';

.b-product-hero {
  &_backed-content {
    background-color: var(--bg-layout-section);
    box-shadow: $shadow-s;
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 1440px;
    margin: auto;
    overflow: hidden;

    @add-mixin tablet-v {
      gap: 24px;
      padding: 24px 24px 0;
    }

    @add-mixin desktop-all {
      flex-direction: row;
      align-items: center;
      gap: 80px;
      height: 660px;
      padding: 40px 80px 0;
    }

    @add-mixin tablet-h {
      gap: 24px;
      height: 576px;
      padding: 56px 56px 0;
    }

    &_backed-content {
      @add-mixin tablet-v {
        padding: 24px;
      }

      @add-mixin desktop-all {
        height: 700px;
        padding: 40px 80px;
      }

      @add-mixin tablet-h {
        height: 632px;
        padding: 56px;
      }
    }

    &_reverse {
      @add-mixin desktop-all {
        flex-direction: row-reverse;
      }
    }
  }

  &__description {
    padding: 0 16px;

    @add-mixin tablet-v {
      padding: 0;
      text-align: center;
    }

    @add-mixin desktop-all {
      flex-basis: 388px;
      padding: 0;
    }

    &_backed-content {
      padding: 0 16px 16px;

      @add-mixin tablet-v {
        padding: 0;
      }

      @add-mixin desktop-all {
        padding: 0;
      }
    }
  }

  &__unavailable {
    padding-bottom: 8px;
    color: var(--font-danger);
    @add-mixin b3;
  }

  &__content-title {
    display: block;
    margin-bottom: 12px;
    @add-mixin h4;

    @add-mixin tablet-v {
      @add-mixin h3;
    }

    @add-mixin desktop-all {
      @add-mixin h2;
    }
  }

  &__price-wrapper {
    margin-bottom: 16px;

    @add-mixin tablet-v {
      margin-bottom: 12px;
    }

    @add-mixin desktop-all {
      margin-bottom: 16px;
    }
  }

  &__price {
    color: var(--font-primary);
    font-weight: 500;
    @add-mixin b2;

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
  }

  &__category {
    margin-bottom: 8px;
    color: var(--font-secondary);
    @add-mixin b4;

    @add-mixin tablet-v {
      @add-mixin b3;
    }

    @add-mixin desktop-all {
      @add-mixin b3;
    }
  }

  &__text {
    position: relative;
    overflow: hidden;
    color: var(--font-secondary);
    white-space: pre-wrap;
    @add-mixin b4;

    @add-mixin desktop-all {
      @add-mixin b3;
    }

    &_gradient {
      cursor: pointer;
    }
  }

  &__tag-list {
    margin-top: 16px;

    @add-mixin tablet-v {
      margin-top: 24px;
    }

    @add-mixin desktop-all {
      margin-top: 24px;
    }
  }

  &__button-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    margin-top: 16px;

    @add-mixin tablet-v {
      margin-top: 24px;
    }

    @add-mixin desktop-all {
      flex-direction: row;
      gap: 12px;
      margin-top: 24px;
    }
  }

  &__gallery {
    position: relative;
    height: 280px;
    width: 100%;
    overflow: hidden;

    @add-mixin tablet-v {
      height: 520px;
      border-radius: $radius-m;
    }

    @add-mixin desktop-all {
      flex-basis: 812px;
      height: 100%;
      border-radius: $radius-m;
    }
  }

  &__badge {
    position: absolute;
    top: 16px;
    left: 16px;
    z-index: 2;

    @add-mixin desktop-all {
      top: 24px;
      right: 24px;
      left: auto;
    }
  }

  &__image {
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
    cursor: pointer;
    z-index: 1;
  }

  &__substrate {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    filter: blur(100px);
  }

  &__modal {
    padding: 32px;
  }

  &__button {
    flex-grow: 1;
  }
}
</style>
