<template>
  <div class="ds-menu-item">
    <a
      v-if="!item.group || item.group.length === 0"
      class="ds-menu-item__link"
      :class="{ 'ds-menu-item__link_edit': !siteMode.isView }"
      :[attributeHref]="item.url"
      @click="clickToLink"
    >
      {{ item.text }}
    </a>

    <template v-else>
      <button class="ds-menu-item__button" @click="clickToGroup">
        {{ item.text }}
        <DsIcon
          name="chevron-s-down"
          :size="20"
          class="ds-menu-item__icon"
          :class="{ 'ds-menu-item__icon_inverted': isActiveGroup }"
        />
      </button>
      <ul
        v-show="isActiveGroup"
        ref="group"
        class="ds-menu-item__group"
        :class="{ 'ds-menu-item__group_visible': isActiveGroup }"
      >
        <li
          v-for="(itemGroup, index) in item.group"
          :key="getKey(index)"
          class="ds-menu-item__group-item"
        >
          <a
            class="ds-menu-item__link-group"
            :[attributeHref]="itemGroup.url"
            :class="{ 'ds-menu-item__link-group_edit': !siteMode.isView }"
            @click="clickToLink"
          >
            {{ breakPoint.isMobileAll ? itemGroup.text : trimString(itemGroup.text, 32) }}
          </a>
        </li>
      </ul>
    </template>
  </div>
</template>

<script setup>
import { useBreakPoint } from 'site-ui/src/break-point/break-point';
import DsIcon from 'site-ui/src/design-system/ds-icon/ds-icon.vue';
import { trimString } from 'site-ui/src/services/trim-string/trim-string.js';
import { useSiteMode } from 'site-ui/src/site-mode/site-mode';
import { ref, computed } from 'vue';

const siteMode = useSiteMode();
const breakPoint = useBreakPoint();

const property = defineProps({
  item: {
    type: Object,
    required: true,
  },

  id: {
    type: Number,
    required: true,
  },

  isActive: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['clickItem', 'clickGroup']);

const group = ref(null);
const isActiveStateItem = ref(false);

const isActiveGroup = computed(() => {
  return breakPoint.isMobileAll ? isActiveStateItem.value : property.isActive;
});

const attributeHref = computed(() => (siteMode.isView ? 'href' : null));

function getKey(index) {
  return `${index}${Math.random()}`;
}

function clickToLink() {
  emit('clickItem');
}

function clickToGroup() {
  if (breakPoint.isMobileAll) {
    isActiveStateItem.value = !isActiveStateItem.value;
  } else {
    emit('clickGroup', property.id);
  }
}
</script>

<style lang="postcss" scoped>
@import 'site-ui/src/tokens/ui-tokens.css';

.ds-menu-item {
  position: relative;

  &__button {
    display: flex;
    justify-content: space-between;
    gap: 5px;
    width: 100%;
    padding: 12px 0;
    color: var(--font-thertiary);
    background-color: var(--bg-button-primary-inverse-default);
    border: none;
    cursor: pointer;
    font-weight: 500;
    @add-mixin b3;

    &:hover {
      color: var(--font-accent);
    }

    &:active {
      color: var(--font-primary);
    }
  }

  &__link {
    display: block;
    padding: 12px 0;
    color: var(--font-thertiary);
    cursor: pointer;
    font-weight: 500;
    text-decoration: none;
    @add-mixin b3;

    &:hover {
      color: var(--font-accent);
    }

    &:active {
      color: var(--font-primary);
    }

    &_edit {
      cursor: not-allowed;
    }
  }

  &__group {
    padding-left: 16px;

    @add-mixin desktop-all {
      position: absolute;
      top: 48px;
      width: auto;
      max-width: 324px;
      padding: 8px;
      border-radius: $radius-m;
      background-color: var(--bg-dropdown-default);
      box-shadow: $shadow-l;
      white-space: nowrap;
    }

    &_visible {
      animation-duration: 0.3s;
      animation-timing-function: ease-out;
      animation-fill-mode: forwards;
      animation-name: slidein;
    }
  }

  &__group-item {
    list-style-type: none;
  }

  &__link-group {
    display: block;
    padding: 8px 0;
    color: var(--font-thertiary);
    cursor: pointer;
    font-weight: 500;
    text-decoration: none;
    @add-mixin b3;

    @add-mixin desktop-all {
      padding: 14px 16px;
      border-radius: $radius-s;

      &:hover {
        background-color: var(--bg-dropdown-hover);
      }
    }

    &_edit {
      cursor: not-allowed;
    }
  }

  &__icon {
    transition: transform 0.3s ease-in-out;

    &_inverted {
      transform: rotate(0.5turn);
    }
  }
}

@keyframes slidein {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
