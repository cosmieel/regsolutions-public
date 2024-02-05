<template>
  <article :id="'block-' + block.id" class="b-features" :class="`b-features_theme_${block.theme}`">
    <ds-container :title="block.title" :backed="block.backed">
      <div class="b-features__wrapper" :class="classWrapper">
        <div v-for="feature in block.features" :key="feature.text" class="b-features__item">
          <strong class="b-features__title">{{ feature.title }}</strong>
          <p class="b-features__text">{{ feature.text }}</p>
        </div>
      </div>
    </ds-container>
  </article>
</template>

<script setup>
import DsContainer from 'site-ui/src/design-system/ds-container/ds-container.vue';
import { computed } from 'vue';

const property = defineProps({
  block: {
    type: Object,
    required: true,
  },
});

const classWrapper = computed(() => {
  return `b-features__wrapper_col-${property.block.features.length}`;
});
</script>

<style lang="postcss" scoped>
@import 'site-ui/src/tokens/ui-tokens.css';

.b-features {
  &_theme {
    &_simple {
      & .b-features__wrapper {
        display: grid;
        gap: 24px;

        @add-mixin desktop-all {
          grid-template-columns: repeat(4, 1fr);
        }

        &_col-1 {
          @add-mixin desktop-all {
            grid-template-columns: repeat(1, 1fr);
          }
        }

        &_col-2 {
          @add-mixin desktop-all {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        &_col-3 {
          @add-mixin desktop-all {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      }

      & .b-features__item {
        color: var(--font-primary);

        @add-mixin desktop-all {
          text-align: center;
        }
      }

      & .b-features__title {
        display: block;
        margin-bottom: 8px;
        @add-mixin h5;
      }

      & .b-features__text {
        font-weight: 400;
        color: var(--font-secondary);
        white-space: pre-wrap;
        @add-mixin b3;
      }
    }

    &_signed {
      & .b-features__wrapper {
        display: grid;
        gap: 24px;

        @add-mixin desktop-all {
          grid-template-columns: repeat(3, 1fr);

          &_col-1 {
            grid-template-columns: repeat(1, 1fr);
          }

          &_col-2 {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      }

      & .b-features__item {
        display: flex;
        flex-direction: row;
        align-items: center;

        @add-mixin desktop-all {
          flex-direction: column;
          text-align: center;
        }
      }

      & .b-features__title {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        overflow: hidden;
        width: 72px;
        height: 72px;
        margin: 0 12px 0 0;
        border-radius: 50%;
        background-color: var(--bg-button-primary-default);
        color: var(--font-dynamic);
        font-weight: 500;
        @add-mixin b2;

        @add-mixin desktop-all {
          width: 92px;
          height: 92px;
          margin: 0 0 20px 0;
          @add-mixin b1;
        }
      }

      & .b-features__text {
        color: var(--font-primary);
        font-weight: 400;
        white-space: pre-wrap;
        @add-mixin b2;
      }
    }
  }
}
</style>
