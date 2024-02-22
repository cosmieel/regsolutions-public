<template>
  <div class="site-publication hs-dropdown [--strategy:absolute] [--adaptive:none]">
    <UiButton> Опубликовать </UiButton>

    <UiDropdown
      class="site-publication__menu"
      :class="{ 'site-publication__menu_has-subscription': siteSubscription?.active }"
    >
      <div class="site-publication__title">Публикация</div>

      <div class="site-publication__site">
        <span>{{ currentSite.domain }}</span>
        <a :href="`https://${currentSite.domain}`" target="_blank" rel="noreferrer noopener">
          <UiButton is-ghost is-button-icon size="small">
            <UiIcon name="arrow-right-up" :size="14" />
          </UiButton>
        </a>
      </div>

      <div class="site-publication__publish">
        <UiButton
          size="small"
          :disabled="(!isAdmin && !hasSubscription) || isPublishPending"
          :pending="isPublishPending"
          @click="publishSite"
        >
          Опубликовать
        </UiButton>
      </div>
      <div v-if="!isAdmin && !hasSubscription" class="site-publication__notify">
        <div class="site-publication__notify-wrapper">
          <div class="site-publication__notify-icon">
            <UiIcon name="warning-filled" :size="20" />
          </div>
          <div class="site-publication__notify-content">
            <div class="site-publication__notify-main">
              <div class="site-publication__notify-text">
                <div class="site-publication__notify-title">Тариф не подключен</div>
                <div class="site-publication__notify-description">
                  Подключите тариф, чтобы опубликовать сайт
                </div>
              </div>

              <div class="site-publication__notify-button">
                <router-link :to="{ name: 'siteConfigurationSubscriptions' }">
                  <UiButton is-ghost-white size="small">Подключить</UiButton>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="site-publication__unpublished">
        <div class="site-publication__unpublished-title">
          Неопубликованые изменения ({{ countOfChanges }})
        </div>
      </div>
    </UiDropdown>
  </div>
</template>

<script setup>
import { IS_ADMIN_PROVIDE_KEY } from 'account/src/app-provider/constants';
import { UiButton, UiDropdown, UiIcon } from 'account-ui';
import { storeToRefs } from 'pinia';
import { computed, inject, ref } from 'vue';
import { useSiteConfigurationStore } from '../site-configuration/stores/site-configuration-store.js';
import { useSubscriptionsConfigurationStore } from '../site-configuration/stores/subscriptions-configuration-store.js';

const siteConfigurationStore = useSiteConfigurationStore();
const { currentSite } = storeToRefs(siteConfigurationStore);

const subscriptionsConfigurationStore = useSubscriptionsConfigurationStore();
const { siteSubscription } = storeToRefs(subscriptionsConfigurationStore);

const isAdmin = inject(IS_ADMIN_PROVIDE_KEY);

const isPublishPending = ref(false);

const publishSite = async () => {
  isPublishPending.value = true;
  await siteConfigurationStore.publishSite();
  isPublishPending.value = false;
};

const countOfChanges = computed(() => siteConfigurationStore?.currentSite?.changes);

const hasSubscription = computed(() => {
  return Object.keys(siteSubscription.value).length > 0;
});
</script>

<style lang="postcss" scoped>
.site-publication {
  @apply relative;

  &__menu {
    @apply w-[400px] top-full right-0 translate-y-[7px] pt-4 pb-3 px-6 space-y-2;

    &_has-subscription {
      @apply w-[283px];
    }
  }

  &__title {
    @apply text-xs text-gray-400;
  }

  &__site {
    @apply flex justify-between items-center;

    span {
      @apply truncate;
    }
  }

  &__notify {
    @apply bg-blue-500 text-white rounded-2xl p-4;

    &-wrapper {
      @apply flex items-center justify-start;
    }

    &-icon {
      svg {
        @apply flex-none;
      }
    }

    &-content {
      @apply pl-4;
    }

    &-main {
      @apply flex items-center justify-between;
    }

    &-text {
      @apply text-sm leading-6;
    }

    &-button {
      @apply ml-4;
    }

    &-description {
      @apply text-xs text-blue-200;
    }
  }

  &__unpublished {
    &-title {
      @apply text-xs text-gray-400 py-2;
    }
  }
}
</style>
