<template>
  <div v-if="isLoading">Загрузка...</div>
  <div v-else-if="isError">Произошла ошибка: {{ error }}</div>
  <section v-else-if="currentSite" class="site-config-menu-wrap">
    <aside
      ref="siteConfigMenuReference"
      class="site-config-menu"
      :class="{
        '_with-scroll': needScroll,
        'custom-scrollbar': isCustomScrollbar,
      }"
      :style="`top: -${menuScrollTopCurrent}px`"
      @scroll="onMenuScroll"
    >
      <section class="site-config-menu__head">
        <router-link
          :to="{ name: 'frame', params: { siteId, pageId: currentPagesList?.[0]?.id || '-1' } }"
        >
          <UiButton is-outline is-button-icon size="small">
            <UiIcon name="arrow-back" :size="14" />
            <span class="ml-2">Назад</span>
          </UiButton>
        </router-link>
        <div class="site-config-menu__head-inner">
          <div class="site-config-menu__logo">
            <MediaImage
              v-if="currentSite.favicon"
              :path="currentSite.favicon"
              :alt="`${currentSite.name} фавикон`"
              :size="config.resize.favicon"
            />
            <UiSvg v-else name="image" class="w-full h-full mx-auto" />
          </div>
          <div class="site-config-menu__info">
            <div class="site-config-menu__title">
              <span>{{ currentSite.name }}</span>
            </div>
            <a
              :href="`https://${currentSite.domain}`"
              class="site-config-menu__link"
              target="_blank"
              rel="noreferrer noopener"
            >
              <span>{{ currentSite.domain }}</span>
            </a>
          </div>
        </div>
      </section>

      <section class="site-config-menu__controls">
        <UiButton
          class="site-config-menu__controls-publish"
          size="small"
          :disabled="isPublishPending"
          :pending="isPublishPending"
          @click="publishSite"
        >
          Опубликовать
        </UiButton>

        <div
          ref="siteControlsReference"
          class="hs-dropdown site-config-menu__controls-options relative inline-flex [--placement:right-top] [--strategy:absolute]"
        >
          <UiButton
            id="site-config-menu-options"
            class="hs-dropdown-toggle site-config-menu__controls-toggle"
            size="small"
            is-button-icon
            is-outline
          >
            <UiIcon name="more" :size="16" />
          </UiButton>

          <UiDropdown
            class="site-config-menu__controls-dropdown divide-y divide-gray-100"
            aria-labelledby="site-config-menu-options"
          >
            <div class="site-config-menu__controls-section">
              <router-link
                :class="{ 'pointer-events-none': !pagesListNotEmpty }"
                :to="{
                  name: 'framePagePreview',
                  params: { siteId, pageId: currentPagesList?.[0]?.id || '-1' },
                }"
              >
                <button
                  :disabled="!pagesListNotEmpty"
                  type="button"
                  class="ui-dropdown-link"
                  :class="{ _disabled: !pagesListNotEmpty }"
                >
                  <UiIcon name="play" :size="16" />
                  Предпросмотр
                </button>
              </router-link>

              <!-- <div
                class="hs-dropdown site-config-menu__controls-options site-config-menu__controls-suboptions relative inline-flex [--placement:right-top] [--strategy:absolute]"
              >
                <button
                  type="button"
                  class="ui-dropdown-link site-config-menu__controls-subtoggle"
                >
                  Последние публикации
                  <UiIcon name="chevron-m-right" />
                </button>

                <UiDropdown
                  class="site-config-menu__controls-dropdown site-config-menu__controls-subdropdown divide-y divide-gray-100"
                >
                  <div class="sites-item__options-section">
                    <button
                      type="button"
                      class="ui-dropdown-link"
                    >3ч назад</button>
                  </div>

                  <div class="site-config-menu__controls-section">
                    <button
                      type="button"
                      class="ui-dropdown-link"
                    >12.12.2023</button>
                    <button
                      type="button"
                      class="ui-dropdown-link"
                    >12.12.2023</button>
                    <button
                      type="button"
                      class="ui-dropdown-link"
                    >12.12.2023</button>
                  </div>
                </UiDropdown>
              </div> -->
            </div>

            <div class="site-config-menu__controls-section">
              <button
                type="button"
                class="ui-dropdown-link"
                :class="{ _disabled: !currentSite.published }"
                @click="handleUnPublishSite"
              >
                Снять с публикации
              </button>
            </div>
          </UiDropdown>
        </div>
      </section>

      <section class="site-config-menu__menu">
        <section class="site-config-menu__menu-section">
          <div class="site-config-menu__menu-title">Настройки сайта</div>

          <router-link
            class="site-config-menu__menu-item"
            :to="{ name: 'siteConfigurationBasic' }"
            :exact-active-class="'site-config-menu__menu-item_active'"
          >
            Основные
          </router-link>
          <router-link
            class="site-config-menu__menu-item"
            :to="{ name: 'siteConfigurationDomain' }"
            :exact-active-class="'site-config-menu__menu-item_active'"
          >
            Домен
          </router-link>
          <router-link
            v-if="!isAdmin"
            class="site-config-menu__menu-item"
            :to="{ name: 'siteConfigurationSubscriptions' }"
            :exact-active-class="'site-config-menu__menu-item_active'"
          >
            Тариф
          </router-link>
          <router-link
            class="site-config-menu__menu-item"
            :to="{ name: 'siteConfigurationCart' }"
            :exact-active-class="'site-config-menu__menu-item_active'"
          >
            Корзина
          </router-link>
          <router-link
            class="site-config-menu__menu-item"
            :to="{ name: 'siteConfigurationCatalogs' }"
            :exact-active-class="'site-config-menu__menu-item_active'"
          >
            Каталоги и товары
          </router-link>
          <!-- <router-link
            class="site-config-menu__menu-item"
            :to="{ name: 'siteConfigurationAnalytics' }"
            :exact-active-class="'site-config-menu__menu-item_active'"
          >
            Статистика
          </router-link> -->
        </section>

        <section v-if="currentPagesList.length > 0" class="site-config-menu__menu-section">
          <div class="site-config-menu__menu-title">Страницы</div>

          <div v-for="(page, index) in currentPagesList" :key="index" ref="pagesListReference">
            <router-link
              class="site-config-menu__menu-item site-config-menu__menu-item_page"
              :class="{ 'site-config-menu__menu-item_inactivated': !page.active }"
              :to="{ name: 'siteConfigurationPage', params: { pageId: page.id } }"
              :exact-active-class="'site-config-menu__menu-item_active'"
            >
              <div class="site-config-menu__page-item">
                <UiIcon
                  class="site-config-menu__page-icon"
                  :name="page.main ? 'home' : 'jpg'"
                  :size="16"
                />

                <input
                  :ref="(el) => (pageInputReference = el)"
                  v-model.trim="page.title"
                  class="site-config-menu__page-input"
                  :class="{ 'site-config-menu__page-input_visible': index === needPageInput }"
                  type="text"
                  placeholder="Страница"
                  maxlength="150"
                  @blur="onPageInputBlur(page.id, page.title)"
                  @keyup.enter="onPageInputBlur(page.id, page.title)"
                />

                <UiButton
                  class="site-config-menu__page-visibility"
                  :class="{ 'site-config-menu__page-visibility_hidden': index === needPageInput }"
                  is-ghost
                  is-button-icon
                  size="small"
                  @click="setPageVisibility(page.id, !page.active)"
                >
                  <UiIcon :name="page.active ? 'eye-opened' : 'eye-closed'" :size="14" />
                </UiButton>

                <div
                  :ref="(el) => (pageControlsReference = el)"
                  class="hs-dropdown site-config-menu__page-controls relative inline-flex [--placement:right-top] [--strategy:absolute]"
                >
                  <UiButton
                    :id="`page-options-${page.id}`"
                    class="hs-dropdown-toggle site-config-menu__page-toggle"
                    :class="{ 'site-config-menu__page-toggle_hidden': index === needPageInput }"
                    is-ghost
                    is-button-icon
                    size="small"
                  >
                    <UiIcon name="more" :size="16" />
                  </UiButton>

                  <UiDropdown
                    class="site-config-menu__controls-dropdown divide-y divide-gray-100"
                    :aria-labelledby="`page-options-${page.id}`"
                  >
                    <div class="site-config-menu__controls-section">
                      <button type="button" class="ui-dropdown-link" @click="makeMainPage(page.id)">
                        <UiIcon name="home" :size="16" />
                        Сделать главной
                      </button>
                      <!--                      <button-->
                      <!--                        type="button"-->
                      <!--                        class="ui-dropdown-link"-->
                      <!--                        @click="duplicatePage(page.id)"-->
                      <!--                      >-->
                      <!--                        <UiIcon name="copy" :size="16" />-->
                      <!--                        Дублировать-->
                      <!--                      </button>-->
                      <button
                        type="button"
                        class="ui-dropdown-link"
                        @click="renamePage(index, page.title)"
                      >
                        <UiIcon name="edit" :size="16" />
                        Переименовать
                      </button>
                    </div>

                    <div class="site-config-menu__controls-section">
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
            </router-link>
          </div>
        </section>
      </section>
    </aside>

    <teleport to="#user-account-alerts-wrapper">
      <UiError
        v-if="subscriptionNotExistsErrorMessage"
        :error-text="'Тариф не подключен'"
        :error-description="'Подключите тариф, чтобы опубликовать сайт'"
        @close="closeSubscriptionNotExistsErrorMessage"
      >
        <router-link :to="{ name: 'siteConfigurationSubscriptions' }">
          <UiButton is-ghost-white>Подключить</UiButton>
        </router-link>
      </UiError>
    </teleport>
  </section>
