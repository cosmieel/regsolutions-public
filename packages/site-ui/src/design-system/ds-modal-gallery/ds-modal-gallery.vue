<template>
  <article ref="modal" class="ds-modal-gallery" @click="closeModal">
    <div ref="control" class="ds-modal-gallery__control" @click.stop="">
      <DsButton
        v-if="!breakPoint.isMobileAll"
        theme="fab"
        size="m"
        color="primary-inverse"
        icon="close"
        aria-label="Close"
        class="ds-modal-gallery__close-button"
        @click="closeModal"
      />
      <strong v-if="images[activeImage].title" class="ds-modal-gallery__title">
        {{ trimString(images[activeImage].title, 32) }}
      </strong>
      <div class="ds-modal-gallery__buttons-wrapper">
        <DsButton
          size="s"
          color="secondary-inverse"
          icon="download"
          :text="downloadText"
          @click="upload"
        />
        <DsButton size="s" color="secondary-inverse" icon="link" :text="linkText" @click="copy" />
      </div>
    </div>
    <DsImage :path="images[activeImage].url" class="ds-modal-gallery__image" />
    <div class="ds-modal-gallery__preview" @click.stop="">
      <ds-slider
        v-if="images.length > 5"
        ref="dsSliderReference"
        :items="images.length"
        :slide-active="active"
        keyboard-control
        type="gallery-modal"
        @change="setActiveSlide"
      >
        <ds-slide v-for="(image, index) in images" :key="getKey(index)">
          <div class="ds-modal-gallery__image-wrapper">
            <DsImage
              :path="image.url"
              :size="thumbnailsSizes"
              loading="lazy"
              class="ds-modal-gallery__preview-image"
              :class="{ 'ds-modal-gallery__preview-image-active': index === activeImage }"
            />
            <span v-if="index !== activeImage" class="ds-modal-gallery__layer"></span>
          </div>
        </ds-slide>
      </ds-slider>

      <ul v-else class="ds-modal-gallery__image-list" :class="classList">
        <li
          v-for="(image, index) in images"
          :key="getKey(index)"
          class="ds-modal-gallery__list-item"
          @click="activeImage = index"
        >
          <div class="ds-modal-gallery__image-wrapper">
            <DsImage
              :path="image.url"
              :size="thumbnailsSizes"
              class="ds-modal-gallery__preview-image"
              :class="{ 'ds-modal-gallery__preview-image-active': index === activeImage }"
            />
            <span v-if="index !== activeImage" class="ds-modal-gallery__layer"></span>
          </div>
        </li>
      </ul>
    </div>
  </article>
</template>

<script setup>
import { useBreakPoint } from 'site-ui/src/break-point/break-point';
import config from 'site-ui/src/configs/configs.js';
import DsButton from 'site-ui/src/design-system/ds-button/ds-button.vue';
import DsImage from 'site-ui/src/design-system/ds-image/ds-image.vue';
import { notificationManager } from 'site-ui/src/design-system/ds-notification/manager/notification-manager.js';
import DsSlide from 'site-ui/src/design-system/ds-slider/ds-slide.vue';
import DsSlider from 'site-ui/src/design-system/ds-slider/ds-slider.vue';
import { OPTIONS_KEY } from 'site-ui/src/services/constants/constants.js';
import { getSizesByCount } from 'site-ui/src/services/get-sizes-by-count/get-sizes-by-count';
import { lockBody } from 'site-ui/src/services/lock-body/lock-body.js';
import { trimString } from 'site-ui/src/services/trim-string/trim-string.js';
import { unlockBody } from 'site-ui/src/services/unlock-body/unlock-body.js';
import { onMounted, onUnmounted, onActivated, onDeactivated, ref, computed, inject } from 'vue';
import { useEscapeKey } from '../../utility/composition/use-escape-key.js';
import { useEvent } from '../../utility/composition/use-event.js';
import { downloadFile } from '../../utility/download-file.js';

const breakPoint = useBreakPoint();
const options = inject(OPTIONS_KEY);

