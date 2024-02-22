<template>
  <ViewItem is-draggable>
    <UiTextarea :label="formattedLabel" is-disabled class="pointer-events-none" placeholder="" />
    <ThreeDotMenu>
      <OptionsList
        :name="label"
        :is-required="isRequired"
        @action="$emit('option-action', $event)"
      />
    </ThreeDotMenu>
  </ViewItem>
</template>

<script setup>
import { UiTextarea } from 'account-ui';
import { computed } from 'vue';
import OptionsList from './options-list.vue';
import ThreeDotMenu from '../menu/three-dot-menu.vue';
import ViewItem from '../view-item.vue';

const props = defineProps({
  isRequired: {
    required: true,
    type: Boolean,
  },

  label: {
    required: true,
    type: String,
  },
});

defineEmits(['option-action']);

const formattedLabel = computed(() => `${props.label}${props.isRequired ? '*' : ''}`);
</script>
