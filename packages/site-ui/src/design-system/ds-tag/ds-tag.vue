<template>
  <div v-if="icon || text" class="ds-tag" :class="{ 'ds-tag_icon-only': !text }">
    <DsIcon v-if="icon" :name="icon" class="ds-tag__icon" />
    <span v-if="text" class="ds-tag__text">{{ text }}</span>
  </div>
</template>

<script setup>
import DsIcon from 'site-ui/src/design-system/ds-icon/ds-icon.vue';

defineProps({
  text: {
    type: String,
    default: '',
  },

  icon: {
    type: String,
    default: '',
  },
});
</script>

<style lang="postcss" scoped>
@import 'site-ui/src/tokens/ui-tokens.css';

.ds-tag {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 6px 10px 6px 8px;
  color: var(--font-thertiary);
  background-color: var(--bg-badge-primary);
  border-radius: $radius-s;

  @add-mixin desktop-all {
    padding: 6px 10px 6px 8px;
  }

  &_icon-only {
    padding: 8px;

    @add-mixin desktop-all {
      padding: 9px;
    }
  }

  &__text {
    margin-left: 2px;
    color: var(--font-thertiary);
    font-weight: 400;
    @add-mixin b4;

    @add-mixin desktop-all {
      @add-mixin b3;
    }
  }

  &__icon {
    width: 16px;
    height: 16px;

    @add-mixin desktop-all {
      width: 18px;
      height: 18px;
    }
  }
}
</style>
