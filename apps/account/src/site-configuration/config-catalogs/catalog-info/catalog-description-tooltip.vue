<template>
  <TooltipHint>
    <span v-for="(item, index) in tooltipText" :key="index"> {{ item }} </span>
  </TooltipHint>
</template>

<script setup>
import TooltipHint from 'account/src/components/tooltips/tooltip-hint.vue';

const tooltipText = [
  'Дополнительная информация о товарах.',
  'Описание будет расположено в карточке под названием',
];
</script>
