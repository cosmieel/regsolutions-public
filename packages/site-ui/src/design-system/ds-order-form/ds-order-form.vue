<template>
  <article class="ds-order-form">
    <DsButton
      v-if="previousTick"
      theme="fab"
      size="s"
      icon="chevron-m-left"
      class="ds-order-form__button-previous"
      @click="emit('showPrevious')"
    />
    <ds-form
      :fields="checkout.fields"
      :button="formButton"
      :title="localizer.t('order.registration')"
      :privacy-text="privacyText"
      class="b-form__form"
      @submit="submitForm"
    >
      <div class="ds-order-form__footer">
        <div v-if="price" class="ds-order-form__footer-wrapper">
          <p class="ds-order-form__price-text">{{ localizer.t('order.total') }}</p>
          <div class="ds-order-form__price-wrapper">
            <span v-if="oldPrice !== price" class="ds-order-form__old-price">{{ oldPrice }} ₽</span>
            <strong class="ds-order-form__price">{{ price }} ₽</strong>
          </div>
        </div>
      </div>
    </ds-form>
  </article>
</template>

<script setup>
import DsButton from 'site-ui/src/design-system/ds-button/ds-button.vue';
import DsForm from 'site-ui/src/design-system/ds-form/ds-form.vue';
import { localizer } from 'site-ui/src/localizer/localizer';
import { computed } from 'vue';

const emit = defineEmits(['showPrevious', 'sendForm']);

const property = defineProps({
  checkout: {
    type: Object,
    required: true,
  },

  price: {
    type: String,
    default: '',
  },

  oldPrice: {
    type: String,
    default: '',
  },

  privacyText: {
    type: String,
    default: '',
  },

  previousTick: {
    type: Boolean,
    default: false,
  },
});

const formButton = computed(() => {
  return property.checkout.button?.text
    ? { text: property.checkout.button.text }
    : {
        text: localizer.t('order.confirmation'),
      };
});

function submitForm(formData) {
  emit('sendForm', formData);
}
</script>

<style lang="postcss" scoped>
@import 'site-ui/src/tokens/ui-tokens.css';

.ds-order-form {
  padding: 16px;

  @add-mixin desktop-all {
    padding: 24px;
  }

  &__button-previous {
    position: absolute;
    top: 8px;
    z-index: $z-1;

    @add-mixin desktop-all {
      top: 22px;
    }
  }

  &__footer {
    bottom: 0;
    padding-top: 16px;
    margin-top: 8px;
    border-top: 1px solid var(--border-divider);
    background-color: var(--bg-layout-section);

    @add-mixin desktop-all {
      padding-top: 24px;
      margin-top: 12px;
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
