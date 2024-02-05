<template>
  <div class="item-picture" @mouseenter="isHover = true" @mouseleave="isHover = false">
    <div class="item-picture__icon-wrapper">
      <MediaImage :path="url" :size="config.resize.itemPicture" class="item-picture__icon" />
    </div>
    <input
      :type="type"
      class="item-picture__input"
      :value="modelValue"
      :disabled="disabled"
      :placeholder="disabled ? '' : 'Подпись...'"
      @input="updateInput"
    />
    <Transition>
      <UiButton
        v-if="isHover"
        class="item-picture__close-button"
        size="small"
        is-ghost
        is-button-icon
        @click="deleteSetting"
      >
        <UiIcon name="trash-delete" class="item-picture__icon-button" />
      </UiButton>
    </Transition>
  </div>
</template>

<script setup>
import { UiButton, UiIcon } from 'account-ui';
import config from 'site-builder/src/configs/configs.js';
import { ref } from 'vue';
import MediaImage from '../../media-image/media-image.vue';

defineProps({
  modelValue: {
    type: String,
    default: '',
  },

  url: {
    type: String,
    default: '',
  },

  type: {
    type: String,
    default: 'text',
  },

  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['delete', 'update:modelValue']);

const isHover = ref(false);

function updateInput(event) {
  emit('update:modelValue', event.target.value);
}

function deleteSetting() {
  emit('delete');
}
</script>

<style lang="postcss" scoped>
.item-picture {
  display: flex;
  flex-direction: row;
  gap: 4px;
  padding: 4px;
  border-radius: var(--m-outer-radius, 8px);
  background: var(--gray-50, #f9fafb);

  &:hover {
    background: var(--blue-100, #edf4ff);

    & .item-picture__input {
      background: var(--blue-100, #edf4ff);
    }

    & .item-picture__input:focus {
      background: var(--white-white, #fff);
    }
  }

  &:active {
    background: var(--blue-150, #dbe9ff);

    & .item-picture__input {
      background: var(--blue-150, #dbe9ff);
    }
  }

  &__icon-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    overflow: hidden;
    border-radius: 6px;
    border: 1px solid var(--gray-200, #ebedf1);
    background: var(--white-white, #fff);
  }

  &__icon {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__input {
    width: calc(100% - 64px - 12px);
    margin-left: 4px;
    background: var(--gray-50, #f9fafb);
    border-radius: 6px;
    color: var(--gray-700, var(--colors-gray-700, #374151));
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;

    &:focus {
      padding-left: 8px;
      border: 2px solid var(--blue-500, #4f7fff);
      outline: none;
    }
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
    color: #6b7280;
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
