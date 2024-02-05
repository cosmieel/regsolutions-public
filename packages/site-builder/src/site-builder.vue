<template>
  <div class="site-builder" :class="siteBuilderClass">
    <DsLayout
      :ref="layout"
      :data="siteStorage.storage"
      :mode="mode"
      @before-enter-block="beforeEnterBlock"
      @after-enter-block="afterEnterBlock"
      @before-leave-block="beforeLeaveBlock"
      @after-leave-block="afterLeaveBlock"
      @cursor-enter="cursorEnter"
      @cursor-leave="cursorLeave"
    />
    <MainToolbar v-if="mode === 'edit'" :is-edit="isEdit" @call-menu="callMenu" />
    <Transition name="blocks-menu">
      <BlocksMenu v-if="showBlocksMenu" @close-menu="showBlocksMenu = false" />
    </Transition>

    <template v-if="activeBlock && !animated">
      <Teleport :to="activeBlock">
        <EditingToolbar
          :style-toolbar="styleToolbar"
          :block="activeBlock"
          :is-edit="isEdit"
          @copy-link="handleCopyLink"
          @hide-block="handleBlockHidden"
          @delete-block="currentEvent = 'deleteBlock'"
          @click-edit="changeEdit"
        />
      </Teleport>
    </template>

    <Transition>
      <EditingCard
        v-if="isEdit"
        :block="activeBlock"
        :indent-top="indentTop"
        @save="changeEdit"
        @cancel="cancelEdit"
      />
    </Transition>

    <ActiveOutline v-if="activeBlock && !animated" :block="activeBlock" />

    <UiAlertsWrapper class="site-builder__alerts">
      <UiNotifyer :notifyer="notifyer" />
    </UiAlertsWrapper>
    <UiModalProvider :instance="modalManager" />
  </div>
</template>

<script setup>
import { UiAlertsWrapper, UiNotifyer, UiModalProvider } from 'account-ui';
import ActiveOutline from 'site-builder/src/components/active-outline/active-outline.vue';
import BlocksMenu from 'site-builder/src/components/blocks-menu/blocks-menu.vue';
import EditingCard from 'site-builder/src/components/editing-card/editing-card.vue';
import EditingToolbar from 'site-builder/src/components/editing-toolbar/editing-toolbar.vue';
import MainToolbar from 'site-builder/src/components/main-toolbar/main-toolbar.vue';
import { modalManager } from 'site-builder/src/instances/modal-manager.js';
import { notifyer } from 'site-builder/src/instances/notifyer.js';
import { getTopIndent } from 'site-builder/src/services/get-top-indent/get-top-indent.js';
import { useSiteStorage } from 'site-builder/src/site-storage/site-storage.js';
import { DsLayout } from 'site-ui';
import { ref, computed, onMounted, provide } from 'vue';
import VueScrollTo from 'vue-scrollto';

const property = defineProps({
  data: {
    type: Object,
    default: () => {},
  },

  indentTop: {
    type: Number,
    default: 0,
  },

  animationTime: {
    type: Number,
    default: 300,
  },

  createBlock: {
    type: Function,
    default: () => {},
  },

  uploadImage: {
    type: Function,
    default: () => {},
  },

  mode: {
    type: String,
    default: 'view',
  },
});

provide('uploadImage', property.uploadImage);

const siteStorage = useSiteStorage();
siteStorage.init(property.data, property.animationTime, property.createBlock);

const layout = ref(null);
const showBlocksMenu = ref(false);

onMounted(() => {
  document.addEventListener('scroll', () => {
    styleToolbar.value = getTopIndent(activeBlock.value, property.indentTop);
  });
});

const siteBuilderClass = computed(() => {
  const blocks = siteStorage.storage.content.blocks;
  const header = siteStorage.storage.options.layout?.header;
  const footer = siteStorage.storage.options.layout?.footer;
  return blocks > 0 || header || footer ? '' : 'site-builder_empty';
});

function callMenu() {
  showBlocksMenu.value = true;
}

const isEdit = ref(false);

function changeEdit() {
  isEdit.value = !isEdit.value;
}

function cancelEdit() {
  activeBlock.value = null;
  isEdit.value = !isEdit.value;
}

function handleCopyLink() {
  notifyer.info({
    message: 'Ссылка скопирована',
  });
}

function handleBlockHidden() {
  notifyer.info({
    message: 'Блок скрыт',
  });
}

// Сробатывание событий

const activeBlock = ref(null);
const styleToolbar = ref(null);
const animated = ref(false);
const currentEvent = ref(null);

function beforeLeaveBlock() {
  activeBlock.value = null;
  animated.value = true;
}

function afterLeaveBlock() {
  if (currentEvent.value === 'deleteBlock') {
    animated.value = false;
    currentEvent.value = null;
  }
}

function beforeEnterBlock() {
  activeBlock.value = null;
  animated.value = true;
}

function afterEnterBlock(element) {
  VueScrollTo.scrollTo(element, 500, {
    offset: -200,
    onDone: () => {
      animated.value = false;
    },

    onCancel: () => {
      animated.value = false;
    },
  });
}

function cursorEnter(block) {
  if (isEdit.value || currentEvent.value === 'deleteBlock') {
    return;
  }

  activeBlock.value = block;
  styleToolbar.value = getTopIndent(activeBlock.value, property.indentTop);
  block.firstElementChild.classList.add('site-builder__active-block');
}

function cursorLeave(block) {
  if (isEdit.value) {
    return;
  }

  activeBlock.value = null;
  block.firstElementChild.classList.remove('site-builder__active-block');
}

// events
const emit = defineEmits([
  'createBlock',
  'deleteBlock',
  'updateBlock',
  'changeOrder',
  'updateLayout',
]);

siteStorage.setEventCreateBlock(createBlock);
siteStorage.setEventDeleteBlock(deleteBlock);
siteStorage.setEventUpdateBlock(updateBlock);
siteStorage.setEventChangeOrder(changeOrder);
siteStorage.setEventUpdateLayout(updateLayout);

function createBlock(block) {
  emit('createBlock', block);
}

function deleteBlock(block) {
  emit('deleteBlock', block);
}

function updateBlock(block) {
  emit('updateBlock', block);
}

function changeOrder(blocks) {
  emit('changeOrder', blocks);
}

function updateLayout(layout) {
  emit('updateLayout', layout);
}
</script>

<style lang="postcss" scoped>
.site-builder {
  width: calc(100% - 48px);
  max-width: 1200px;
  margin: auto;
  outline: 1px solid var(--gray-200, #e5e7eb);
  border-radius: 8px;
  background: var(--background-layout-background, #fff);

  &_empty {
    border: none;
  }

  &__alerts {
    bottom: 90px;
    z-index: 400;
  }
}

.blocks-menu-enter-active,
.blocks-menu-leave-active {
  transition: opacity 0.2s cubic-bezier(1, 0.5, 0.8, 1);
  z-index: 400;
  position: fixed;
}

.blocks-menu-enter-from,
.blocks-menu-leave-to {
  opacity: 0;
}
</style>

<style lang="postcss">
[data-edit='block'] {
}

[data-active='false'] {
  opacity: 0.2;
}

[data-active='false'].site-builder__active-block {
  opacity: 0.2;
}

.site-builder__active-block {
  transition: all 0.15s cubic-bezier(1, 0.5, 0.8, 1);
}
</style>
