<template>
  <div class="ds-notification-item-plain">
    <div class="ds-notification-item-plain__content">
      <DsIcon
        v-if="item.icon"
        :name="item.icon"
        :size="26"
        class="ds-notification-item-plain__icon"
      />
      <div class="ds-notification-item-plain__text-wrapper">
        <div class="ds-notification-item-plain__header">
          <strong v-if="item.title" class="ds-notification-item-plain__title">
            {{ item.title }}
          </strong>
          <span v-if="item.subtitle" class="ds-notification-item-plain__subtitle">
            {{ item.subtitle }}
          </span>
        </div>
        <p v-if="item.text" class="ds-notification-item-plain__text">
          {{ item.text }}
        </p>
      </div>
    </div>
    <div
      v-if="item.buttons && item.buttons.length > 0"
      class="ds-notification-item-plain__buttons-wrapper"
    >
      <DsButton
        v-for="(button, index) in item.buttons"
        :key="button.text"
        :theme="button.theme"
        :color="button.color || getButtonColor(index)"
        size="s"
        :stretch="true"
        :text="button.text"
        :icon="button.icon"
        :url="button.url"
        class="ds-info-card__button"
        @click="clickButton(button.callback)"
      />
    </div>
  </div>
</template>

<script setup>
import DsButton from 'site-ui/src/design-system/ds-button/ds-button.vue';
import DsIcon from 'site-ui/src/design-system/ds-icon/ds-icon.vue';

defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['close']);

function getButtonColor(index) {
  return index ? 'secondary-inverse' : 'primary-inverse';
}

function clickButton(callback) {
  callback();
  emit('close');
}
</script>

<style lang="postcss" scoped>
@import 'site-ui/src/tokens/ui-tokens.css';

.ds-notification-item-plain {
  display: flex;
  flex-direction: column;
  gap: 20px;

  @add-mixin desktop-all {
    flex-direction: row;
    align-items: center;
  }

  &__content {
    display: flex;
    gap: 16px;
  }

  &__icon {
    flex-shrink: 0;
    color: var(--font-primary-inverse);
  }

  &__text-wrapper {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex-basis: 100%;
  }

  &__header {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    min-height: 26px;
    margin-right: 32px;

    @add-mixin desktop-all {
      margin: 0;
    }
  }

  &__title {
    color: var(--font-primary-inverse);
    @add-mixin h6;
  }

  &__subtitle {
    color: var(--font-secondary-inverse);
    @add-mixin b4;
  }

  &__text {
    margin-right: 32px;
    color: var(--font-secondary-inverse);
    @add-mixin b3;

    @add-mixin desktop-all {
      margin: 0;
    }
  }

  &__buttons-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;

    @add-mixin desktop-all {
      flex-direction: row;
    }
  }
}
</style>
