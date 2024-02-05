<template>
  <article
    :id="'block-' + block.id"
    class="b-bnovo"
    :class="{ 'bnovo-block_with-promo': block.couponSupport }"
  >
    <ds-container :title="block.title">
      <DsHtml :id="'block-bnovo-' + block.id" :html="html" />
    </ds-container>
  </article>
</template>

<script setup>
import DsContainer from 'site-ui/src/design-system/ds-container/ds-container.vue';
import DsHtml from 'site-ui/src/design-system/ds-html/ds-html.vue';
import { ref } from 'vue';
import { buildSettings } from './settings.js';

const props = defineProps({
  block: {
    type: Object,
    required: true,
  },

  color: {
    type: Object,
    default: () => {},
  },
});

const widget = await import(/* @vite-ignore */ `./widget.js`);

const settings = buildSettings({
  uid: props.block.bnovoId,
  color: props.color.hex,
  minNumberDays: props.block.minNumberDays || '1',
  url: props.block.url,
  couponSupport: props.block.couponSupport || false,
});

const bnovo = widget.createWidget(props.block.id, settings);
const html = ref(props.block.fullMode ? bnovo.fullMode() : bnovo.miniMode());
</script>
