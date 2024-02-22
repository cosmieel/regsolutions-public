<template>
  <article :id="'block-' + block.id" class="b-tags">
    <ds-container :title="block.title" :backed="block.backed">
      <ds-list v-if="block.tags.main.length > 0" type="horizontal">
        <ds-list-item
          v-for="tag in block.tags.main"
          :key="getKey(tag.text)"
          class="b-tags__main-item"
        >
          <DsIcon :name="tag.icon" class="b-tags__icon" :size="20" />
          <span class="b-tags__main-item-text">{{ tag.text }}</span>
        </ds-list-item>
      </ds-list>

      <DsDevider
        v-if="block.tags.other.length > 0 && block.tags.main.length > 0"
        class="b-tags__devider"
      />

      <DsTagList v-if="block.tags.other.length > 0" :tags="block.tags.other" type="wrap" />
    </ds-container>
  </article>
</template>

<script setup>
import DsContainer from 'site-ui/src/design-system/ds-container/ds-container.vue';
import DsDevider from 'site-ui/src/design-system/ds-devider/ds-devider.vue';
import DsIcon from 'site-ui/src/design-system/ds-icon/ds-icon.vue';
import DsListItem from 'site-ui/src/design-system/ds-list/ds-list-item.vue';
import DsList from 'site-ui/src/design-system/ds-list/ds-list.vue';
import DsTagList from 'site-ui/src/design-system/ds-tag-list/ds-tag-list.vue';

defineProps({
  block: {
    type: Object,
    required: true,
  },
});

function getKey(item) {
  return `${item}${Math.random()}`;
}
</script>

<style lang="postcss" scoped>
@import 'site-ui/src/tokens/ui-tokens.css';

.b-tags {
  &__main-item {
    display: flex;
    align-items: center;
    gap: 12px;
    font-weight: 500;
    @add-mixin b3;
  }

  &__icon {
    flex-shrink: 0;
  }

  &__devider {
    margin: 24px 0;

    @add-mixin desktop-all {
      margin: 32px 0;
    }
  }
}
</style>
