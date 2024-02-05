<template>
  <nav
    v-show="isVisible"
    ref="navigation"
    class="ds-menu"
    :class="menuClass"
    aria-label="Main menu"
  >
    <ul class="ds-menu__list">
      <li v-for="(item, index) in items" :key="item.text" class="ds-menu__list-item">
        <DsMenuItem
          :id="index + 1"
          :item="item"
          :is-active="isActiveGroup(index + 1)"
          @click-item="clickItem"
          @click-group="clickGroup"
        />
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { useBreakPoint } from 'site-ui/src/break-point/break-point';
import { ref, computed, onMounted, onUnmounted } from 'vue';
import DsMenuItem from './ds-menu-item.vue';

const breakPoint = useBreakPoint();

const property = defineProps({
  items: {
    type: Array,
    required: true,
  },

  showMenu: {
    type: Boolean,
    default: false,
  },

  headerButtons: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(['clickItem']);

const navigation = ref(null);
const activeItemId = ref(null);

const isVisible = computed(() => {
  return property.showMenu ? true : false;
});

const menuClass = computed(() => {
  if (!property.headerButtons) {
    return;
  }

  return `ds-menu_mod_${property.headerButtons}`;
});

function clickItem() {
  activeItemId.value = null;
  emit('clickItem');
}

function clickGroup(id) {
  activeItemId.value = activeItemId.value === id ? null : id;
}

function isActiveGroup(id) {
  return id === activeItemId.value;
}

function hideGroup(event) {
  const withinBoundaries = event.composedPath().includes(navigation.value);

  if (!withinBoundaries && activeItemId.value) {
    activeItemId.value = null;
  }
}

onMounted(() => {
  if (!breakPoint.isMobileAll) {
    document.addEventListener('click', hideGroup);
  }
});

onUnmounted(() => {
  if (breakPoint.isMobileAll) {
    document.removeEventListener('click', hideGroup);
  }
});
</script>

<style lang="postcss" scoped>
@import 'site-ui/src/tokens/ui-tokens.css';

.ds-menu {
  overflow: auto;
  height: calc(100% - 64px);
  padding: 24px 32px;

  @add-mixin desktop-all {
    overflow: visible;
    height: auto;
    padding: 0;
  }

  &_mod {
    &_1 {
      height: calc(100% - 64px - 72px);

      @add-mixin tablet-v {
        height: calc(100% - 64px);
      }
    }

    &_2 {
      height: calc(100% - 64px - 124px);

      @add-mixin tablet-v {
        height: calc(100% - 64px);
      }
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;

    @add-mixin desktop-all {
      flex-direction: row;
      align-items: center;
      gap: 32px;
    }
  }

  &__list-item {
    list-style-type: none;
  }
}
</style>
