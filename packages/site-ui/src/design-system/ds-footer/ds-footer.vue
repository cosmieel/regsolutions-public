<template>
  <footer class="ds-footer" :[dataEdit]="'block'">
    <div class="ds-footer__block">
      <div class="ds-footer__wrapper">
        <DsLogo v-if="options.logo" :url="options.logo" :alt="meta.description" />
        <div class="ds-footer__meta">
          <p>
            {{ meta.siteTitle }}<template v-if="meta.siteTitle">. </template>
            {{ localizer.t('footer.rights') }}
            {{ year }}
          </p>
        </div>
      </div>
      <nav class="ds-footer__navigation" aria-label="Footer">
        <ul class="ds-footer__navigation-list">
          <li v-for="item in footer.items" :key="item.text" class="ds-footer__navigation-list-item">
            <DsButton theme="ghost" :text="item.text" :url="item.url" class="ds-footer__button" />
          </li>
        </ul>
      </nav>
    </div>
  </footer>
</template>

<script setup>
import DsButton from 'site-ui/src/design-system/ds-button/ds-button.vue';
import DsLogo from 'site-ui/src/design-system/ds-logo/ds-logo.vue';
import { localizer } from 'site-ui/src/localizer/localizer';
import { useSiteMode } from 'site-ui/src/site-mode/site-mode';
import { computed } from 'vue';

defineProps({
  meta: {
    type: Object,
    required: true,
  },

  options: {
    type: Object,
    required: true,
  },

  footer: {
    type: Object,
    required: true,
  },
});

const siteMode = useSiteMode();
const dataEdit = computed(() => (siteMode.isEdit ? 'data-edit' : null));

const year = computed(() => new Date().getFullYear());
</script>

<style lang="postcss" scoped>
@import 'site-ui/src/tokens/ui-tokens.css';

.ds-footer {
  width: 100%;
  padding: 32px 16px;

  @add-mixin tablet-v {
    padding: 40px 24px;
  }

  @add-mixin desktop-all {
    padding: 52px calc((100% - 936px) / 2);
  }

  &__block {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    width: 100%;
    background-color: var(--bg-layout-section);
  }

  &__wrapper {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
  }

  &__meta {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 32px;
    color: var(--font-secondary);
    text-align: center;
    @add-mixin b4;

    @add-mixin tablet-v {
      @add-mixin b3;
    }

    @add-mixin desktop-all {
      margin-top: 40px;
      @add-mixin b3;
    }
  }

  &__navigation-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
    padding: 0;
    margin: 0;

    @add-mixin tablet-v {
      flex-direction: row;
      gap: 32px;
    }

    @add-mixin desktop-all {
      flex-direction: row;
      gap: 32px;
    }
  }

  &__navigation-list-item {
    display: flex;
    height: 48px;
    list-style-type: none;
  }

  &__button {
    color: var(--font-secondary);
    @add-mixin b3;
  }
}
</style>
