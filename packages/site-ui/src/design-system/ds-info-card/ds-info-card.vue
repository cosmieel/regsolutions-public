<template>
  <article class="ds-info-card" :class="infoCardClass" :style="infoCardStyle" @click="click(index)">
    <DsImage
      v-if="image && theme !== 'full'"
      :path="image"
      class="ds-info-card__image"
      loading="lazy"
      :size="resizerSize"
      :alt="title"
    />
    <div class="ds-info-card__wrapper">
      <strong class="ds-info-card__title">{{ title }}</strong>
      <p
        v-if="description"
        class="ds-info-card__description"
        :class="{ 'ds-info-card__description_last': !button || !button.text }"
      >
        {{ description }}
      </p>
      <DsButton
        v-if="button && button.text"
        :theme="button.theme"
        :color="button.color"
        size="s"
        :stretch="true"
        :text="button.text"
        :icon="button.icon"
        :url="button.url"
        class="ds-info-card__button"
        @click.stop=""
      />
    </div>
  </article>
</template>

<script setup>
import DsButton from 'site-ui/src/design-system/ds-button/ds-button.vue';
import DsImage from 'site-ui/src/design-system/ds-image/ds-image.vue';
import { OPTIONS_KEY } from 'site-ui/src/services/constants/constants.js';
import { getConstructedUrl } from 'site-ui/src/services/get-constructed-url/get-constructed-url.js';
import { computed, inject } from 'vue';

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
    type: Number,
    required: true,
  },

  resizerSize: {
    type: String,
    required: false,
    default: '',
  },
});

const { hosts } = inject(OPTIONS_KEY);
const constructedUrlFull = getConstructedUrl(property.image, hosts, property.resizerSize);

const emit = defineEmits(['click']);

const infoCardClass = computed(() => {
  return `ds-info-card_theme_${property.theme}`;
});

const infoCardStyle = computed(() => {
  return property.theme === 'full'
    ? `background: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), center/cover url('${constructedUrlFull}');`
    : '';
});

function click(index) {
  emit('click', index);
}
</script>

<style lang="postcss" scoped>
@import 'site-ui/src/tokens/ui-tokens.css';

.ds-info-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  border-radius: $radius-m;
  cursor: pointer;

  &_theme {
    &_compact {
      padding: 24px;
      box-shadow: $shadow-m;

      & .ds-info-card__image {
        flex-shrink: 0;
        width: 100px;
        height: 100px;
        margin-bottom: 16px;
        border-radius: $radius-s;
        object-fit: cover;
        object-position: center;
      }

      & .ds-info-card__button {
        margin-top: auto;
      }
    }

    &_half {
      box-shadow: $shadow-m;

      & .ds-info-card__wrapper {
        align-items: flex-start;
        padding: 16px 24px 24px;
        text-align: left;
      }
      & .ds-info-card__image {
        flex-shrink: 0;
        width: 100%;
        height: 224px;
        border: 6px solid var(--basic-10);
        border-radius: $radius-m;
        object-fit: cover;
        object-position: center;
      }

      & .ds-info-card__button {
        margin-top: auto;
      }
    }

    &_full {
      & .ds-info-card__wrapper {
        justify-content: end;
        align-items: flex-start;
        padding: 224px 24px 24px;
        text-align: left;
      }
      & .ds-info-card__title {
        color: var(--font-primary-inverse);
      }

      & .ds-info-card__description {
        color: var(--font-secondary-inverse);
      }
    }
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    text-align: center;
  }

  &__title {
    margin-bottom: 8px;
    color: var(--font-primary);
    font-weight: 500;
    @add-mixin h5;

    @add-mixin tablet-v {
      @add-mixin h5;
    }

    @add-mixin desktop-all {
      @add-mixin h4;
    }
  }

  &__description {
    margin-bottom: 16px;
    color: var(--font-thertiary);
    font-weight: 400;
    white-space: pre-wrap;
    @add-mixin b4;

    @add-mixin tablet-v {
      @add-mixin b4;
    }

    @add-mixin desktop-all {
      @add-mixin b3;
    }

    &_last {
      margin-bottom: 0;
    }
  }
}
</style>
