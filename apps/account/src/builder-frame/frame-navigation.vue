<template>
  <nav class="frame-nav">
    <div class="frame-nav__back">
      <router-link v-if="isPreview" :to="{ name: 'frame', params: { siteId, pageId } }">
        <UiButton is-outline is-button-icon>
          <UiIcon class="frame-nav__back-icon" name="arrow-back" :size="20" />
        </UiButton>
      </router-link>
      <router-link v-else :to="{ name: 'accountMain' }">
        <UiButton is-outline is-button-icon>
          <UiIcon class="frame-nav__back-icon" name="arrow-back" :size="20" />
        </UiButton>
      </router-link>
    </div>

    <div v-if="!isPreview" class="frame-nav__pages">
      <PagesSettings />
    </div>

    <div v-if="!isPreview" class="frame-nav__settings">
      <SiteSettings />
    </div>

    <div v-if="!isPreview" class="frame-nav__account">
      <AccountSettings />
    </div>

    <div v-if="!isPreview" class="frame-nav__preview">
      <router-link :to="{ name: 'framePagePreview', params: { siteId, pageId } }">
        <UiButton is-outline is-button-icon>
          <UiIcon class="frame-nav__preview-icon" name="play" :size="20" />
        </UiButton>
      </router-link>
    </div>

    <div class="frame-nav__publication">
      <SitePublication />
    </div>
  </nav>
</template>

<script setup>
import { UiButton, UiIcon } from 'account-ui';
import AccountSettings from './account-settings.vue';
import PagesSettings from './pages-settings.vue';
import SitePublication from './site-publication.vue';
import SiteSettings from './site-settings.vue';

defineProps({
  isPreview: {
    type: Boolean,
    default: false,
  },

  siteId: {
    type: String,
    default: '',
  },

  pageId: {
    type: Number,
    default: -1,
  },
});
</script>

<style lang="postcss" scoped>
.frame-nav {
  @apply space-x-2 bg-white z-50 relative w-full mx-auto px-6 pt-3 pb-[11px] flex items-center justify-between border-b border-gray-100 text-sm;

  &__settings {
    @apply flex grow;
  }
}
</style>
