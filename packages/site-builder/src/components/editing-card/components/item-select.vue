<template>
  <div class="item-select" :class="{ 'item-select_open': open }">
    <div ref="toggle" class="item-select__trigger" @click="changeOpen">
      {{ modelValue }}

      <svg
        class="item-select__arrow"
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6.79378 9.16264L3.12293 5.49179C2.89512 5.26398 2.89512 4.89463 3.12293 4.66683C3.35073 4.43902 3.72008 4.43902 3.94789 4.66683L7.20626 7.9252L10.4646 4.66683C10.6924 4.43902 11.0618 4.43902 11.2896 4.66683C11.5174 4.89464 11.5174 5.26398 11.2896 5.49179L7.61874 9.16264C7.39093 9.39045 7.02159 9.39045 6.79378 9.16264Z"
          fill="#6B7280"
        />
      </svg>
    </div>

    <ul
      v-if="open"
      ref="listItem"
      v-click-outside="changeOpen"
      class="item-select__list"
      :style="{ top: `${top}px`, width: `${width}px` }"
    >
      <li
        v-for="(item, index) in list"
        :key="`${item}-${index}`"
        class="item-select__list-item"
        @click="setValue(item)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { vClickOutside } from 'site-builder/src/services/v-click-outside/v-click-outside.js';
import { ref, onMounted, onUnmounted, nextTick } from 'vue';

defineProps({
  modelValue: {
    type: String,
    required: true,
  },

  list: {
    type: Array,
    required: true,
  },
});

const toggle = ref(null);
const listItem = ref(null);
const open = ref(false);
const top = ref(null);
const width = ref(null);

const emit = defineEmits(['update:modelValue']);

const cardWrapper = ref(null);

onMounted(() => {
  cardWrapper.value = document.querySelector('.card-wrapper__field');
  cardWrapper.value.addEventListener('scroll', setClientRectafterScroll);
});

onUnmounted(() => {
  cardWrapper.value.removeEventListener('scroll', setClientRectafterScroll);
});

function setClientRect() {
  const documentHeight = document.documentElement.clientHeight;
  const toggleClientRect = toggle.value.getBoundingClientRect();
  const listHeight = listItem.value.getBoundingClientRect().height;
  const indentTop = 4;

  width.value = toggleClientRect.width;

  top.value =
    documentHeight <= toggleClientRect.bottom + listHeight + indentTop
      ? toggleClientRect.top - listHeight - indentTop
      : toggleClientRect.bottom + indentTop;
}

function changeOpen() {
  open.value = !open.value;

  if (open.value === true) {
    nextTick(() => {
      setClientRect();
    });
  }
}

function setClientRectafterScroll() {
  if (open.value === false) {
    return;
  }

  setClientRect();
}

function setValue(item) {
  emit('update:modelValue', item);
  open.value = !open.value;
}
</script>

<style lang="postcss" scoped>
.item-select {
  position: relative;

  &__trigger {
    width: 100%;
    padding: 8px 30px 8px 12px;
    border-radius: var(--m-outer-radius, 8px);
    border: 1px solid var(--gray-200, #ebedf1);
    background: var(--gray-50, #f9fafb);
    color: var(--gray-700, var(--colors-gray-700, #374151));
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    cursor: pointer;
    min-height: 32px;
    position: relative;

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

  &__list {
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

  &__list-item {
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
      color: var(--blue-500, #4f7fff);
    }

    &:active {
      background: var(--blue-100, #edf4ff);
    }
  }

  &__arrow {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  &_open .item-select__arrow {
    transform: rotate(180deg);
  }
}
</style>
