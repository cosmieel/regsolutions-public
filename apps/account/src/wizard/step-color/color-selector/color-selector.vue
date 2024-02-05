<template>
  <div class="color-selector">
    <div class="color-selector__main">
      <div class="color-selector__picker">
        <ColorPopover
          :is-palette-color-selected="isPaletteColorSelected"
          @select-custom-color="onCustomColorSelect"
        />
      </div>

      <div class="color-selector__divider"></div>

      <div class="color-selector__list">
        <ColorList
          :is-custom-color-selected="isCustomColorSelected"
          @select-color="onColorSelect"
        />
      </div>
    </div>

    <UiButton :disabled="!color" @click="submitColor">Дальше</UiButton>
  </div>
</template>

<script setup>
import { UiButton } from 'account-ui';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import ColorList from './color-list.vue';
import ColorPopover from './color-popover.vue';
import { useWizardStore } from '../../stores/wizard-store.js';

const wizardStore = useWizardStore();
const { color, isPaletteColorSelected, isCustomColorSelected } = storeToRefs(wizardStore);

const router = useRouter();

const onCustomColorSelect = (customColorHex) => {
  color.value = customColorHex;

  isPaletteColorSelected.value = false;
  isCustomColorSelected.value = true;

  localStorage.setItem('isPaletteColorSelected', isPaletteColorSelected.value);
};

const onColorSelect = (colorHex) => {
  color.value = colorHex;

  isPaletteColorSelected.value = true;
  isCustomColorSelected.value = false;

  localStorage.setItem('isPaletteColorSelected', isPaletteColorSelected.value);
};

const submitColor = async () => {
  try {
    router.push({ name: 'wizardStepDescription' });
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="postcss" scoped>
.color-selector {
  &__main {
    @apply mb-10 flex items-center p-[15px] border border-gray-200 rounded-2xl shadow-[2px_2px_4px_0px_rgba(46_64_100_/_4%)];
  }

  &__divider {
    @apply w-[1px] h-10 max-h-[37px] my-[1.5px] mx-6 bg-gray-200;
  }
}
</style>
