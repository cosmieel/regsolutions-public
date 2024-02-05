<template>
  <SearchResultPreview
    :path="currentSiteData?.logo"
    :name="formValues[NAME_KEY]"
    :domain="currentSiteData.domain"
    :description="formValues[DESCRIPTION_KEY]"
  />
</template>

<script setup>
import { inject } from 'vue';
import SearchResultPreview from '../../../components/basic-settings/search-result-preview.vue';
import {
  FORM_VALUES_PROVIDE_KEY,
  NAME_KEY,
  DESCRIPTION_KEY,
  FROM_CURRENT_SITE_DATA_KEY,
} from '../form/constants.js';

const formValues = inject(FORM_VALUES_PROVIDE_KEY);
const currentSiteData = inject(FROM_CURRENT_SITE_DATA_KEY);
</script>
