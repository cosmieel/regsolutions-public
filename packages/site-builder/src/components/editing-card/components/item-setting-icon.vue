<template>
  <div
    class="item-setting-icon"
    :class="{ 'item-setting-icon_open': open }"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    <input
      ref="input"
      readonly
      class="item-setting-icon__input"
      :value="value"
      @click.stop="changeOpen"
    />
    <div class="item-setting-icon__icon-wrapper" @click.stop="changeOpen">
      <DsIcon :name="modelValue" :size="16" />
    </div>

    <ul
      v-if="open"
      ref="list"
      v-click-outside="changeOpen"
      class="item-setting-icon__group-list"
      :style="{ top: `${top}px`, width: `${width}px` }"
    >
      <li v-for="group in filteredIcons" :key="group.title">
        <span v-if="groups.length !== 1" class="item-setting-icon__group-title">
          {{ group.title }}
        </span>
        <ul class="item-setting-icon__icon-list">
          <li
            v-for="icon in group.icons"
            :key="icon.title"
            class="item-setting-icon__icon-item"
            @click="setValue(icon.name)"
          >
            <DsIcon :name="icon.name" class="item-setting-icon__icon" :size="16" />
            <p class="item-setting-icon__item-text">{{ icon.title }}</p>
          </li>
        </ul>
      </li>
    </ul>
    <svg
      v-if="mode === 'select'"
      class="item-setting-icon__arrow"
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      @click.stop="changeOpen"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.79378 9.16264L3.12293 5.49179C2.89512 5.26398 2.89512 4.89463 3.12293 4.66683C3.35073 4.43902 3.72008 4.43902 3.94789 4.66683L7.20626 7.9252L10.4646 4.66683C10.6924 4.43902 11.0618 4.43902 11.2896 4.66683C11.5174 4.89464 11.5174 5.26398 11.2896 5.49179L7.61874 9.16264C7.39093 9.39045 7.02159 9.39045 6.79378 9.16264Z"
        fill="#6B7280"
      />
    </svg>
    <Transition>
      <UiButton
        v-if="isHover && mode === 'setting'"
        class="item-setting-icon__close-button"
        size="small"
        is-ghost
        is-button-icon
        @click="deleteSetting"
      >
        <UiIcon name="trash-delete" class="item-setting-icon__icon-button" />
      </UiButton>
    </Transition>
  </div>
</template>

<script setup>
import { UiButton, UiIcon } from 'account-ui';
import { iconGroup } from 'site-builder/src/services/icon-group/icon-group.js';
import { vClickOutside } from 'site-builder/src/services/v-click-outside/v-click-outside.js';
import { DsIcon } from 'site-ui';
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';

const property = defineProps({
  modelValue: {
    type: String,
    default: '',
  },

  mode: {
    type: String,
    default: 'setting',
  },

  groups: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['update:modelValue', 'delete']);

const input = ref(null);
const list = ref(null);
const open = ref(false);
const top = ref(null);
const width = ref(null);
const isHover = ref(false);

const cardWrapper = ref(null);

onMounted(() => {
  cardWrapper.value = document.querySelector('.card-wrapper__field');
  cardWrapper.value.addEventListener('scroll', setClientRectafterScroll);
});

onUnmounted(() => {
  cardWrapper.value.removeEventListener('scroll', setClientRectafterScroll);
});

const filteredIcons = computed(() => {
  if (property.groups.length === 0) {
    return iconGroup;
  }

  return iconGroup.filter((group) => property.groups.includes(group.type));
});

const value = computed(() => {
  const icons = iconGroup.flatMap((list) => list.icons);

  return icons.find((icon) => icon.name === property.modelValue).title;
});

function setClientRect() {
  const documentHeight = document.documentElement.clientHeight;
  const inputClientRect = input.value.getBoundingClientRect();
  const listHeight = list.value.getBoundingClientRect().height;
  const indentTop = 4;

  width.value = inputClientRect.width;
  top.value =
    documentHeight <= inputClientRect.bottom + listHeight + indentTop
      ? inputClientRect.top - listHeight - indentTop
      : inputClientRect.bottom + indentTop;
}

function setClientRectafterScroll() {
  if (open.value === false) {
    return;
  }

  setClientRect();
}

function changeOpen() {
  open.value = !open.value;

  nextTick(() => {
    if (open.value === true) {
      setClientRect();
    }
  });
}

function deleteSetting() {
  emit('delete');
}

function setValue(name) {
  emit('update:modelValue', name);
  open.value = !open.value;
}
</script>

<style lang="postcss" scoped>
.item-setting-icon {
  position: relative;

  &__input {
    width: 100%;
    height: 40px;
    padding: 8px 30px 8px 40px;
    border-radius: var(--m-outer-radius, 8px);
    border: 1px solid var(--gray-200, #ebedf1);
    background: var(--gray-50, #f9fafb);
    color: var(--gray-700, var(--colors-gray-700, #374151));
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    cursor: pointer;

    &:hover {
      background: var(--blue-100, #edf4ff);
    }

    &:active {
      background: var(--blue-150, #dbe9ff);
    }

    &:focus {
      outline: none;
    }
  }

  &__icon-wrapper {
    position: absolute;
    top: 4px;
    left: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    border-radius: 6px;
    border: 1px solid var(--gray-200, #ebedf1);
    background: var(--white-white, #fff);
    color: var(--gray-500, #6b7280);
    cursor: pointer;
  }

  &__group-list {
    position: fixed;
    z-index: 1;
    overflow-y: auto;
    width: 100%;
    height: auto;
    max-height: 320px;
    padding: 8px;
    margin: 0;
    border-radius: 16px;
    border: 1px solid var(--gray-200, #ebedf1);
    background: var(--white-white, #fff);
    box-shadow: 1px 4px 20px 0px rgba(46, 64, 100, 0.16), 2px 2px 12px 0px rgba(46, 64, 100, 0.04);
    list-style: none;
  }

  &__group-title {
    display: flex;
    align-items: center;
    height: 32px;
    margin: 0 16px;
    color: var(--gray-400, #9ca3af);
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
  }

  &__icon-list {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  &__icon-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow-x: hidden;
    height: 32px;
    padding: 0 4px 0 16px;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    white-space: nowrap;
    cursor: pointer;

    &:hover {
      border-radius: 8px;
      background: var(--blue-50, #f5f9ff);

      & .item-setting-icon__icon {
        color: var(--blue-500, #4f7fff);
      }

      & .item-setting-icon__item-text {
        color: var(--blue-500, #4f7fff);
      }
    }

    &:active {
      background: var(--blue-100, #edf4ff);
    }
  }

  &__icon {
    color: #6b7280;
  }

  &__item-text {
    margin-left: 12px;
    color: var(--gray-700, var(--colors-gray-700, #374151));
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  }

  &__arrow {
    position: absolute;
    top: 13px;
    right: 10px;
    cursor: pointer;
  }

  &_open .item-setting-icon__arrow {
    transform: rotate(180deg);
  }

  &__close-button {
    position: absolute;
    top: 4px;
    right: 4px;
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
