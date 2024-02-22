<template>
  <article :id="'block-' + block.id" class="b-form">
    <ds-container :title="block.title" :backed="block.backed">
      <div class="b-form__wrapper" :class="wrapperClass" :style="getWrapperStyle()">
        <DsImage
          v-if="block.theme === 'half'"
          :path="block.image"
          :alt="block.contentTitle"
          loading="lazy"
          :size="resizeConfig.form.half"
          class="b-form__image"
        />
        <DsForm
          :fields="block.fields"
          :button="block.button"
          :title="block.contentTitle"
          :description="block.description"
          :privacy-text="block.privacyText"
          class="b-form__form"
          :inverse="block.theme === 'full'"
          @submit="sendForm"
        />
      </div>
    </ds-container>
  </article>
</template>

<script setup>
import { resizeConfig } from 'site-ui/src/configs/resize-config.js';
import DsContainer from 'site-ui/src/design-system/ds-container/ds-container.vue';
import DsForm from 'site-ui/src/design-system/ds-form/ds-form.vue';
import DsImage from 'site-ui/src/design-system/ds-image/ds-image.vue';
import { notificationManager } from 'site-ui/src/design-system/ds-notification/manager/notification-manager.js';
import { localizer } from 'site-ui/src/localizer/localizer';
import { OPTIONS_KEY } from 'site-ui/src/services/constants/constants.js';
import { getConstructedUrl } from 'site-ui/src/services/get-constructed-url/get-constructed-url.js';
import { computed, inject } from 'vue';

const property = defineProps({
  block: {
    type: Object,
    required: true,
  },

  action: {
    type: Object,
    required: true,
  },
});

const { hosts } = inject(OPTIONS_KEY);

const constructedUrl = getConstructedUrl(property.block.image, hosts, resizeConfig.form.full);

const wrapperClass = computed(() => {
  return property.block.theme ? `b-form__wrapper_theme_${property.block.theme}` : ``;
});

function getWrapperStyle() {
  return property.block.theme === 'full'
    ? `background: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), center/cover url('${constructedUrl}');`
    : '';
}

async function sendForm(formData) {
  const data = {
    items: [], // выпилить
    fields: formData,
    form: {
      type: 'block',
      blockId: `${property.block.id}`,
    },
  };

  const response = await fetch(`${window.location.origin}/${property.action.sendForm}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    notificationManager.add({
      type: 'info',
      autoClose: true,
      item: {
        type: 'plain',
        icon: 'checkmark',
        title: localizer.t('notifier.form.success'),
      },
    });
  } else {
    notificationManager.add({
      type: 'error',
      autoClose: true,
      item: {
        type: 'plain',
        icon: 'warning-filled',
        title: localizer.t('notifier.form.error'),
      },
    });
  }
}
</script>

<style lang="postcss" scoped>
@import 'site-ui/src/tokens/ui-tokens.css';

.b-form {
  &__wrapper {
    &_theme {
      &_full {
        overflow: hidden;
        padding: 24px 16px;
        border-radius: $radius-m;
        background-size: cover;
        background-position: center;

        @add-mixin desktop-all {
          padding: 64px 0;
        }
      }

      &_half {
        & .b-form__image {
          overflow: hidden;
          width: 100%;
          height: 164px;
          margin-bottom: 16px;
          border-radius: $radius-m;
          object-fit: cover;
          object-position: center;

          @add-mixin desktop-all {
            height: 200px;
            margin-bottom: 40px;
          }
        }
      }
    }
  }

  &__form {
    max-width: 552px;
    margin: auto;
  }
}
</style>
