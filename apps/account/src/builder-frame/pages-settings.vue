<template>
  <div class="pages-settings">
    <div class="pages-settings__main">
      <div
        class="pages-settings__dropdown hs-dropdown [--auto-close:inside] [--strategy:absolute] [--adaptive:none]"
      >
        <div class="pages-settings__toggle">
          <UiIcon :name="currentPage.main ? 'home' : 'jpg'" :size="16" />
          <span v-if="currentPage?.title">{{ currentPage?.title }}</span>
          <UiIcon name="chevron-m-down" :size="16" />
        </div>

        <UiDropdown class="pages-settings__menu divide-y divide-gray-100">
          <div class="pages-settings__section">
            <div class="pages-settings__head">
              <div class="pages-settings__head-title">Страницы</div>
              <div class="pages-settings__head-button">
                <UiButton is-outline is-button-icon size="small" @click="createPage">
                  <UiIcon name="add" :size="16" />
                </UiButton>
              </div>
            </div>
            <div class="pages-settings__current-page">
              {{ currentPage?.title }}
            </div>
          </div>
          <div
            class="pages-settings__section"
            :class="{ '_with-scroll custom-scrollbar': needScroll }"
          >
            <div v-for="(page, index) in currentPagesList" :key="index" ref="pagesListReference">
              <router-link
                v-slot="{ href, navigate, route, isExactActive }"
                custom
                :to="{ name: 'frame', params: { siteId: currentSite.id, pageId: page.id } }"
              >
                <a
                  :href="href"
                  class="pages-settings__menu-item pages-settings__menu-item_page"
                  :class="[
                    !page.active && 'pages-settings__menu-item_inactivated',
                    isExactActive && 'pages-settings__menu-item_active',
                  ]"
                  @click="setCurrentPageData(navigate, route, page.id, $event)"
                >
                  <div class="pages-settings__page-item">
                    <UiIcon
                      class="pages-settings__page-icon"
                      :name="page.main ? 'home' : 'jpg'"
                      :size="16"
                    />

                    <input
                      :ref="(el) => (pageInputReference = el)"
                      v-model="page.title"
                      class="pages-settings__page-input"
                      :class="{ 'pages-settings__page-input_visible': index === needPageInput }"
                      type="text"
                      placeholder="Страница"
                      maxlength="150"
                      @blur="onPageInputBlur(page.id, page.title)"
                      @keyup.enter="onPageInputBlur(page.id, page.title)"
                    />

                    <UiButton
                      class="pages-settings__page-visibility"
                      :class="{ 'pages-settings__page-visibility_hidden': index === needPageInput }"
                      is-ghost
                      is-button-icon
                      size="small"
                      @click="setPageVisibility(page.id, !page.active)"
                    >
                      <UiIcon :name="page.active ? 'eye-opened' : 'eye-closed'" :size="14" />
                    </UiButton>

                    <div
                      :ref="(el) => (pageControlsReference = el)"
                      class="hs-dropdown pages-settings__page-controls relative inline-flex [--placement:right-top] [--strategy:absolute]"
                    >
                      <UiButton
                        :id="`page-options-${page.id}`"
                        class="hs-dropdown-toggle pages-settings__page-toggle"
                        :class="{ 'pages-settings__page-toggle_hidden': index === needPageInput }"
                        is-ghost
                        is-button-icon
                        size="small"
                      >
                        <UiIcon name="more" :size="16" />
                      </UiButton>

                      <UiDropdown
                        class="pages-settings__controls-dropdown divide-y divide-gray-100"
                        :aria-labelledby="`page-options-${page.id}`"
                      >
                        <div class="pages-settings__controls-section">
                          <router-link
                            :to="{ name: 'siteConfigurationPage', params: { pageId: page.id } }"
                          >
                            <button type="button" class="ui-dropdown-link">
                              <UiIcon name="settings" :size="16" />
                              <span>Настройки</span>
                            </button>
                          </router-link>
                        </div>
                        <div class="pages-settings__controls-section">
                          <button
                            type="button"
                            class="ui-dropdown-link"
                            @click="makeMainPage(page.id)"
                          >
                            <UiIcon name="home" :size="16" />
                            Сделать главной
                          </button>
                          <button
                            type="button"
                            class="ui-dropdown-link"
                            @click="renamePage(index, page.title)"
                          >
                            <UiIcon name="edit" :size="16" />
                            Переименовать
                          </button>
                          <!--                          <button-->
                          <!--                            type="button"-->
                          <!--                            class="ui-dropdown-link"-->
                          <!--                            @click="duplicatePage(page.id)"-->
                          <!--                          >-->
                          <!--                            <UiIcon name="copy" :size="16" />-->
                          <!--                            Дублировать-->
                          <!--                          </button>-->
                        </div>

                        <div class="pages-settings__controls-section">
                          <button
                            type="button"
                            class="ui-dropdown-link"
                            :class="{ _disabled: currentPagesList.length === 1 }"
                            @click="handleOpenDeletionModal(page)"
                          >
                            <UiIcon name="trash-delete" :size="16" />
                            Удалить
                          </button>
                        </div>
                      </UiDropdown>
                    </div>
                  </div>
                </a>
              </router-link>
            </div>
          </div>
        </UiDropdown>
      </div>
    </div>
    <div class="pages-settings__site">
      <div class="pages-settings__site-logo">
        <MediaImage
          v-if="currentSite?.favicon"
          :path="currentSite.favicon"
          :size="config.resize.pageSettings.favicon"
          :alt="`${currentSite.name} фавикон`"
        />
        <UiSvg v-else name="image" class="w-full h-full mx-auto" />
      </div>
      <DomainLink
        class="pages-settings__site-link"
        :domain-free="currentSite.domainFree"
        :domain="currentSite.domain"
      />
    </div>
  </div>
