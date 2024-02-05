<template>
  <div
    v-if="block"
    class="editing-toolbar"
    :style="{ top: styleToolbar.top + 'px', position: styleToolbar.position }"
  >
    <div class="editing-toolbar__group editing-toolbar__group_left">
      <div class="editing-toolbar__button-wrapper">
        <UiButton
          class="editing-toolbar__button"
          size="small"
          :is-ghost-white="true"
          title="Редактировать блок"
          @click="clickEdit"
        >
          <UiIcon name="edit" class="editing-toolbar__icon" />
        </UiButton>
      </div>
      <div v-if="!isNotBlock" class="editing-toolbar__button-wrapper">
        <UiButton
          class="editing-toolbar__button"
          size="small"
          :disabled="isEdit"
          :is-ghost-white="true"
          title="Скрыть блок"
          @click="changeActive"
        >
          <UiIcon v-if="isActive" name="eye-opened" class="editing-toolbar__icon" />
          <UiIcon v-if="!isActive" name="eye-closed" class="editing-toolbar__icon" />
        </UiButton>
        <UiButton
          class="editing-toolbar__button"
          size="small"
          :disabled="isEdit"
          :is-ghost-white="true"
          title="Скопировать блок"
          @click="copyBlockId"
        >
          <UiIcon name="link" class="editing-toolbar__icon" />
        </UiButton>
        <UiButton
          class="editing-toolbar__button"
          size="small"
          :disabled="isEdit || isDisableDuplicate"
          :is-ghost-white="true"
          title="Дублировать блок"
          @click="duplicationBlock"
        >
          <UiIcon name="copy" class="editing-toolbar__icon" />
        </UiButton>
      </div>
    </div>
    <div class="editing-toolbar__group editing-toolbar__group_right">
      <div class="editing-toolbar__button-wrapper">
        <UiButton
          v-if="!isNotBlock && blockIndex !== 0"
          class="editing-toolbar__button"
          size="small"
          :disabled="isEdit"
          :is-ghost-white="true"
          title="Поднять блок"
          @click="moveUp"
        >
          <UiIcon name="arrow-up" class="editing-toolbar__icon" />
        </UiButton>
        <UiButton
          v-if="!isNotBlock && blockIndex !== siteStorage.blocksId.length - 1"
          class="editing-toolbar__button"
          size="small"
          :disabled="isEdit"
          :is-ghost-white="true"
          title="Опустить блок"
          @click="moveDown"
        >
          <UiIcon name="arrow-down" class="editing-toolbar__icon" />
        </UiButton>
        <span
          v-if="!isNotBlock && siteStorage.blocksId.length !== 1"
          class="editing-toolbar__devider"
        ></span>
        <UiButton
          class="editing-toolbar__button"
          size="small"
          :disabled="isEdit"
          :is-ghost-white="true"
          title="Удалить блок"
          @click="deleteBlock"
        >
          <UiIcon name="trash-delete" class="editing-toolbar__icon" />
        </UiButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { UiButton, UiIcon } from 'account-ui';
import { useSiteStorage } from 'site-builder/src/site-storage/site-storage';
import { ref, computed } from 'vue';

const property = defineProps({
  styleToolbar: {
    type: Object,
    default: () => {},
  },

  block: {
    type: Object,
    required: true,
  },

  isEdit: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['copyLink', 'hideBlock', 'deleteBlock', 'clickEdit']);

const siteStorage = useSiteStorage();

const isActive = ref(siteStorage.getActive(property.block));

const blockType = computed(() => {
  return siteStorage.getType(property.block);
});

const isNotBlock = computed(() => {
  return blockType.value === 'DsHeader' || blockType.value === 'DsFooter' ? true : false;
});

const blockIndex = computed(() => {
  return siteStorage.getBlockIndex(property.block);
});

const isDisableDuplicate = computed(() => {
  if (
    blockType.value === 'BBnovo' &&
    siteStorage.storage.content.blocks.some((block) => block.type === 'BBnovo')
  ) {
    return true;
  }

  return false;
});

function deleteBlock() {
  emit('deleteBlock');

  if (blockType.value === 'DsHeader') {
    siteStorage.deleteHeader();
    return;
  }

  if (blockType.value === 'DsFooter') {
    siteStorage.deleteFooter();
    return;
  }

  siteStorage.deleteBlock(property.block);
}

function moveUp() {
  siteStorage.moveUp(property.block);
}

function moveDown() {
  siteStorage.moveDown(property.block);
}

function copyBlockId() {
  const id = property.block.firstElementChild.id;

  navigator.clipboard
    .writeText(`#${id}`)
    .then(() => {
      emit('copyLink');
    })
    .catch((error) => {
      console.error('Error in copying text:', error);
    });
}

function duplicationBlock() {
  const data = siteStorage.getBlockData(property.block);
  data.id = '';
  siteStorage.addBlock(data.type, data);
}

function changeActive() {
  siteStorage.changeActive(property.block);
  isActive.value = !isActive.value;

  if (!isActive.value) {
    emit('hideBlock');
  }
}

function clickEdit() {
  emit('clickEdit');
}
</script>

<style lang="postcss" scoped>
.editing-toolbar {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  z-index: 400;
  width: 1240px;
  height: 0;
  display: flex;
  justify-content: space-between;

  &__group {
    display: flex;
    gap: 8px;
    height: 56px;
  }

  &__button-wrapper {
    display: flex;
    gap: 8px;
    padding: 12px;
    background: var(--gray-900, #161d27);
    border-radius: 16px;
  }

  &__button {
    width: 32px;
    height: 32px;
    padding: 0;
  }

  &__devider {
    width: 1px;
    height: auto;
    margin: 0 4px;
    background: rgba(255, 255, 255, 0.1);
  }

  &__icon {
    width: 14px;
    height: 14px;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease-in;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
