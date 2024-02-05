<template>
  <div
    class="item-setting"
    :class="{ 'item-setting_active': showSetting }"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    <div class="item-setting__icon-wrapper" @click="clickToSetting">
      <UiIcon name="checkmark" :size="16" class="item-setting__icon" />
    </div>
    <p class="item-setting__text" @click="clickToSetting">{{ itemText }}</p>

    <Transition>
      <UiButton
        v-if="isHover || showSetting"
        class="item-setting__close-button"
        size="small"
        is-ghost
        is-button-icon
        @click="deleteSetting"
      >
        <UiIcon name="trash-delete" class="item-setting__icon-button" />
      </UiButton>
    </Transition>

    <Transition>
      <SubcardWrapper
        v-if="showSetting"
        v-click-outside="closeSetting"
        :title="title"
        @close="closeSetting"
      >
        <slot />
      </SubcardWrapper>
    </Transition>
  </div>
</template>

<script setup>
import { UiButton, UiIcon } from 'account-ui';
import { trimString } from 'site-builder/src/services/trim-string/trim-string.js';
import { vClickOutside } from 'site-builder/src/services/v-click-outside/v-click-outside.js';
import { ref, computed } from 'vue';
import SubcardWrapper from './subcard-wrapper.vue';

const property = defineProps({
  title: {
    type: String,
    default: '',
  },

  text: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['delete', 'click']);

const isHover = ref(false);
const showSetting = ref(false);

const itemText = computed(() => {
  return property.text ? trimString(property.text, 13) : 'Заполнить';
});

function closeSetting() {
  isHover.value = false;
  showSetting.value = false;
}

function deleteSetting() {
  showSetting.value = false;
  emit('delete');
}

function clickToSetting() {
  emit('click');
  showSetting.value = !showSetting.value;
}
</script>

<style lang="postcss" scoped>
.item-setting {
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 4px;
  padding: 4px;
  border-radius: var(--m-outer-radius, 8px);
  background: var(--gray-50, #f9fafb);

  &:hover {
    background: var(--blue-100, #edf4ff);

    & > .item-setting__icon-wrapper {
      border: 1px solid var(--blue-200, #c3daff);
    }
  }

  &:active {
    background: var(--blue-150, #dbe9ff);
  }

  &_active {
    background: var(--blue-150, #dbe9ff);

    &:hover {
      background: var(--blue-150, #dbe9ff);
    }

    &:active {
      background: var(--blue-150, #dbe9ff);
    }

    & > .item-setting__icon-wrapper {
      border: 1px solid var(--blue-200, #c3daff);
    }
  }

  &__icon-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    border-radius: 6px;
    border: 1px solid var(--gray-200, #ebedf1);
    background: var(--white-white, #fff);
    cursor: pointer;
  }

  &__icon {
    color: var(--gray-500, #6b7280);
  }

  &__text {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0 8px;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    color: var(--gray-500, #6b7280);
    cursor: pointer;
  }

  &__close-button {
    width: 32px;
    height: 32px;
  }

  &__icon-button {
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
