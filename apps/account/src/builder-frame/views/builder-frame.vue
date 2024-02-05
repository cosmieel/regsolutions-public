<template>
  <div class="builder-frame">
    <header class="builder-frame__header">
      <FrameNavigation
        :site-id="route.params.siteId"
        :page-id="Number(route.params.pageId) || Number(mainPageId)"
      />
    </header>

    <section class="builder-frame__body">
      <SiteBuilder
        v-if="!isPageChanged && pageState?.content"
        :data="pageState"
        :indent-top="62"
        :create-block="createBlock"
        :upload-image="uploadImage"
        mode="edit"
        @delete-block="onDeleteBlock"
        @update-block="onUpdateBlock"
        @update-layout="onUpdataLayout"
        @update-logo="onUpdateLogo"
        @change-order="onChangeOrder"
      />
    </section>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { SiteBuilder } from 'site-builder';
import { useRoute } from 'vue-router';
import { useResetBuilderStore } from '../composables/use-reset-builder-frame-store.js';
import FrameNavigation from '../frame-navigation.vue';
import { useBuilderFrameStore } from '../store/builder-frame-store.js';

const route = useRoute();

const builderFrameStore = useBuilderFrameStore();
const { pageState, mainPageId, isPageChanged } = storeToRefs(builderFrameStore);

useResetBuilderStore();

async function createBlock(blockProps) {
  const result = await builderFrameStore.createBlockRequest(blockProps);

  return result.id;
}

async function updateBlock(blockProps) {
  await builderFrameStore.updateBlockRequest(blockProps);
}

async function deleteBlock(blockId) {
  await builderFrameStore.deleteBlockRequest(blockId);
}

async function updateMenu(menuData) {
  await builderFrameStore.updateMenuRequest(menuData);
}

async function sortBlocks(blocks) {
  await builderFrameStore.sortBlocksRequest(blocks);
}

async function uploadImage(image) {
  const imageUrl = await builderFrameStore.uploadRequest(image);

  return imageUrl;
}

async function onDeleteBlock(block) {
  await deleteBlock(block.id);
}

async function onUpdateBlock(block) {
  await updateBlock(block);
}

async function onUpdataLayout(layout) {
  await updateMenu(layout);
}

async function onUpdateLogo(logo) {
  console.log(logo);
}

async function onChangeOrder(blocks) {
  await sortBlocks(blocks);
}
</script>

<style lang="postcss" scoped>
.builder-frame {
  @apply w-full flex flex-col;

  &__header {
    @apply fixed top-0 left-0 w-full z-[450];
  }

  &__body {
    @apply grow pt-[calc(64px+70px)] pb-[96px] flex;
  }
}
</style>
