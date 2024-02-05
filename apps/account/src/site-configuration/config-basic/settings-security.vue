<template>
  <div class="settings-security">
    <UiInput
      v-model.trim="siteDataModel.password"
      label="Пароль к сайту"
      type="password"
      placeholder="Пароль"
      :error-message="''"
    />
  </div>
</template>

<script setup>
import { UiInput } from 'account-ui';
import { computed } from 'vue';

const props = defineProps({
  siteData: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['update:siteData']);

const siteDataModel = computed({
  get() {
    return props.siteData;
  },
  set(value) {
    emit('update:siteData', value);
  },
});
</script>

<style scoped></style>
