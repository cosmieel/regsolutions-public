<template>
  <div class="blocks-menu">
    <div ref="menu" class="blocks-menu__menu">
      <div class="blocks-menu__search">
        <UiIcon name="search" class="blocks-menu__search-icon" />
        <input
          v-model="searchName"
          type="text"
          class="blocks-menu__input"
          placeholder="Найти блок..."
        />
      </div>
      <ul class="blocks-menu__group-list">
        <li v-for="group in currentBloksData" :key="group.title">
          <strong class="blocks-menu__group-title">{{ group.title }}</strong>
          <ul class="blocks-menu__card-list">
            <li v-for="card in group.blocks" :key="card.title">
              <PictureCard
                :picture="card.picture"
                :title="card.title"
                :color="group.color"
                :desabled="isDisabledCard(card)"
                @hover="showPreview(card.preview)"
                @leave="closePreview"
                @delete="deletePreview(card.preview)"
                @click="addSection(card)"
              />
            </li>
          </ul>
        </li>
      </ul>
      <div v-if="currentBloksData.length === 0" class="blocks-menu__nothing">
        <span class="blocks-menu__nothing-icon-wrapper">
          <UiIcon name="search" class="blocks-menu__nothing-icon" />
        </span>
        <p class="blocks-menu__nothing-text">Ничего подходящего...</p>
      </div>
    </div>
    <Transition>
      <PreviewCard
        v-if="needPreview"
        :preview="activePreview"
        :top="menu.getBoundingClientRect().top"
        :left="menu.getBoundingClientRect().right"
      />
    </Transition>
  </div>
</template>

<script setup>
import { UiIcon } from 'account-ui';
import { blocksListData } from 'site-builder/src/components/blocks-menu/blocks-list-data/blocks-list-data.js';
import PictureCard from 'site-builder/src/components/picture-card/picture-card.vue';
import PreviewCard from 'site-builder/src/components/preview-card/preview-card.vue';
import { useSiteStorage } from 'site-builder/src/site-storage/site-storage';
import { ref, computed, onMounted, onUnmounted } from 'vue';

const siteStorage = useSiteStorage();

const emit = defineEmits(['closeMenu']);

const menu = ref(null);
const isActive = ref(false);
const needPreview = ref(false);
const activePreview = ref(null);
const searchName = ref('');

onMounted(() => {
  document.addEventListener('click', hideBlocksMenu);
});

onUnmounted(() => {
  document.removeEventListener('click', hideBlocksMenu);
});

const currentBloksData = computed(() => {
  const currentBloksData = [];

  for (const groupData of blocksListData) {
    const curentBlocks = groupData.blocks.filter((block) => {
      return block.title.toLowerCase().includes(searchName.value.toLowerCase());
    });

    if (curentBlocks.length > 0) {
      currentBloksData.push({
        title: groupData.title,
        color: groupData.color,
        blocks: curentBlocks,
      });
    }
  }

  return currentBloksData;
});

function hideBlocksMenu(event) {
  const withinBoundaries = event.composedPath().includes(menu.value);

  if (!withinBoundaries && isActive.value) {
    emit('closeMenu');
  }

  isActive.value = true;
}

function showPreview(preview) {
  needPreview.value = true;
  activePreview.value = preview;
}

function closePreview() {
  needPreview.value = false;
}

function deletePreview(preview) {
  if (activePreview.value === preview) {
    needPreview.value = false;
  }
}

function addSection(card) {
  if (card.block.type === 'DsHeader') {
    siteStorage.addHeader();
  } else if (card.block.type === 'DsFooter') {
    siteStorage.addFooter();
  } else {
    siteStorage.addBlock(card.block.type, card.block);
  }

  emit('closeMenu');
}

function isDisabledCard(card) {
  if (card.block.type === 'DsHeader' && siteStorage.storage.options.layout?.header) {
    return true;
  }

  if (card.block.type === 'DsFooter' && siteStorage.storage.options.layout?.footer) {
    return true;
  }

  if (
    card.block.type === 'BBnovo' &&
    siteStorage.storage.content.blocks.some((block) => block.type === 'BBnovo')
  ) {
    return true;
  }
}
</script>

<style lang="postcss" scoped>
.blocks-menu {
  &__menu {
    position: fixed;
    left: 50%;
    bottom: 100px;
    transform: translate(-50%);
    z-index: 400;
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 322px;
    height: 562px;
    padding: 16px;
    overflow-y: hidden;
    overflow-y: auto;

    @apply bg-white shadow-lg rounded-2xl border border-gray-200 backdrop-opacity-20;
  }

  &__search {
    @apply relative mb-4;
  }

  &__search-icon {
    @apply absolute top-[50%] translate-y-[-50%] left-3 w-[14px] h-[14px];
  }

  &__input {
    @apply py-2 pl-8 pr-3 block w-full border border-gray-200 bg-gray-50 rounded-md text-sm;

    &:focus {
      @apply outline-none border border-blue-500;
    }
  }

  &__group-list {
    @apply flex flex-col gap-4;
  }

  &__group-title {
    @apply block mb-2 text-gray-400 text-xs font-normal;
  }

  &__card-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }

  &__nothing {
    @apply flex flex-col items-center;
  }

  &__nothing-icon-wrapper {
    @apply flex justify-center items-center w-[44px] h-[44px] bg-gray-50 rounded-[50%] mb-2;
  }

  &__nothing-icon {
    @apply w-[24px] h-[24px];
  }

  &__nothing-text {
    @apply text-gray-400 text-xs font-normal;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease-in;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