</template>

<script setup>
import { IS_ADMIN_PROVIDE_KEY } from 'account/src/app-provider/constants';
import MediaImage from 'account/src/components/media/media-image.vue';
import config from 'account/src/config/config.js';
import { callDeletePageModal } from 'account/src/utility/modals/delete-page-modal';
import { callUnPublishSiteModal } from 'account/src/utility/modals/un-publish-site-modal';
import { UiButton, UiDropdown, UiError, UiIcon, UiSvg } from 'account-ui';
import { isCustomScrollbar } from 'account-ui/src/components/ui-tags/utility/is-custom-scrollbar.js';
import { storeToRefs } from 'pinia';
import { computed, inject, ref, watch } from 'vue';
import { useUserSitesStore } from '../../user-sites/stores/user-sites-store.js';
import { usePageConfigurationStore } from '../stores/page-configuration-store.js';
import { useSiteConfigurationStore } from '../stores/site-configuration-store.js';

const userSitesStore = useUserSitesStore();
const { subscriptionNotExistsErrorMessage } = storeToRefs(userSitesStore);

const siteConfigurationStore = useSiteConfigurationStore();
const { currentSite, currentPagesList, isLoading, isError, error, siteId } =
  storeToRefs(siteConfigurationStore);

const pageConfigurationStore = usePageConfigurationStore();

