<template>
  <div class="item-uploader">
    <button class="item-uploader__button" @click="onClick">
      <span class="item-uploader__icon"></span>
      <p class="item-uploader__text">Добавить...</p>
    </button>
    <input
      ref="fileInput"
      class="item-uploader__input"
      type="file"
      accept="image/*"
      @change="uploadImage"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['upload']);

const fileInput = ref(null);

function uploadImage(event) {
  const file = event.target?.files[0];
  emit('upload', file);
}

function onClick() {
  fileInput.value.click();
}
</script>

<style lang="postcss" scoped>
.item-uploader {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  padding: 4px;
  border-radius: var(--m-outer-radius, 8px);
  background: var(--gray-50, #f9fafb);
  cursor: pointer;

  &:hover {
    background: var(--gray-100, #f3f4f6);
  }

  &:active {
    background: var(--gray-100, #f3f4f6);
  }

  &__button {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  &__icon {
    display: block;
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    background-image: url('../../../assets/images/empty.png');
    background-size: cover;
    border-radius: 6px;
    border: 1px solid var(--gray-200, #ebedf1);
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
    color: #9ca3af;
  }

  &__input {
    width: 0;
    height: 0;
  }
}
</style>
