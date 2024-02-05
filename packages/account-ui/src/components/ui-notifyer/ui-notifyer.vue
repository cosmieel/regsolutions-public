<template>
  <TransitionGroup class="ui-notifyer" name="ui-notifyer" tag="div">
    <UiNotifyerItem
      v-for="item of list"
      :id="item.id"
      :key="item.id"
      :icon="item.icon"
      :type="item.type"
      :title="item.title"
      :action="item.action"
      :message="item.message"
      :time-out="item.timeOut"
      @timer-completed="item.onTimerCompleted"
    />
  </TransitionGroup>
</template>

<script setup>
import { computed, provide } from 'vue';
import UiNotifyerItem from './ui-notifyer-item.vue';

const props = defineProps({
  notifyer: {
    type: Object,
    required: true,
  },
});

const list = computed(() => props.notifyer.list.value);

provide('notifyer', props.notifyer);
</script>

<style lang="postcss" scoped>
.ui-notifyer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  z-index: 9999;

  &-enter-active,
  &-leave-active {
    transition: all 0.3s ease;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }

  &-enter-from {
    transform: translateX(-100px);
  }

  &-leave-to {
    transform: translateX(100px);
  }
}
</style>
