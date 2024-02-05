<template>
  <div class="settings-basic-form-view">
    <FormInput
      :name="NAME_KEY"
      label="Название сайта"
      placeholder="Мой сайт"
      type="text"
      :max-length="String(MAX_LENGTH_NAME)"
    />
    <div>
      <FormSelect :name="LANGUAGE_KEY" label="Язык" :options="languageOptions" />
      <div class="settings-basic-form-view__note">
        Пользователи будут видеть системные сообщения на этом языке
      </div>
    </div>
    <FormTextarea
      :name="DESCRIPTION_KEY"
      label="Описание"
      :counter="String(MAX_LENGTH_DESCRIPTION)"
      placeholder="Сделано на платформе Рег.решения"
    />
  </div>
</template>

<script setup>
import FormInput from 'account/src/components/form/form-input.vue';
import FormSelect from 'account/src/components/form/form-select.vue';
import FormTextarea from 'account/src/components/form/form-text-area.vue';
import { languageOptions } from 'account/src/utility/options/language.js';
import {
  NAME_KEY,
  DESCRIPTION_KEY,
  LANGUAGE_KEY,
  MAX_LENGTH_NAME,
  MAX_LENGTH_DESCRIPTION,
} from '../form/constants.js';
</script>

<style lang="postcss" scoped>
.settings-basic-form-view {
  display: flex;
  flex-direction: column;
  gap: 24px;

  &__note {
    color: var(--gray-400, #9ca3af);
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
  }
}
</style>
