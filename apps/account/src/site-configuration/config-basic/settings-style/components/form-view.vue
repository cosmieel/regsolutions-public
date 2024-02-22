<template>
  <div class="settings-style-form-view">
    <StyleSection :color="formValues[COLOR_KEY]" />
  </div>
</template>

<script setup>
import { inject } from 'vue';
import StyleSection from './style-section.vue';
import { FORM_VALUES_PROVIDE_KEY, COLOR_KEY } from '../form/constants.js';

const formValues = inject(FORM_VALUES_PROVIDE_KEY);
</script>
