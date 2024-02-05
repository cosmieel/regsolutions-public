<template>
  <div class="page-settings-seo">
    <UiTagsInput
      v-model="pageKeywordsModel"
      label="Ключевые слова"
      placeholder="Ключевые слова"
      :error-message="''"
    />

    <div class="page-settings-seo__note">Страница будет появляться в поиске по этим словам</div>
  </div>
</template>

<script setup>
import { UiTagsInput } from 'account-ui';
import { computed } from 'vue';

const props = defineProps({
  pageKeywords: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['update:pageKeywords']);

const pageKeywordsModel = computed({
  get() {
    return props.pageKeywords ? String(props.pageKeywords) : 'keyword';
  },
  set(value) {
    emit('update:pageKeywords', String(value));
  },
});
</script>

<style lang="postcss" scoped>
.page-settings-seo {
  &__note {
    @apply text-sm text-gray-400 leading-4 pt-4;
  }
}
</style>
