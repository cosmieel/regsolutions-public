<template>
  <ViewItem class="order-form-terms-section">
    <span class="order-form-terms-section__text">
      Отправляя заявку, вы соглашаетесь с
      <a :href="terms?.rulesLink || ''">правилами пользования сайтом</a> и
      <a :href="terms?.policyLink || ''">политикой обработки персональных данных</a>
    </span>

    <ThreeDotMenu>
      <OptionsList :terms="terms" @action="handleOptionsAction" />
    </ThreeDotMenu>
  </ViewItem>
</template>

<script setup>
import { inject } from 'vue';
import OptionsList from './options-list.vue';
import { TERMS_STATE_KEY } from '../../constants.js';
import ThreeDotMenu from '../menu/three-dot-menu.vue';
import ViewItem from '../view-item.vue';

const { terms, handleOptionsAction } = inject(TERMS_STATE_KEY);
</script>

<style lang="postcss" scoped>
.order-form-terms-section {
  @apply p-5;

  &__text {
    @apply relative block text-gray-700 text-sm text-center;

    a {
      @apply underline;
    }
  }
}
</style>
