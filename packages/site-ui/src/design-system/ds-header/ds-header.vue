<template>
  <header ref="header" class="ds-header" :class="headerClass" :[dataEdit]="'block'">
    <div class="ds-header__wrapper">
      <div class="ds-header__content">
        <div class="ds-header__group ds-header__group_type_left">
          <DsLogo v-if="options.logo" :url="options.logo" :alt="meta.description" />
          <DsMenu
            v-if="!breakPoint.isMobileAll"
            :items="headerParameters.menuItems"
            :show-menu="true"
            @click-item="clickItem"
          />
        </div>

        <div class="ds-header__group ds-header__group_type_right">
          <DsCart
            v-if="options.cart && siteMode.isView"
            :cart="options.cart"
            :catalog-items="catalogItems"
            :catalogs="catalogs"
            :action="options.action"
            :checkout="options.checkout"
          />

          <DsBurgerButton
            v-if="breakPoint.state === 'mobile'"
            :is-active="showMenu"
            @click="clickBurger"
          />

          <div
            v-if="breakPoint.state !== 'mobile' && headerParameters.buttons"
            class="ds-header__buttons"
          >
            <DsButton
              v-for="(button, index) in headerParameters.buttons"
              :key="button.name"
              :text="button.text"
              size="m"
              :color="getButtonColor(headerParameters.buttons.length, index)"
              :url="button.url"
            />
          </div>

          <DsBurgerButton
            v-if="breakPoint.state === 'tablet-v'"
            :is-active="showMenu"
            @click="clickBurger"
          />
        </div>
      </div>
    </div>
    <DsMenu
      v-if="breakPoint.isMobileAll"
      :items="headerParameters.menuItems"
      :show-menu="showMenu"
      :header-buttons="headerParameters.buttons.length"
      @click-item="clickItem"
    />

    <template v-if="breakPoint.state === 'mobile' && headerParameters.buttons">
      <div v-show="showMenu" class="ds-header__buttons">
        <DsButton
          v-for="(button, index) in headerParameters.buttons"
          :key="button.name"
          :text="button.text"
          size="m"
          :color="getButtonColor(headerParameters.buttons.length, index)"
          :url="button.url"
        />
      </div>
    </template>
  </header>
</template>

<script setup>
import { useBreakPoint } from 'site-ui/src/break-point/break-point';
import DsBurgerButton from 'site-ui/src/design-system/ds-burger-button/ds-burger-button.vue';
import DsButton from 'site-ui/src/design-system/ds-button/ds-button.vue';
import DsCart from 'site-ui/src/design-system/ds-cart/ds-cart.vue';
import DsLogo from 'site-ui/src/design-system/ds-logo/ds-logo.vue';
import DsMenu from 'site-ui/src/design-system/ds-menu/ds-menu.vue';
import { lockBody } from 'site-ui/src/services/lock-body/lock-body.js';
import { unlockBody } from 'site-ui/src/services/unlock-body/unlock-body.js';
import { useSiteMode } from 'site-ui/src/site-mode/site-mode';
import { ref, computed, onMounted, onUnmounted } from 'vue';

const property = defineProps({
  meta: {
    type: Object,
    required: true,
  },

  options: {
    type: Object,
    required: true,
  },

  catalogItems: {
    type: Array,
    default: () => [],
  },

  catalogs: {
    type: Array,
    default: () => [],
  },
});

const breakPoint = useBreakPoint();
const siteMode = useSiteMode();
const dataEdit = computed(() => (siteMode.isEdit ? 'data-edit' : null));

let isMobile = null;

const header = ref(null);
const showMenu = ref(false);

onMounted(() => {
  isMobile = breakPoint.isMobileAll;
  breakPoint.onResize(changeVisibility);
});

onUnmounted(() => {
  breakPoint.destroy(changeVisibility);
});

const headerParameters = computed(() => {
  return property.options.layout.header;
});

const headerClass = computed(() => {
  const headerClass = siteMode.isView ? '' : 'ds-header_edit';

  return showMenu.value ? `${headerClass} ds-header_fixed` : headerClass;
});

function changeVisibility() {
  if (isMobile === breakPoint.isMobileAll) {
    return;
  }

  showMenu.value = false;
  unlockBody('ds-header');
  isMobile = breakPoint.isMobileAll;
}

function clickBurger() {
  if (showMenu.value === false) {
    shiftPosition();
  }

  showMenu.value = !showMenu.value;
  showMenu.value ? lockBody('ds-header') : unlockBody('ds-header');
}

function shiftPosition() {
  const offset = header.value.getBoundingClientRect().y;

  if (offset === 0) {
    return;
  }

  window.scrollBy(0, offset);
}

function getButtonColor(length, index) {
  if (breakPoint.state === 'mobile') {
    return length === 2 && index === 0 ? 'secondary' : 'primary';
  }

  return length === 2 && index === 0 ? 'primary-inverse' : 'primary';
}

function clickItem() {
  showMenu.value = false;
  unlockBody('ds-header');
}
</script>

<style lang="postcss" scoped>
@import 'site-ui/src/tokens/ui-tokens.css';

.ds-header {
  position: sticky;
  top: 0;
  background-color: var(--bg-layout-section);
  z-index: $z-header;

  &_edit {
    position: relative;
    border-radius: 8px 8px 0 0;
  }

  &_fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  &__wrapper {
    position: relative;
    width: 100%;
    height: 72px;
    padding: 0 16px;
    margin: auto;
    box-shadow: $shadow-s;
    z-index: 1;

    @add-mixin tablet-v {
      padding: 0 24px;
    }

    @add-mixin desktop-all {
      padding: 0 24px;
    }
  }

  &__content {
    display: flex;
    justify-content: space-between;
    height: 72px;
    max-width: 1280px;
    margin: auto;
  }

  &__group {
    display: flex;
    align-items: center;

    &_type {
      &_left {
        justify-content: start;
        gap: 40px;
      }

      &_right {
        justify-content: end;
        gap: 12px;
      }
    }
  }

  &__buttons {
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: calc(100% - 32px);
    margin: 0 16px 16px;

    @add-mixin tablet-v {
      position: static;
      flex-direction: row;
      width: auto;
      margin: 0;
    }

    @add-mixin desktop-all {
      position: static;
      flex-direction: row;
      width: auto;
      margin: 0;
    }
  }

  &__button {
    padding: 14px 20px;
    color: var(--font-dynamic);
    background-color: var(--bg-button-primary-default);
    border-radius: $radius-s;
    text-decoration: none;
    @add-mixin b3;

    &:hover {
      background-color: var(--bg-button-primary-hover);
    }

    &:active {
      background-color: var(--bg-button-primary-active);
    }
  }
}
</style>
