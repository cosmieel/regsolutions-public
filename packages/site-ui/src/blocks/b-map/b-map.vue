<template>
  <article :id="'block-' + block.id" class="b-map">
    <ds-container :title="block.title" :backed="block.backed">
      <div class="b-map__wrapper">
        <iframe
          :src="'https://yandex.ru/map-widget/v1/?lang=ru&pt=' + coordinates + '&z=14&scroll=false'"
          width="100%"
          height="100%"
          frameborder="0"
          allowfullscreen="true"
          referrerpolicy="no-referrer-when-downgrade"
          loading="lazy"
        >
        </iframe>
        <div v-if="block.address" class="b-map__address">
          <DsIcon class="b-map__address-icon" name="location" :size="18" :inline="true" />
          {{ block.address }}
        </div>
      </div>

      <div
        v-if="block.text || (block.features && block.features.length > 0)"
        class="b-map__description-wrapper"
      >
        <p v-if="block.text" class="b-map__text">{{ block.text }}</p>

        <DsDevider v-if="block.text && block.features && block.features.length > 0" />

        <ds-list v-if="block.features && block.features.length > 0" type="vertical">
          <ds-list-item v-for="(feature, index) in block.features" :key="getKey(index)">
            <div class="b-map__feature">
              <div class="b-map__icon-wrapper">
                <DsIcon
                  :name="feature.icon"
                  :size="24"
                  :inline="true"
                  class="b-map__feature-icon"
                />
              </div>
              <div>
                <strong class="b-map__feature-title">
                  {{ feature.title }}
                </strong>
                <p class="b-map__feature-description">
                  {{ feature.description }}
                </p>
              </div>
            </div>
          </ds-list-item>
        </ds-list>
      </div>
    </ds-container>
  </article>
</template>

<script setup>
import DsContainer from 'site-ui/src/design-system/ds-container/ds-container.vue';
import DsDevider from 'site-ui/src/design-system/ds-devider/ds-devider.vue';
import DsIcon from 'site-ui/src/design-system/ds-icon/ds-icon.vue';
import DsListItem from 'site-ui/src/design-system/ds-list/ds-list-item.vue';
import DsList from 'site-ui/src/design-system/ds-list/ds-list.vue';
import { computed } from 'vue';

const property = defineProps({
  block: {
    type: Object,
    required: true,
  },
});

const coordinates = computed(() => {
  if (property.block.address) {
    const coordinatesMatch = property.block.address.match(/(-?\d+\.\d+),(-?\d+\.\d+)/gi);

    if (coordinatesMatch !== null && coordinatesMatch.length === 1) {
      const coordinatesArray = coordinatesMatch[0].split(',').reverse();

      if (coordinatesArray.length === 2) {
        return coordinatesArray.join(',');
      }
    }
  }

  return property.block.coordinates.toReversed();
});

function getKey(index) {
  return `${index}${Math.random()}`;
}
</script>

<style lang="postcss" scoped>
@import 'site-ui/src/tokens/ui-tokens.css';

.b-map {
  &__wrapper {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 440px;
    border-radius: $radius-m;

    @add-mixin desktop-all {
      align-items: center;
      height: 440px;
    }
  }

  &__address {
    position: absolute;
    top: 8px;
    left: 8px;
    width: auto;
    max-width: calc(100% - 160px);
    padding: 12px 18px 12px 12px;
    color: var(--font-primary);
    background-color: var(--bg-button-primary-inverse-default);
    font-weight: 400;
    border-radius: $radius-s;
    box-shadow: $shadow-m;
    @add-mixin b4;

    @add-mixin desktop-all {
      max-width: 662px;
    }
  }

  &__address-icon {
    margin-top: -6px;
  }

  &__description-wrapper {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-top: 24px;
  }

  &__text {
    color: var(--font-primary);
    font-weight: 400;
    white-space: pre-wrap;
    @add-mixin b4;

    @add-mixin desktop-all {
      @add-mixin b3;
    }
  }

  &__feature {
    display: flex;
    gap: 24px;
  }

  &__icon-wrapper {
    position: relative;
    flex-shrink: 0;
    width: 56px;
    height: 56px;
    border: 1px solid var(--border-divider);
    border-radius: $radius-m;
  }

  &__feature-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    color: var(--font-thertiary);
    transform: translate(-50%, -50%);
  }

  &__feature-title {
    display: block;
    margin-top: 4px;
    margin-bottom: 6px;
    color: var(--font-prymary);
    @add-mixin h6;
  }

  &__feature-description {
    color: var(--font-secondary);
    font-weight: 400;
    @add-mixin b3;
  }
}
</style>
