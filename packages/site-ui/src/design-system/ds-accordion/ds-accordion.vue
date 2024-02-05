<template>
  <div class="ds-accordion" :class="{ 'ds-accordion_clear': clear }" @click="show = !show">
    <strong class="ds-accordion__title">{{ title }}</strong>
    <DsButton
      theme="fab"
      size="s"
      color="transperent"
      icon="chevron-m-down"
      class="ds-accordion__button"
      :class="buttonClass"
    />
    <Transition>
      <div v-if="show" class="ds-accordion__content">
        <p class="ds-accordion__text">{{ text }}</p>
        <slot />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import DsButton from 'site-ui/src/design-system/ds-button/ds-button.vue';
import { computed, ref } from 'vue';

const property = defineProps({
  title: {
    type: String,
    default: '',
  },

  text: {
    type: String,
    default: '',
  },

  clear: {
    type: Boolean,
    default: false,
  },
});

const show = ref(false);

const buttonClass = computed(() => {
  let buttonClass = property.clear ? 'ds-accordion__button_clear' : '';

  return show.value ? `${buttonClass} ds-accordion__button_inverted` : buttonClass;
});
</script>

<style lang="postcss" scoped>
@import 'site-ui/src/tokens/ui-tokens.css';

.ds-accordion {
  position: relative;
  padding-top: 18px;
  border-top: 1px solid var(--border-divider);
  cursor: pointer;

  @add-mixin desktop-all {
    padding-top: 24px;
  }

  &_clear {
    padding-top: 0;
    border: none;
  }

  &__title {
    display: block;
    padding-right: 40px;
    font-weight: 400;
    color: var(--font-primary);
    white-space: pre-wrap;
    @add-mixin b3;

    @add-mixin desktop-all {
      @add-mixin b2;
    }
  }

  &__text {
    padding-top: 10px;
    padding-right: 40px;
    font-weight: 300;
    color: var(--font-thertiary);
    white-space: pre-wrap;
    @add-mixin b4;

    @add-mixin desktop-all {
      padding-top: 14px;
      @add-mixin b3;
    }
  }

  &__button {
    position: absolute;
    top: 18px;
    right: 0;
    transition: transform 0.3s ease-in-out;

    @add-mixin desktop-all {
      top: 24px;
    }

    &_clear {
      top: 0;
    }

    &_inverted {
      transform: rotate(0.5turn);
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease-in;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
