<template>
  <div :id="blockId" class="ds-html" />
</template>

<script setup>
import ready from 'document-ready';
import postscribe from 'postscribe';
import { onMounted, ref } from 'vue';

const property = defineProps({
  id: {
    type: String,
    required: true,
  },

  html: {
    type: String,
    default: '',
  },
});

const blockId = ref(property.id);

onMounted(() => {
  ready(() => {
    const addElement = new Promise((resolve) => {
      postscribe(`#${blockId.value}`, `${property.html}`, {
        done: (x) => {
          resolve(x);
        },
      });
      resolve();
    });
    addElement.then(() => {});
  });
});
</script>
