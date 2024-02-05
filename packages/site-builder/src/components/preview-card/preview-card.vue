<template>
  <div class="card-preview" :style="{ top: `${top}px`, left: `${left}px` }">
    <img class="card-preview__image" :src="previewUrl" />
  </div>
</template>

<script setup>
const property = defineProps({
  preview: {
    type: String,
    default: '',
  },

  top: {
    type: Number,
    default: 0,
  },

  left: {
    type: Number,
    default: 0,
  },
});

const previewUrl = new URL(`../../assets/previews-blocks/${property.preview}.png`, import.meta.url)
  .href;
</script>

<style lang="postcss" scoped>
.card-preview {
  position: fixed;
  z-index: 400;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 352px;
  height: auto;
  padding: 24px;
  overflow: auto;
  background-color: #fff;

  @apply shadow-lg rounded-2xl border border-gray-200 backdrop-opacity-20;
}
</style>
