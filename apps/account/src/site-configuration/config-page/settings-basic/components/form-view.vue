<template>
  <div class="page-settings-basic-form-view">
    <div class="page-settings-basic-form-view__row">
      <FormInput
        :name="TITLE_KEY"
        label="Название страницы"
        placeholder="Страница"
        type="text"
        :max-length="String(MAX_LENGTH_TITLE)"
      />
      <FormInput
        :name="SLUG_KEY"
        label="URL"
        placeholder="/Страница"
        type="text"
        :max-length="String(MAX_LENGTH_SLUG)"
      />
    </div>

    <FormTextarea
      :name="DESCRIPTION_KEY"
      label="Описание"
      placeholder="Сделано на платформе Рег.решения"
      :counter="String(MAX_LENGTH_DESCRIPTION)"
    />
  </div>
</template>

<script setup>
import FormInput from 'account/src/components/form/form-input.vue';
import FormTextarea from 'account/src/components/form/form-text-area.vue';
import {
  SLUG_KEY,
  MAX_LENGTH_SLUG,
  TITLE_KEY,
  MAX_LENGTH_TITLE,
  DESCRIPTION_KEY,
  MAX_LENGTH_DESCRIPTION,
} from '../form/constants.js';
</script>

<style lang="postcss" scoped>
.page-settings-basic-form-view {
  display: flex;
  flex-direction: column;
  gap: 24px;

  &__row {
    columns: 2;
    gap: 20px;
  }
}
</style>
