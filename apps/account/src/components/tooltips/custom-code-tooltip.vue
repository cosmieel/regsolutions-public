<template>
  <TooltipHint>
    <span v-for="(item, index) in tooltipText" :key="index"> {{ item }} </span>
  </TooltipHint>
</template>

<script setup>
import TooltipHint from './tooltip-hint.vue';

const tooltipText = ['Код должен иметь начало и конец', '(<script> ... <script> )'];
</script>
