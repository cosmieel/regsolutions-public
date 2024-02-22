<template>
  <div class="sites-item">
    <router-link
      class="sites-item__link"
      :to="{ name: 'frame', params: { siteId, pageId: mainPageId } }"
    >
      <div class="sites-item__logo-wrap">
        <div class="sites-item__badges">
          <UiBadge
            is-outline
            :black="!siteData.published"
            :icon="siteData.published ? 'circle-checkmark' : ''"
          >
            {{ siteData.published ? 'Опубликован' : 'Не опубликован' }}
          </UiBadge>
        </div>

        <div class="sites-item__logo">
          <MediaImage
            v-if="siteData.logo"
            :path="siteData.logo"
            :size="config.resize.logo"
            :alt="`${siteData.name} logo`"
          />
          <UiSvg v-else name="image" class="w-[57px] h-10" />
        </div>
      </div>
    </router-link>

    <div class="sites-item__main">
      <div class="sites-item__info">
        <div class="sites-item__name">
          {{ siteData.name }}
        </div>
        <DomainLink
          class="sites-item__domain"
          :domain="siteData.domain"
          :domain-free="siteData.domainFree"
        />
      </div>

      <div
        class="hs-dropdown sites-item__options relative inline-flex [--placement:right-top] [--strategy:absolute]"
      >
        <UiButton
          :id="`site-options-${siteData.id}`"
          class="hs-dropdown-toggle sites-item__options-toggle"
          is-ghost
        >
          <UiIcon name="more" :size="14" />
        </UiButton>

        <UiDropdown
          class="sites-item__options-dropdown divide-y divide-gray-100"
          :aria-labelledby="`site-options-${siteData.id}`"
        >
          <div class="sites-item__options-section">
            <button
              type="button"
              class="ui-dropdown-link_blue"
              :class="{ _disabled: isPublishPending }"
              @click="publishSite(siteData.id)"
            >
              Опубликовать сайт
            </button>
            <button
              v-if="siteData.published"
              type="button"
              class="ui-dropdown-link"
              @click="handleUnPublishSite(siteData.id)"
            >
              Снять с публикации
            </button>
          </div>
          <div class="sites-item__options-section">
            <router-link :to="{ name: 'framePagePreview', params: { siteId, pageId: mainPageId } }">
              <button type="button" class="ui-dropdown-link">
                <UiIcon name="play" :size="16" />
                Предпросмотр
              </button>
            </router-link>
            <!--            <button type="button" class="ui-dropdown-link" @click="duplicateSite">-->
            <!--              <UiIcon name="copy" :size="16" />-->
            <!--              Дублировать сайт-->
            <!--            </button>-->
            <button type="button" class="ui-dropdown-link" @click="copySiteLink">
              <UiIcon name="link" :size="16" />
              Копировать ссылку
            </button>
            <router-link :to="{ name: 'accountSiteConfiguration', params: { siteId } }">
              <button type="button" class="ui-dropdown-link">
                <UiIcon name="settings" :size="16" />
                Настройки
              </button>
            </router-link>
          </div>
          <div class="sites-item__options-section">
            <button type="button" class="ui-dropdown-link" @click="callDeleteSiteModal(deleteSite)">
              <UiIcon name="trash-delete" :size="16" />
              Удалить
            </button>
          </div>
        </UiDropdown>
      </div>
    </div>
  </div>
</template>

<script setup>
import DomainLink from 'account/src/components/domain-link.vue';
import MediaImage from 'account/src/components/media/media-image.vue';
import config from 'account/src/config/config.js';
import { notifyer } from 'account/src/instances/notifyer';
import { callDeleteSiteModal } from 'account/src/utility/modals/delete-site-modal.js';
import { UiBadge, UiButton, UiDropdown, UiIcon, UiSvg } from 'account-ui';
import { computed, ref } from 'vue';
import { callUnPublishSiteModal } from '../../utility/modals/un-publish-site-modal.js';
import { useUserSitesStore } from '../stores/user-sites-store.js';

const userSitesStore = useUserSitesStore();

const props = defineProps({
  siteData: {
    type: Object,
    required: true,
  },

  mainPageId: {
    type: Number,
    default: -1,
  },
});

const isPublishPending = ref(false);

// TODO Disabled at this task - https://jira.runity.ru/browse/REGSOLUT-806
// const duplicateSite = async () => {
//   await userSitesStore.duplicateSiteRequest(siteId.value);
// };

const deleteSite = async () => {
  await userSitesStore.deleteSiteRequest(siteId.value);
};

const publishSite = async (siteId) => {
  isPublishPending.value = true;

  try {
    await userSitesStore.publishSiteRequest(siteId);
  } finally {
    isPublishPending.value = false;
  }
};

const handleUnPublishSite = (siteId) =>
  callUnPublishSiteModal(async () => await userSitesStore.unpublishSiteRequest(siteId));

const copySiteLink = () => {
  let toastHideTimeout;

  navigator.clipboard.writeText(props.siteData.domain || props.siteData.domainFree).then(
    function () {
      notifyer.info({ message: 'Ссылка скопирована' });
    },
    function (error) {
      clearTimeout(toastHideTimeout);
      console.error('Copying error', error);
    }
  );
};

const siteId = computed(() => props.siteData.id);
</script>

<style lang="postcss" scoped>
.sites-item {
  @apply w-full flex flex-col rounded-3xl border border-gray-100 shadow-[2px_2px_4px_0px_rgba(46_64_100_/_4%)] transition;

  &:hover {
    @apply shadow-none;
  }

  &:focus-within {
    @apply ring-1 ring-blue-500;
  }

  &__link {
    @apply p-4 relative;
  }

  &__logo-wrap {
    @apply bg-gray-50 flex items-center justify-center p-2.5 h-[241px] rounded-2xl;
  }

  &__badges {
    @apply space-x-1 absolute right-3 top-3 z-10;
  }

  &__logo {
    @apply max-h-[120px];

    img {
      @apply max-h-[inherit];
    }
  }

  &__main {
    @apply px-5 pb-4 flex;
  }

  &__info {
    @apply pr-2 grow;
  }

  &__name {
    @apply text-base font-medium text-gray-700 break-all;
  }

  &__domain {
    @apply text-sm text-blue-600 leading-6;
  }

  &__options {
    @apply relative;
  }

  &__options-toggle {
    @apply w-10;

    svg {
      @apply flex-none;
    }
  }

  &__options-dropdown {
    @apply w-[224px];
  }

  &__options-section {
    @apply py-2;

    &:first-child {
      @apply pt-0;
    }

    &:last-child {
      @apply pb-0;
    }
  }
}
</style>