const isAdmin = inject(IS_ADMIN_PROVIDE_KEY);

const isPublishPending = ref(false);

const publishSite = async () => {
  isPublishPending.value = true;
  await siteConfigurationStore.publishSite();
  isPublishPending.value = false;
};

const handleUnPublishSite = async () =>
  currentSite.value.published &&
  callUnPublishSiteModal(async () => await siteConfigurationStore.unpublishSite());

const siteConfigMenuReference = ref(null);
const menuScrollTop = ref(0);
const menuScrollTopCurrent = ref(0);

const siteControlsReference = ref(null);
const pageControlsReference = ref(null);
const needScroll = ref(true);

watch(siteControlsReference, (dropdown) => {
  dropdown.addEventListener('open.hs.dropdown', () => disableScroll());
  dropdown.addEventListener('close.hs.dropdown', () => enableScroll());
});

watch(
  pageControlsReference,
  (dropdown) => {
    if (!dropdown) {
      return;
    }

    dropdown.addEventListener('open.hs.dropdown', () => disableScroll());
    dropdown.addEventListener('close.hs.dropdown', () => enableScroll());
  },
  { deep: true }
);

const handleOpenDeletionModal = (page) =>
  callDeletePageModal(() => deletePage(page.id), page?.title);

const enableScroll = () => {
  needScroll.value = true;
  menuScrollTopCurrent.value = 0;
};
const disableScroll = () => {
  needScroll.value = false;
  menuScrollTopCurrent.value = menuScrollTop.value;
};

const onMenuScroll = (event) => {
  menuScrollTop.value = event.target.scrollTop;
};

const pagesListReference = ref([]);
const pageInputReference = ref(null);
const needPageInput = ref(false);

const renamePage = (index, title) => {
  needPageInput.value = index;

  pagesListReference.value.map((page, pageIndex) => {
    if (index === pageIndex) {
      const input = page.querySelector('input.site-config-menu__page-input');
      input.focus();
      input.setSelectionRange(0, title?.length);
    }
  });
};

const pagesListNotEmpty = computed(() => currentPagesList.value.length > 0);

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

