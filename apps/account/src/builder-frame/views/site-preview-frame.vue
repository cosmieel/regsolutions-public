<template>
  <div class="site-preview-frame">
    <header class="site-preview-frame__header">
      <FrameNavigation
        is-preview
        :site-id="route.params.siteId"
        :page-id="Number(route.params.pageId) || Number(mainPageId)"
      />
    </header>

    <section class="site-preview-frame__body">
      <SiteBuilder v-if="pageState?.content" :data="pageState" :indent-top="62" mode="preview" />
    </section>
  </div>
</template>

<script setup>
import { useEscapeKey } from 'account-ui';
import { storeToRefs } from 'pinia';
import { SiteBuilder } from 'site-builder';
import { useRoute, useRouter } from 'vue-router';
import { useResetBuilderStore } from '../composables/use-reset-builder-frame-store.js';
import FrameNavigation from '../frame-navigation.vue';
import { useBuilderFrameStore } from '../store/builder-frame-store.js';

const route = useRoute();
const router = useRouter();

useResetBuilderStore();

const builderFrameStore = useBuilderFrameStore();
const { pageState } = storeToRefs(builderFrameStore);

useEscapeKey(() => {
  router.push({
    name: 'frame',
    params: { siteId: route.params.siteId, pageId: route.params.pageId },
  });
});
</script>

<style lang="postcss" scoped>
.site-preview-frame {
  @apply w-full flex flex-col;

  &__header {
    @apply fixed top-0 left-0 w-full z-[450];
  }

  &__body {
    @apply grow pt-[calc(64px+70px)] flex;
  }
}
</style>
