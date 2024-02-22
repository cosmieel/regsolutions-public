<template>
  <div v-if="icon || text" class="ds-badge" :class="[badgeClass, { 'ds-badge_icon-only': !text }]">
    <DsIcon v-if="icon" :name="icon" class="ds-badge__icon" />
    <span v-if="text" class="ds-badge__text">{{ text }}</span>
  </div>
</template>

<script setup>
import DsIcon from 'site-ui/src/design-system/ds-icon/ds-icon.vue';
import { computed } from 'vue';

const property = defineProps({
  color: {
    type: String,
    default: 'dark',
  },

  size: {
    type: String,
    default: 's',
  },

  text: {
    type: String,
    default: '',
  },

  icon: {
    type: String,
    default: '',
  },
});

const badgeClass = computed(() => {
  return `ds-badge_color_${property.color} ds-badge_size_${property.size}`;
});
</script>

<style lang="postcss" scoped>
@import 'site-ui/src/tokens/ui-tokens.css';

.ds-badge {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  border-radius: $radius-s;
  @add-mixin b4;

  &_size {
    &_s {
      padding: 4px 6px 4px 4px;

      @add-mixin desktop-all {
        padding: 3px 6px 3px 4px;
      }

      &.ds-badge_icon-only {
        padding: 5px;
      }
    }

    &_m {
      padding: 4px 6px 4px 4px;

      @add-mixin desktop-all {
        padding: 7px 10px 7px 8px;
      }

      &.ds-badge_icon-only {
        padding: 5px;

        @add-mixin desktop-all {
          padding: 8px;
        }
      }

      & .ds-badge__icon {
        @add-mixin desktop-all {
          width: 16px;
          height: 16px;
        }
      }
    }
  }

  &_color {
    &_dark {
      color: var(--font-primary-inverse);
      background-color: var(--bg-badge-overlay-dark);
      backdrop-filter: $blur-m;
    }

    &_light {
      color: var(--font-primary-inverse);
      background-color: var(--bg-badge-overlay-light);
      backdrop-filter: $blur-m;
    }

    &_green {
      color: var(--font-primary-inverse);
      background-color: var(--bg-badge-green);
    }

    &_green-soft {
      color: var(--font-success);
      background-color: var(--bg-badge-green-soft);
    }

    &_orange {
      color: var(--font-primary-inverse);
      background-color: var(--bg-badge-orange);
    }

    &_orange-soft {
      color: var(--font-warning);
      background-color: var(--bg-badge-orange-soft);
    }

    &_red {
      color: var(--font-primary-inverse);
      background-color: var(--bg-badge-red);
    }

    &_red-soft {
      color: var(--font-danger);
      background-color: var(--bg-badge-red-soft);
    }
  }

  &__text {
    font-weight: 500;
    @add-mixin b5;

    @add-mixin desktop-all {
      @add-mixin b4;
    }
  }

  &__icon {
    width: 16px;
    height: 16px;
  }
}
</style>
