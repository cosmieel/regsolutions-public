<template>
  <div class="ds-cart-warning">
    <div class="ds-cart-warning__wrapper" :class="warning.class">
      <DsIcon :name="warning.icon" class="ds-cart-warning__icon" />
      <p class="ds-cart-warning__text">{{ warning.text }}</p>
    </div>

    <div v-if="status === 'not available'" class="ds-cart-warning__button-wrapper">
      <DsButton
        size="s"
        :text="breakPoint.isMobileAll ? '' : localizer.t('cart.remove')"
        :icon="breakPoint.isMobileAll ? 'trash-delete' : ''"
        color="error"
        @click="deleteItems"
      />
    </div>
  </div>
</template>

<script setup>
import { useBreakPoint } from 'site-ui/src/break-point/break-point';
import DsButton from 'site-ui/src/design-system/ds-button/ds-button.vue';
import DsIcon from 'site-ui/src/design-system/ds-icon/ds-icon.vue';
import { localizer } from 'site-ui/src/localizer/localizer';
import { computed } from 'vue';

const property = defineProps({
  status: {
    type: String,
    default: 'changed',
  },
});

const emit = defineEmits(['delete-items']);

const breakPoint = useBreakPoint();

const warning = computed(() => {
  switch (property.status) {
    case 'deleted': {
      return {
        icon: 'cancel',
        text: localizer.t('cart.notAvailable'),
        class: 'ds-cart-warning__wrapper_color_warning',
      };
    }
    case 'not available': {
      return {
        icon: 'warning-filled',
        text: localizer.t('cart.unavailable'),
        class: 'ds-cart-warning__wrapper_color_danger',
      };
    }
    case 'changed': {
      return {
        icon: 'notification',
        text: localizer.t('cart.changed'),
        class: 'ds-cart-warning__wrapper_color_warning',
      };
    }
  }

  return {};
});

function deleteItems() {
  emit('delete-items');
}
</script>

<style lang="postcss" scoped>
@import 'site-ui/src/tokens/ui-tokens.css';

.ds-cart-warning {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  border-radius: $radius-m;
  overflow: hidden;

  &__wrapper {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-grow: 1;
    padding: 12px 16px;
    border-radius: $radius-m;

    &_color {
      &_danger {
        color: var(--font-danger);
        background-color: var(--manila-07);
      }

      &_warning {
        color: var(--font-warning);
        background-color: var(--osaka-07);
      }
    }
  }

  &__icon {
    flex-shrink: 0;
  }

  &__text {
    @add-mixin b3;
  }

  &__button-wrapper {
    border-radius: $radius-m;
    overflow: hidden;
  }
}
</style>
