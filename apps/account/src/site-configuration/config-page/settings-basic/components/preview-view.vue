<template>
  <SearchResultPreview
    :path="currentSiteData?.logo"
    :name="formValues[TITLE_KEY]"
    :slug="currentPageData?.slug"
    :domain="currentSiteData.domain"
    :description="formValues[DESCRIPTION_KEY]"
  />
</template>

<script setup>
import { inject } from 'vue';
import SearchResultPreview from '../../../components/basic-settings/search-result-preview.vue';
import {
  FORM_VALUES_PROVIDE_KEY,
  TITLE_KEY,
  DESCRIPTION_KEY,
  FROM_CURRENT_SITE_DATA_KEY,
  FROM_CURRENT_PAGE_DATA_KEY,
} from '../form/constants.js';

const formValues = inject(FORM_VALUES_PROVIDE_KEY);
const currentSiteData = inject(FROM_CURRENT_SITE_DATA_KEY);
const currentPageData = inject(FROM_CURRENT_PAGE_DATA_KEY);
</script>
