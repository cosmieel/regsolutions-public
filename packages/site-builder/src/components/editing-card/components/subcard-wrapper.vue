<template>
  <div ref="subcard" class="subcard-wrapper" :style="{ top: `${top}px`, left: `${left}px` }">
    <div class="subcard-wrapper__header">
      <strong class="subcard-wrapper__title">{{ title }}</strong>
      <UiButton class="subcard-wrapper__button" size="small" is-ghost is-button-icon @click="close">
        <UiIcon name="close" :size="16" class="item-setting__icon-button" />
      </UiButton>
    </div>

    <div class="subcard-wrapper__field">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { UiButton, UiIcon } from 'account-ui';
import { ref, onMounted, onUnmounted } from 'vue';

defineProps({
  title: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['close']);

const subcard = ref(null);
const top = ref(null);
const left = ref(null);
const cardWrapper = document.querySelector('.card-wrapper__field');

onMounted(() => {
  setClientRect();
  cardWrapper.addEventListener('scroll', setClientRect);
});

onUnmounted(() => {
  cardWrapper.removeEventListener('scroll', setClientRect);
});

function setClientRect() {
  const documentHeight = document.documentElement.clientHeight;
  const parentClientRect = subcard.value.parentElement.getBoundingClientRect();
  const subcardHeight = subcard.value.getBoundingClientRect().height;

  left.value = parentClientRect.left + parentClientRect.width + 32;
  top.value =
    documentHeight <= parentClientRect.top + subcardHeight
      ? parentClientRect.bottom - subcardHeight
      : parentClientRect.top;
}

function close() {
  emit('close');
}
</script>

<style lang="postcss" scoped>
.subcard-wrapper {
  position: fixed;
  width: 348px;
  border-radius: 16px;
  border: 1px solid var(--gray-200, #ebedf1);
  background-color: #fff;
  box-shadow: 1px 4px 20px 0px rgba(46, 64, 100, 0.16), 2px 2px 12px 0px rgba(46, 64, 100, 0.04);

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 48px;
    padding-left: 16px;
    padding-right: 6px;
    border-radius: 16px 16px 0 0;
    background-color: #f9fafb;
    border-bottom: 1px solid var(--gray-200, #ebedf1);
  }

  &__title {
    font-size: 14px;
    font-weight: 500;
    color: var(--gray-700, var(--colors-gray-700, #374151));
  }

  &__field {
    max-height: 480px;
    padding: 16px;
    overflow-y: auto;
  }

  &__button {
    width: 32px;
    height: 32px;
  }
}
</style>
