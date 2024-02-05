<template>
  <component
    :is="tag"
    class="ds-button"
    :class="buttonClass"
    :[attributeDisabled]="disabled"
    :[attributeHref]="url"
    @click="handleClick"
  >
    <DsIcon
      v-if="icon"
      :name="icon"
      class="ds-button__icon"
      :class="{ 'ds-button__icon_alone': !text }"
    />
    <span v-if="theme !== 'fab' && text">{{ trimString(text, 18, '') }}</span>
  </component>
</template>

<script setup>
import DsIcon from 'site-ui/src/design-system/ds-icon/ds-icon.vue';
import { trimString } from 'site-ui/src/services/trim-string/trim-string.js';
import { useSiteMode } from 'site-ui/src/site-mode/site-mode';
import { computed } from 'vue';

const siteMode = useSiteMode();

const property = defineProps({
  theme: {
    type: String,
    default: 'solid',
  },

  color: {
    type: String,
    default: 'primary',
  },

  size: {
    type: String,
    default: 'm',
  },

  disabled: {
    type: Boolean,
    default: false,
  },

  stretch: {
    type: Boolean,
    default: false,
  },

  text: {
    type: String,
    default: '',
  },

  icon: {
    type: String,
    default: '',
  },

  url: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['click']);

const buttonClass = computed(() => {
  let buttonClass = `ds-button_theme_${property.theme} ds-button_color_${property.color} ds-button_size_${property.size}`;
  buttonClass = property.stretch ? `${buttonClass} ds-button_stretch` : buttonClass;
  buttonClass = property.text.length === 0 ? `${buttonClass} ds-button_no-text` : buttonClass;
  buttonClass =
    property.url && !siteMode.isView ? `${buttonClass} ds-button_edit-mode` : buttonClass;
  return buttonClass;
});

const tag = computed(() => (property.url ? 'a' : 'button'));
const attributeHref = computed(() => (property.url && siteMode.isView ? 'href' : null));
const attributeDisabled = computed(() => (property.disabled && !property.url ? 'disabled' : null));

function handleClick(event) {
  emit('click', event);
}
</script>

<style lang="postcss" scoped>
@import 'site-ui/src/tokens/ui-tokens.css';

.ds-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-family: inherit;
  white-space: nowrap;
  border: none;
  border-radius: $radius-s;
  outline: none;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;

  &_theme {
    &_solid {
      &.ds-button_color {
        &_primary {
          color: var(--font-dynamic);
          background-color: var(--bg-button-primary-default);

          &:hover {
            background-color: var(--bg-button-primary-hover);
          }

          &:active {
            background-color: var(--bg-button-primary-active);
          }

          &:disabled {
            color: var(--font-disable);
            background-color: var(--bg-button-disable);
          }
        }

        &_secondary {
          color: var(--font-primary);
          background-color: var(--bg-button-secondary-default);

          &:hover {
            background-color: var(--bg-button-secondary-hover);
          }

          &:active {
            background-color: var(--bg-button-secondary-active);
          }

          &:disabled {
            color: var(--font-disable);
            background-color: var(--bg-button-disable);
          }
        }

        &_primary-inverse {
          color: var(--font-primary);
          background-color: var(--bg-button-primary-inverse-default);

          &:hover {
            background-color: var(--bg-button-primary-inverse-hover);
          }

          &:active {
            background-color: var(--bg-button-primary-inverse-active);
          }

          &:disabled {
            color: var(--font-disable);
            background-color: var(--bg-button-disable);
          }
        }

        &_secondary-inverse {
          color: var(--font-primary-inverse);
          background-color: var(--bg-button-secondary-inverse-default);
          backdrop-filter: $blur-m;

          &:hover {
            background-color: var(--bg-button-secondary-inverse-hover);
          }

          &:active {
            background-color: var(--bg-button-secondary-inverse-active);
          }

          &:disabled {
            color: var(--font-disable);
            background-color: var(--bg-button-disable);
          }
        }

        &_error {
          color: var(--font-danger);
          background-color: var(--bg-button-secondary-default);

          &:disabled {
            color: var(--font-disable);
            background-color: var(--bg-button-disable);
          }
        }
      }

      &.ds-button_size {
        &_s {
          padding: 13px 14px;
          @add-mixin b4;

          @add-mixin desktop-all {
            padding: 12px 15px;
            @add-mixin b3;
          }

          &.ds-button_no-text {
            @add-mixin desktop-all {
              padding: 11px 12px;
            }
          }

          & .ds-button__icon {
            width: 20px;
            height: 20px;
          }
        }

        &_m {
          padding: 15px 20px;
          @add-mixin b3;

          @add-mixin desktop-all {
            padding: 16px 20px;
            @add-mixin h6;
          }

          &.ds-button_no-text {
            padding: 15px 18px;

            @add-mixin desktop-all {
              padding: 14px 18px;
            }
          }
        }
      }

      &.ds-button_stretch {
        display: flex;
        width: 100%;
      }

      & .ds-button__icon {
        width: 24px;
        height: 24px;
        margin-right: 6px;

        &_alone {
          margin: 0;
        }
      }
    }

    &_fab {
      color: var(--font-thertiary);
      background: none;

      &.ds-button_color {
        &_primary {
          &:hover {
            background-color: var(--bg-button-secondary-hover);
          }

          &:active {
            background-color: var(--bg-button-secondary-active);
          }

          &:disabled {
            color: var(--font-disable);
            background: none;
          }
        }

        &_primary-inverse {
          color: var(--font-primary-inverse);

          &:hover {
            background: var(--bg-control-overlay-hover, rgba(0, 0, 0, 0.3));
          }

          &:active {
            background: none;
          }

          &:disabled {
            color: var(--font-disable);
            background: none;
          }
        }

        &_transperent {
          &:disabled {
            color: var(--font-disable);
          }
        }

        &_transperent-inverse {
          color: var(--font-primary-inverse);

          &:disabled {
            color: var(--font-disable);
          }
        }
      }

      &.ds-button_size {
        &_xs {
          padding: 6px;

          & .ds-button__icon {
            width: 20px;
            height: 20px;
          }
        }

        &_s {
          padding: 10px;

          & .ds-button__icon {
            width: 20px;
            height: 20px;
          }
        }

        &_m {
          padding: 12px;

          & .ds-button__icon {
            width: 24px;
            height: 24px;
          }
        }

        &_l {
          padding: 14px;

          & .ds-button__icon {
            width: 24px;
            height: 24px;
          }
        }
      }
    }

    &_ghost {
      padding: 0;
      background: none;
      color: var(--font-primary);
      text-decoration-line: underline;
      @add-mixin b4;

      @add-mixin desktop-all {
        text-decoration-line: none;
        @add-mixin b3;
      }

      &:hover,
      &:active {
        @add-mixin desktop-all {
          text-decoration-line: underline;
        }
      }

      & .ds-button__icon {
        width: 16px;
        height: 16px;
        margin-right: 6px;

        @add-mixin desktop-all {
          width: 20px;
          height: 20px;
        }

        &_alone {
          margin: 0;
        }
      }
    }
  }

  &_edit-mode {
    cursor: not-allowed;
  }
}
</style>
