<template>
  <div ref="colorPickerReference">
    <ColorPicker
      class="color-picker"
      :visible-formats="['hex']"
      :default-format="'hex'"
      :alpha-channel="'hide'"
      :color="color"
      @color-change="updateColor"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { ColorPicker } from 'vue-accessible-color-picker';

const props = defineProps({
  color: {
    type: String,
    default: '',
  },

  isOpened: {
    type: Boolean,
    required: true,
  },

  needUpdateOnMouseUp: {
    type: Boolean,
    default: false,
  },
});

const colorPickerReference = ref(null);
const colorsArray = ref([]);
const currentColor = ref('');

const emit = defineEmits(['select-custom-color', 'close-picker']);

const updateColorOnMouseUp = async (event) => {
  colorsArray.value.splice(0, colorsArray.value.length);

  currentColor.value = event.cssColor;
  colorsArray.value.push(currentColor.value);
};

watch(
  colorsArray,
  (value) => {
    colorPickerReference.value?.addEventListener('mouseup', () => {
      emit('select-custom-color', value.at(-1));
    });
  },
  { deep: true }
);

const updateColorOnMouseMove = (event) => {
  emit('select-custom-color', event.cssColor);
};

const updateColor = (event) => {
  if (props.needUpdateOnMouseUp) {
    updateColorOnMouseUp(event);

    return;
  }

  updateColorOnMouseMove(event);
};

document.addEventListener('keydown', (event) => {
  if (props.isOpened && event.key === 'Escape') {
    emit('close-picker');
  }
});
</script>

<style lang="postcss">
.color-picker {
  &.vacp-color-picker {
    @apply p-0 rounded-2xl text-xs text-gray-700;

    --vacp-focus-outline: none;
    --vacp-focus-color: transparent;
    --vacp-border-color: #e5e7eb;
    --vacp-border-width: 0px;
    --vacp-border: none;

    grid-gap: 0;
    font-family: inherit;

    .vacp-color-space-thumb {
      --vacp-thumb-size: 12px;
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2);
      border: 2px solid #fff;
    }

    .vacp-range-input-group {
      padding: 12px 17px 12px 12px;
    }

    .vacp-range-input-label {
      --vacp-slider-track-height: 12px;
    }

    .vacp-range-input-label-text {
      @apply hidden;
    }

    .vacp-range-input {
      @apply h-3 rounded-[10px] border-[0.5px] border-black/[.2] m-0 border-solid;
    }

    .vacp-range-input::-webkit-slider-thumb {
      --vacp-slider-track-height: 12px;

      box-sizing: border-box;
      margin-top: 0;
      border: 2px solid #fff;
      border-radius: 50%;
      background-color: transparent;
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2);
      isolation: auto;
    }

    .vacp-range-input::-webkit-slider-runnable-track {
      --vacp-slider-track-height: 12px;

      box-sizing: border-box;
      border: 0.5px solid #e5e7eb;
      border-radius: 10px;
    }

    .vacp-copy-button {
      @apply w-8 h-8 mr-3 mt-3 mb-3;
    }

    .vacp-icon {
      @apply w-4 h-4;
    }

    .vacp-color-input-group {
      @apply block p-3 pt-0;
    }

    .vacp-color-input-label-text {
      @apply hidden;
    }

    .vacp-color-input {
      @apply form-input py-[7px] px-[15px] mb-3 block w-full bg-gray-50 border border-solid border-gray-200 max-h-10 rounded-lg text-sm text-gray-700 leading-4 transition duration-100;

      &:hover {
        @apply border-white ring-1 ring-offset-0 ring-blue-500 border-blue-500;
      }

      &:focus {
        @apply border-blue-500 outline-none ring-1 bg-white;
      }
    }
  }
}
</style>
