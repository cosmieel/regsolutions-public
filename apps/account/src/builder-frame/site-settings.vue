<template>
  <div
    ref="siteSettingsReference"
    class="site-settings hs-dropdown [--auto-close:inside] [--strategy:absolute] [--adaptive:none]"
  >
    <UiButton is-outline is-button-icon>
      <UiIcon class="site-settings__icon" name="menu" :size="20" />
    </UiButton>

    <UiDropdown class="site-settings__menu divide-y divide-gray-100">
      <div class="site-settings__section">
        <router-link
          :to="{ name: 'accountSiteConfiguration', params: { siteId: currentSite.id } }"
          class="ui-dropdown-link"
        >
          <UiIcon name="settings" :size="16" />
          Настройки
        </router-link>
      </div>
      <div class="site-settings__section">
        <label class="file-section__input">
          <button type="button" class="ui-dropdown-link" @click="triggerFileUploading">
            <UiIcon name="sticker" :size="16" />
            Загрузить фавикон
          </button>
          <input
            ref="fileInput"
            type="file"
            class="sr-only"
            accept="image/*"
            @change="uploadFile"
          />
        </label>

        <div class="site-settings__popover">
          <button
            type="button"
            class="site-settings__popover-toggle ui-dropdown-link"
            :class="{ 'ui-dropdown-link_selected': isPickerOpened }"
            @click="openColorPicker"
          >
            <UiIcon name="pallete" :size="16" />
            <span>Подобрать цвет</span>
            <UiIcon name="chevron-m-right" :size="16" />
          </button>

          <div
            ref="colorSelector"
            class="site-settings__popover-tooltip shadow-[2px_2px_12px_0px_rgba(46_64_100_/_4%),_1px_4px_20px_0px_rgba(46_64_100_/_8%)]"
          >
            <div class="site-settings__popover-content hs-tooltip-content" role="tooltip">
              <div class="site-settings__popover-header">
                <span class="site-settings__popover-title">Выбрать цвет</span>
                <button class="site-settings__popover-close" @click="closeColorPicker">
                  <UiIcon name="close" :size="16" />
                </button>
              </div>

              <ColorPicker
                :color="currentSite?.color"
                :is-opened="isPickerOpened"
                :need-update-on-mouse-up="true"
                @select-custom-color="selectCustomColor"
                @close-picker="closeColorPicker"
              />
            </div>
          </div>
        </div>
      </div>
    </UiDropdown>
  </div>
</template>

<script setup>
import { UiButton, UiDropdown, UiIcon } from 'account-ui';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useBuilderFrameStore } from './store/builder-frame-store.js';
import ColorPicker from '../components/color-picker.vue';
import { useSiteConfigurationStore } from '../site-configuration/stores/site-configuration-store.js';

const route = useRoute();

const siteConfigurationStore = useSiteConfigurationStore();
const { currentSite } = storeToRefs(siteConfigurationStore);

const builderFrameStore = useBuilderFrameStore();

const siteSettingsReference = ref(null);

const fileInput = ref(null);

const triggerFileUploading = () => {
  fileInput.value.click();
};

const uploadFile = (event) => {
  const file = event.target?.files[0];

  const reader = new FileReader();

  if (!file || !/image.*/.test(file.type)) {
    return;
  }

  reader.readAsDataURL(file);
  reader.addEventListener('loadend', async () => {
    await siteConfigurationStore.uploadRequest('favicon', file);
    await siteConfigurationStore.updateSiteData();
  });
};

const colorSelector = ref(null);
const isPickerOpened = ref(false);

const openColorPicker = () => {
  window.HSTooltip.show(colorSelector.value);
  isPickerOpened.value = true;
};

const closeColorPicker = async () => {
  if (!colorSelector.value) {
    return;
  }

  window.HSTooltip.hide(colorSelector.value);
  isPickerOpened.value = false;

  await siteConfigurationStore.updateSiteData();
  await builderFrameStore.prepareFrameData(route.params.pageId);
};

const selectCustomColor = (hex) => {
  currentSite.value.color = hex;
};

watch(siteSettingsReference, (dropdown) => {
  dropdown.addEventListener('close.hs.dropdown', async () => {
    if (isPickerOpened.value) {
      await closeColorPicker();
    }
  });
});
</script>

<style lang="postcss" scoped>
.site-settings {
  @apply relative;

  &__menu {
    @apply w-[228px] top-full right-1/2 translate-x-1/2 translate-y-[7px];
  }

  &__section {
    @apply py-2;

    &:first-child {
      @apply pt-0;
    }

    &:last-child {
      @apply pb-0;
    }
  }

  &__popover {
    &-toggle {
      @apply flex items-center;
    }

    &-tooltip {
      @apply w-full max-w-[241px] min-w-[241px] transition-opacity inline-block absolute left-[100%] top-[-100px] translate-y-[20%] ml-[5px] invisible z-10 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 rounded-2xl;

      &.show {
        @apply visible;
      }
    }

    &-header {
      @apply flex items-center justify-between p-2 text-gray-700;
    }

    &-title {
      @apply px-3 py-2 text-xs font-medium;
    }

    &-close {
      @apply w-8 h-8 rounded-lg flex items-center justify-center;

      &:hover {
        @apply bg-gray-100;
      }
    }

    .ui-dropdown-link_selected {
      @apply bg-blue-100 text-blue-600;
    }
  }
}
</style>
