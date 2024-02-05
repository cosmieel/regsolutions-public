<template>
  <ul class="color-list">
    <li
      v-for="(color, index) in colors"
      :key="color.name"
      class="color-list__item"
      :class="customClasses(index)"
      @click="selectColor(index)"
    ></li>
  </ul>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';

const props = defineProps({
  isCustomColorSelected: {
    type: Boolean,
    default: false,
  },
});

const colors = reactive(['#406CFF', '#FF4085', '#12B4E8', '#60A555', '#2E2F34']);

const selectedColor = ref('');

const bgColors = reactive([
  'bg-[#406CFF]',
  'bg-[#FF4085]',
  'bg-[#12B4E8]',
  'bg-[#60A555]',
  'bg-[#2E2F34]',
]);
const ringColors = reactive([
  'ring-[#406CFF]/[.8]',
  'ring-[#FF4085]/[.8]',
  'ring-[#12B4E8]/[.8]',
  'ring-[#60A555]/[.8]',
  'ring-[#2E2F34]/[.8]',
]);

const isCurrentColorSelected = (index) =>
  !props.isCustomColorSelected && selectedColor.value === index;

const selectedClass = (index) => {
  return {
    'color-list__item_selected': isCurrentColorSelected(index),
  };
};

const customClasses = (index) => {
  return [
    selectedClass(index),
    `${bgColors[index]}`,
    isCurrentColorSelected(index) && `ring-4 ${ringColors[index]}`,
  ];
};

const emit = defineEmits(['select-color']);

function selectColor(index) {
  selectedColor.value = index;

  emit('select-color', colors[index]);
}

onMounted(() => {
  if (localStorage.getItem('wizard')) {
    const index = colors.indexOf(JSON.parse(localStorage.getItem('wizard')).color);

    if (index !== -1) {
      selectColor(index);
    }
  }
});
</script>

<style lang="postcss" scoped>
.color-list {
  @apply flex space-x-4;

  &__item {
    @apply w-[36px] h-[36px] rounded-full border-2 border-white cursor-pointer;
  }
}
</style>
