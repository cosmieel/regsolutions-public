<template>
  <div class="keywords-field">
    <FormTagsInput :name="KEYWORDS_KEY" label="Ключевые слова" placeholder="Ключевые слова" />

    <span class="keywords-field__note"> Страница будет появляться в поиске по этим словам </span>
  </div>
</template>

<script setup>
import FormTagsInput from 'account/src/components/form/form-tags-input.vue';
import { KEYWORDS_KEY } from '../form/constants.js';
</script>

<style lang="postcss" scoped>
.keywords-field {
  @apply flex flex-col gap-4;

  &__note {
    @apply text-sm text-gray-400 leading-4;
  }
}
</style>