</template>

<script setup>
import DomainLink from 'account/src/components/domain-link.vue';
import MediaImage from 'account/src/components/media/media-image.vue';
import config from 'account/src/config/config.js';
import { callDeletePageModal } from 'account/src/utility/modals/delete-page-modal';
import { UiButton, UiDropdown, UiIcon, UiSvg } from 'account-ui';
import { storeToRefs } from 'pinia';
import { ref, computed, watch, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { useBuilderFrameStore } from './store/builder-frame-store.js';
import { usePageConfigurationStore } from '../site-configuration/stores/page-configuration-store.js';
import { useSiteConfigurationStore } from '../site-configuration/stores/site-configuration-store.js';

const builderFrameStore = useBuilderFrameStore();

const siteConfigurationStore = useSiteConfigurationStore();
const { currentSite, currentPagesList } = storeToRefs(siteConfigurationStore);

const pageConfigurationStore = usePageConfigurationStore();
const { currentPage } = storeToRefs(pageConfigurationStore);

const currentRoute = useRoute();

const pagesListReference = ref([]);
const pageInputReference = ref(null);
const needPageInput = ref(false);
const pageControlsReference = ref(null);

const renamePage = (index, title) => {
  needPageInput.value = index;

  pagesListReference.value.map((page, pageIndex) => {
    if (index === pageIndex) {
      const input = page.querySelector('input');
      input.focus();
      input.setSelectionRange(0, title?.length);
    }
  });
};

const createPage = async () => await pageConfigurationStore.createPageRequest();
const deletePage = async (pageId) => await pageConfigurationStore.deletePageRequest(pageId);
// TODO Disabled at this task - https://jira.runity.ru/browse/REGSOLUT-806
// const duplicatePage = async (pageId) => await pageConfigurationStore.duplicatePageRequest(pageId);
const makeMainPage = async (pageId) => await pageConfigurationStore.makeMain(pageId);
const setPageVisibility = async (pageId, isPageActive) =>
  await pageConfigurationStore.setPageVisibility(pageId, isPageActive);

const onPageInputBlur = async (id, title) => {
  needPageInput.value = false;

  await pageConfigurationStore.updatePageData(id, { title });
};

const handleOpenDeletionModal = (page) =>
  callDeletePageModal(() => deletePage(page.id), page?.title);

async function setCurrentPageData(navigate, route, pageId, event) {
  event.preventDefault();

  if (route.params.pageId !== currentRoute.params.pageId) {
    builderFrameStore.setCurrentPageData(pageId);

    navigate(route);
  }
}

const needScroll = computed(() => currentPagesList.value.length > 7);

watch(
  pageControlsReference,
  (dropdown) => {
    if (!dropdown && !needScroll.value) {
      return;
    }

    dropdown.addEventListener('open.hs.dropdown', () => {
      const activePage = pagesListReference.value.find((item) => {
        return item.querySelector('.pages-settings__menu-item_active');
      });

      nextTick(() => activePage.scrollIntoView({ block: 'start', behavior: 'smooth' }));
    });
  },
  { deep: true }
);
</script>

<style lang="postcss" scoped>
.pages-settings {
  @apply flex items-center max-w-[325px] px-4 border border-gray-200 rounded-lg text-sm leading-6 shadow-sm;

  &__main {
    @apply pr-3 py-[7px];
  }

  &__dropdown {
    @apply relative h-6;
  }

  &__toggle {
    @apply flex items-center cursor-pointer h-6;

    span {
      @apply mr-1 ml-1.5 block max-w-[123px] truncate;
    }

    svg + svg {
      @apply ml-1.5;
    }
  }

  &__site {
    @apply flex items-center pl-3 py-[7px] border-l border-gray-200;

    &-logo {
      @apply w-6 h-6 rounded-full overflow-hidden flex-none bg-gray-50;

      img {
        @apply w-full h-full object-cover;
      }
    }

    &-link {
      @apply max-w-[120px] truncate ml-2;
    }
  }

  &__menu {
    @apply w-[236px] top-[38px] left-[-12px];

    &-item {
      @apply block text-gray-700 text-sm leading-6 py-2 px-4 rounded-lg;

      &:hover {
        @apply bg-blue-50 text-blue-600;
      }

      &_active {
        @apply bg-blue-100 text-blue-600;

        &:hover {
          @apply bg-blue-100;
        }
      }

      &_page {
        @apply py-0 pl-4 pr-2;
      }

      :deep(svg) {
        @apply text-[inherit];
      }
    }
  }

  &__section {
    @apply py-2;

    &:first-child {
      @apply pt-0;
    }

    &:last-child {
      @apply pb-0 max-h-[224px];
    }

    &._with-scroll {
      @apply overflow-y-scroll overflow-x-hidden ml-[-8px] mr-[-14px] px-2;
    }
  }

  &__head {
    @apply flex justify-between items-center;

    &-title {
      @apply text-gray-400 text-xs pl-4;
    }
  }

  &__current-page {
    @apply text-sm leading-6 py-1 px-4;
  }

  &__page-item {
    @apply flex items-center justify-between;

    :deep(.ui-button) {
      @apply rounded-none;
    }
  }

  &__page-icon {
    @apply text-gray-500 flex-none mr-1;

    .pages-settings__menu-item_inactivated & {
      @apply text-gray-300;
    }
  }

  &__page-input {
    @apply w-full mr-1 text-[13px] leading-4 py-[7px] px-[11px] rounded border border-transparent pointer-events-none bg-[inherit] outline-none;

    &_visible {
      @apply bg-gray-50 border-gray-200 pointer-events-auto;

      &:focus {
        @apply border-blue-500 outline-none ring-1 ring-blue-500 bg-white;
      }

      &::placeholder {
        @apply text-gray-400;
      }
    }

    .pages-settings__menu-item_inactivated & {
      @apply text-gray-300;
    }
  }

  &__page-visibility {
    @apply hidden w-8 text-blue-600;

    &:hover {
      @apply bg-blue-100;
    }

    .pages-settings__menu-item:hover & {
      @apply flex;

      &_hidden {
        @apply hidden;
      }
    }

    .pages-settings__menu-item_inactivated & {
      @apply text-gray-300;
    }

    &:has(+ .open) {
      @apply flex;
    }

    &_hidden {
      @apply hidden;
    }
  }

  &__page-controls {
    @apply hidden text-blue-600;

    .pages-settings__menu-item:hover &,
    &.open {
      @apply flex;
    }

    &:not(.open) {
      .pages-settings__controls-dropdown {
        @apply z-[-1] pointer-events-none hidden;
      }
    }
  }

  &__controls-dropdown {
    @apply w-[193px] top-0 left-full translate-y-[-4px] translate-x-2;

    ._with-scroll & {
      @apply top-9 left-auto right-0 w-[218px];
    }
  }

  &__controls-section {
    @apply py-2;

    &:first-child {
      @apply pt-0;
    }

    &:last-child {
      @apply pb-0;
    }
  }

  &__page-toggle {
    @apply text-blue-600;

    &:hover {
      @apply bg-blue-100;
    }

    .pages-settings__menu-item_inactivated & {
      @apply text-gray-300;
    }

    &_hidden {
      @apply hidden;
    }
  }
}
</style>
