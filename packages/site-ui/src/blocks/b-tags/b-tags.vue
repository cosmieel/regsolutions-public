<template>
  <article :id="'block-' + block.id" class="b-tags">
    <ds-container :title="block.title" :backed="block.backed">
      <ds-list v-if="block.tags.main" type="horizontal">
        <ds-list-item
          v-for="tag in block.tags.main"
          :key="getKey(tag.text)"
          class="b-tags__main-item"
        >
          <DsIcon :name="tag.icon" class="b-tags__icon" :size="20" />
          <span class="b-tags__main-item-text">{{ tag.text }}</span>
        </ds-list-item>
      </ds-list>
      <div class="b-tags__tag-list-wrapper">
        <DsTagList :tags="block.tags.other" type="wrap" />
      </div>
    </ds-container>
  </article>
</template>

<script setup>
import DsContainer from 'site-ui/src/design-system/ds-container/ds-container.vue';
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

  &__tag-list-wrapper {
    padding: 24px 0 0;
    margin: 24px 0 0;
    border-top: 1px solid var(--border-divider);

    @add-mixin desktop-all {
      padding-top: 40px;
      margin-top: 40px;
    }
  }
}
</style>