const property = defineProps({
  images: {
    type: Array,
    required: true,
  },

  active: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(['close']);

const modal = ref();
const control = ref();
const activeImage = ref(0);
const body = document.querySelector('body');
const trigger = event.target;
const dsSliderReference = ref(null);

const thumbnailsSizes = computed(() =>
  getSizesByCount(property.images.length, 4, config.resize.gallery.modal.thumbnails.size)
);

useEscapeKey(closeModal);
useEvent('keydown', handleSpaceKey);

onMounted(() => {
  body.style.paddingRight = getScrollWidth();
  lockBody('ds-modal-gallery');

  control.value.focus();
});

onUnmounted(() => {
  body.style.paddingRight = 0;
  unlockBody('ds-modal-gallery');

  trigger.focus();
});

onActivated(() => {
  body.style.paddingRight = getScrollWidth();
  lockBody('ds-modal-gallery');

  control.value.focus();
});

onDeactivated(() => {
  body.style.paddingRight = 0;
  unlockBody('ds-modal-gallery');

  trigger.focus();
});

const getScrollWidth = () => {
  return window.innerWidth - modal.value.offsetWidth + 'px';
};

const classList = computed(() => {
  return `ds-modal-gallery__image-list_col-${property.images.length}`;
});

const downloadText = computed(() => {
  return breakPoint.isMobileAll ? '' : 'Скачать';
});

const linkText = computed(() => {
  return breakPoint.isMobileAll ? '' : 'Копировать ссылку';
});

function getKey(index) {
  return `${index}${Math.random()}`;
}

function setActiveSlide(index) {
  activeImage.value = index;
}

function copy() {
  navigator.clipboard.writeText(getMediaUrl(property.images[activeImage.value].url));

  notificationManager.add({
    type: 'info',
    autoClose: true,
    item: {
      type: 'plain',
      icon: 'checkmark',
      title: 'Ссылка скопирована',
    },
  });
}

async function upload() {
  let url = getMediaUrl(property.images[activeImage.value].url);

  await downloadFile(url);

  notificationManager.add({
    type: 'info',
    autoClose: true,
    item: {
      type: 'plain',
      icon: 'checkmark',
      title: 'Изображение скачано',
    },
  });
}

function closeModal() {
  emit('close');
}

function handleSpaceKey(event) {
  if (event.key === ' ') {
    dsSliderReference.value.goToNext();
  }
}

function getMediaUrl(url) {
  try {
    const currentUrl = new URL(url);

    if (currentUrl.origin) {
      return url;
    }
  } catch {
    return `${options.hosts.storage}${url}`;
  }

  return `${options.hosts.storage}${url}`;
}
</script>

<style lang="postcss">
@import '../../tokens/ui-tokens.css';

.ds-modal-gallery {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--bg-modal-overlay);
  backdrop-filter: $blur-s;
  z-index: $z-modal;

  &__control {
    position: relative;
    flex-shrink: 0;
    display: flex;
    height: 64px;
    align-items: center;
    padding: 8px 124px 8px 16px;

    @add-mixin desktop-all {
      justify-content: center;
      padding: 8px 16px;
    }
  }

  &__close-button {
    position: absolute;
    top: 14px;
    left: 16px;
  }

  &__title {
    color: var(--font-primary-inverse);
    font-weight: 400;
    @add-mixin b3;
  }

  &__buttons-wrapper {
    position: absolute;
    top: 8px;
    right: 16px;
    display: flex;
    gap: 12px;

    @add-mixin desktop-all {
      position: absolute;
      top: 8px;
      right: 40px;
    }
  }

  &__image {
    overflow: hidden;
    object-fit: contain;
    max-height: calc(100% - 152px);
    border-radius: $radius-m;

    @add-mixin desktop-all {
      border-radius: 0;
    }
  }

  &__preview {
    height: 96px;
    padding: 8px 16px;

    @add-mixin desktop-all {
      width: 800px;
      margin: 0 auto;
      padding: 8px 40px;
    }
  }

  &__image-wrapper {
    position: relative;
  }

  &__preview-image {
    overflow: hidden;
    width: 100%;
    height: 80px;
    object-fit: cover;
    border-radius: $radius-m;
  }

  &__layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000000;
    border-radius: $radius-m;
    opacity: 0.4;
  }

  &__image-list {
    display: grid;
    gap: 4px;
    padding: 0;

    &_col-1 {
      display: none;
    }

    &_col-2 {
      grid-template-columns: repeat(2, 1fr);
    }

    &_col-3 {
      grid-template-columns: repeat(3, 1fr);
    }

    &_col-4 {
      grid-template-columns: repeat(4, 1fr);
    }

    &_col-5 {
      grid-template-columns: repeat(5, 1fr);
    }
  }

  &__list-item {
    cursor: pointer;
    list-style-type: none;
  }
}
</style>
