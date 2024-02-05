<template>
  <article :id="index" class="ds-info-card-modal" :class="infoCardClass">
    <DsImage
      v-if="image"
      :path="image"
      :size="config.resize.infoCardModal[theme]"
      class="ds-info-card-modal__image"
      loading="lazy"
      :alt="title"
    />
    <div class="ds-info-card-modal__wrapper">
      <strong class="ds-info-card-modal__title">{{ title }}</strong>
      <p
        class="ds-info-card-modal__description"
        :class="{ 'ds-info-card-modal__description_last': !button }"
      >
        {{ description }}
      </p>
      <DsButton
        v-if="button && button.text"
        :theme="button.theme"
        color="secondary"
        size="s"
        :stretch="true"
        :text="button.text"
        :icon="button.icon"
        :url="button.url"
      />
    </div>
  </article>
</template>

<script setup>
import config from 'site-ui/src/configs/configs.js';
import DsButton from 'site-ui/src/design-system/ds-button/ds-button.vue';
import DsImage from 'site-ui/src/design-system/ds-image/ds-image.vue';
import { computed } from 'vue';

const property = defineProps({
  theme: {
    type: String,
    default: 'compact',
  },

  title: {
    type: String,
    default: '',
  },

  description: {
    type: String,
    default: '',
  },

  button: {
    type: Object,

    default() {
      return;
    },
  },

  image: {
    type: String,
    default: '',
  },

  index: {
    type: String,
    required: true,
  },
});

const infoCardClass = computed(() => {
  return `ds-info-card-modal_theme_${property.theme}`;
});
</script>

<style lang="postcss" scoped>
@import 'site-ui/src/tokens/ui-tokens.css';

.ds-info-card-modal {
  display: flex;
  padding-top: 24px;

  &_theme {
    &_compact {
      flex-direction: column;
      align-items: center;
      gap: 24px;

      @add-mixin desktop-all {
        flex-direction: row;
        align-items: flex-start;
      }

      & .ds-info-card-modal__wrapper {
        flex-direction: column;
        text-align: center;

        @add-mixin desktop-all {
          text-align: left;
        }
      }

      & .ds-info-card-modal__image {
        flex-shrink: 0;
        width: 100px;
        height: 100px;
        border-radius: $radius-s;
        object-fit: cover;
        object-position: center;
      }
    }

    &_half {
      flex-direction: column;
      & .ds-info-card-modal__image {
        width: 100%;
        height: 338px;
        margin-bottom: 16px;
        border-radius: $radius-s;
        object-fit: cover;
        object-position: center;
      }
    }
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
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
    color: var(--font-thertiary);
    font-weight: 400;
    white-space: pre-wrap;
    @add-mixin b4;

    &_last {
      margin-bottom: 0;
    }
  }
}
</style>
