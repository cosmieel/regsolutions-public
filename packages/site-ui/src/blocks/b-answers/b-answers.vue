<template>
  <article :id="'block-' + block.id" class="b-answers">
    <ds-container :title="block.title" :backed="block.backed">
      <ds-list type="vertical">
        <ds-list-item v-for="(item, index) in block.answers" :key="item.title">
          <DsAccordion :title="item.title" :text="item.text" :clear="index === 0" />
        </ds-list-item>
      </ds-list>
    </ds-container>
  </article>
</template>

<script setup>
import DsAccordion from 'site-ui/src/design-system/ds-accordion/ds-accordion.vue';
import DsContainer from 'site-ui/src/design-system/ds-container/ds-container.vue';
import DsListItem from 'site-ui/src/design-system/ds-list/ds-list-item.vue';
import DsList from 'site-ui/src/design-system/ds-list/ds-list.vue';

defineProps({
  block: {
    type: Object,
    required: true,
  },
});
</script>