const closeSubscriptionNotExistsErrorMessage = () => {
  userSitesStore.clearSubscriptionNotExistsError();
};
</script>

<style lang="postcss" scoped>
.site-config-menu {
  --header-height: 64px;
  @apply bg-white border-r border-gray-100 w-[232px] h-[calc(100%-var(--header-height))] fixed top-0 left-0 mt-[--header-height] px-2 pt-6 pb-8 z-40;

  .ui-dropdown-link {
    &:disabled {
      opacity: 0.5;
    }
  }

  &._with-scroll {
    @apply overflow-auto;

    scrollbar-gutter: stable;

    &.custom-scrollbar {
      @apply pr-0.5;
    }
  }

  &-wrap {
    @apply w-[232px] bg-white border-r border-gray-200;
  }

  &__head {
    @apply flex pb-4 px-4 flex-col gap-6;

    &-inner {
      @apply flex;
    }
  }

  &__logo {
    @apply w-12 h-12 rounded-lg overflow-hidden flex-none bg-white border border-gray-100 p-[11px];

    img {
      @apply w-full h-full object-cover;
    }
  }

  &__info {
    @apply pl-4;
  }

  &__title {
    @apply text-sm text-gray-700 font-medium leading-6 max-w-[120px] truncate;
  }

  &__link {
    @apply block text-sm text-blue-600 leading-6 decoration-0 underline-offset-2 max-w-[120px] truncate;

    &:hover {
      @apply decoration-1 underline;
    }

    &:focus,
    &:active {
      @apply no-underline;
    }
  }

  &__controls {
    @apply flex space-x-2 px-4;

    &-toggle {
      @apply flex-none;

      svg {
        @apply flex-none;
      }
    }

    &-dropdown {
      @apply w-[264px];
    }

    &-section {
      @apply py-2;

      &:first-child {
        @apply pt-0;
      }

      &:last-child {
        @apply pb-0;
      }
    }

    &-options {
      @apply relative;
    }

    &-suboptions {
      @apply w-full;

      &.open {
        .ui-dropdown-link.site-config-menu__controls-subtoggle {
          @apply bg-blue-50;
        }
      }
    }

    &-subtoggle {
      @apply flex justify-between items-center;
    }

    &-subdropdown {
      @apply w-[160px];
    }
  }

  &__menu {
    @apply divide-y divide-gray-100 pt-4;

    &-section {
      @apply py-6 px-2;

      &:first-child {
        @apply pt-0;
      }

      &:last-child {
        @apply pb-0;
      }
    }

    &-title {
      @apply text-gray-400 text-xs py-2 px-4;
    }

    &-item {
      @apply block text-gray-700 text-sm leading-6 py-1 px-4 rounded-lg;

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

  &__page-item {
    @apply flex items-center justify-between;

    :deep(.ui-button) {
      @apply rounded-none;
    }
  }

  &__page-icon {
    @apply text-gray-700 flex-none mr-1;

    .site-config-menu__menu-item_inactivated & {
      @apply text-gray-300;
    }
  }

  &__page-input {
    @apply w-full mr-1 text-sm leading-6 py-[3px] px-[7px] rounded border border-transparent pointer-events-none bg-[inherit] outline-none;

    &_visible {
      @apply bg-gray-50 border-gray-200 pointer-events-auto;

      &:focus {
        @apply text-gray-700 border-blue-500 outline-none ring-1 ring-blue-500 bg-white;
      }

      &::placeholder {
        @apply text-gray-400;
      }
    }

    .site-config-menu__menu-item_inactivated & {
      @apply text-gray-300;
    }
  }

  &__page-visibility {
    @apply hidden w-8 text-blue-600;

    &:hover {
      @apply bg-blue-100;
    }

    .site-config-menu__menu-item:hover & {
      @apply flex;

      &_hidden {
        @apply hidden;
      }
    }

    .site-config-menu__menu-item_inactivated & {
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
    @apply hidden relative text-blue-600;

    .site-config-menu__menu-item:hover &,
    &.open {
      @apply flex;
    }

    &:not(.open) {
      .site-config-menu__controls-dropdown {
        @apply !transform-none sr-only;
      }
    }
  }

  &__page-toggle {
    @apply text-blue-600;

    &:hover {
      @apply bg-blue-100;
    }
    .site-config-menu__menu-item_inactivated & {
      @apply text-gray-300;
    }

    &_hidden {
      @apply hidden;
    }
  }
}
</style>
