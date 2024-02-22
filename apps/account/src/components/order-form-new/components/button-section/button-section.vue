<template>
  <ViewItem>
    <UiButton>
      {{ button?.text || 'Задайте текст кнопке' }}
    </UiButton>

    <ThreeDotMenu>
      <OptionsList :name="button.text" @action="handleOptionsAction" />
    </ThreeDotMenu>
  </ViewItem>
</template>

<script setup>
import { UiButton } from 'account-ui';
import { inject } from 'vue';
import OptionsList from './options-list.vue';
import { BUTTON_STATE_KEY } from '../../constants.js';
import ThreeDotMenu from '../menu/three-dot-menu.vue';
import ViewItem from '../view-item.vue';

const { button, handleOptionsAction } = inject(BUTTON_STATE_KEY);
</script>
