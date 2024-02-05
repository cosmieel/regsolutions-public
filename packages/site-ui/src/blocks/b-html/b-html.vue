<template>
  <article :id="'block-' + block.id" class="b-html">
    <ds-container :title="block.title" :backed="block.backed">
      <DsHtml v-if="block.html" :id="block.id" :html="block.html" />
    </ds-container>
  </article>
</template>

<script setup>
import DsContainer from 'site-ui/src/design-system/ds-container/ds-container.vue';
import DsHtml from 'site-ui/src/design-system/ds-html/ds-html.vue';

defineProps({
  block: {
    type: Object,
    required: true,
  },
});
</script>
