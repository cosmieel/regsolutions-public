<template>
  <div class="editing-card">
    <div class="editing-card__overlay" @click="cancel" />
    <div
      class="editing-card__card"
      :style="{ top: `${indentTop + 24}px`, height: `calc(100% - ${indentTop + 24}px - 24px)` }"
    >
      <component
        :is="componentCard"
        ref="componentReference"
        :block="block"
        @save="save"
        @cancel="cancel"
      />
    </div>
  </div>
</template>

<script setup>
import { callWarningOfUnsavedChangesModal } from 'site-builder/src/services/modals/unsaved/warning-of-unsaved-changes-modal.js';
import { useSiteStorage } from 'site-builder/src/site-storage/site-storage.js';
import { computed, ref } from 'vue';
import BAnswersCard from './cards/b-answers-card/b-answers-card.vue';
import BBannerCard from './cards/b-banner-card/b-banner-card.vue';
import BBnovoCard from './cards/b-bnovo-card/b-bnovo-card.vue';
import BCatalogCard from './cards/b-catalog-card/b-catalog-card.vue';
import BCatalogsCard from './cards/b-catalogs-card/b-catalogs-card.vue';
import BCoverCard from './cards/b-cover-card/b-cover-card.vue';
import BFeaturesCard from './cards/b-features-card/b-features-card.vue';
import BFormCard from './cards/b-form-card/b-form-card.vue';
import BGalleryCard from './cards/b-gallery-card/b-gallery-card.vue';
import BHtmlCard from './cards/b-html-card/b-html-card.vue';
import BInfoGroupCard from './cards/b-info-group-card/b-info-group-card.vue';
import BMapCard from './cards/b-map-card/b-map-card.vue';
import BPriceListCard from './cards/b-price-list-card/b-price-list-card.vue';
import BSocialsCard from './cards/b-socials-card/b-socials-card.vue';
import BTagsCard from './cards/b-tags-card/b-tags-card.vue';
import BTextCard from './cards/b-text-card/b-text-card.vue';
import BVideoCard from './cards/b-video-card/b-video-card.vue';
import DsFooterCard from './cards/ds-footer-card/ds-footer-card.vue';
import DsHeaderCard from './cards/ds-header-card/ds-header-card.vue';

const property = defineProps({
  block: {
    type: Object,
    required: true,
  },

  indentTop: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(['save', 'cancel']);

const componentReference = ref(null);

const componentsCard = {
  DsHeaderCard,
  DsFooterCard,
  BTextCard,
  BVideoCard,
  BHtmlCard,
  BFeaturesCard,
  BAnswersCard,
  BGalleryCard,
  BBannerCard,
  BCoverCard,
  BPriceListCard,
  BInfoGroupCard,
  BTagsCard,
  BMapCard,
  BBnovoCard,
  BSocialsCard,
  BCatalogsCard,
  BCatalogCard,
  BFormCard,
};

const siteStorage = useSiteStorage();

const hasChanged = computed(() => componentReference.value.hasChanged);

const blockType = computed(() => {
  return siteStorage.getType(property.block);
});

const componentCard = computed(() => {
  return componentsCard[`${blockType.value}Card`];
});

function save() {
  emit('save');
}

function cancel() {
  if (hasChanged.value) {
    callWarningOfUnsavedChangesModal(() => emit('cancel'));
  } else {
    emit('cancel');
  }
}
</script>

<style lang="postcss" scoped>
.editing-card {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 401;

  &__overlay {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
  }

  &__card {
    position: absolute;
    left: 24px;
    width: 358px;
    border-radius: 16px;
    border: 1px solid var(--gray-200, #ebedf1);
    background-color: #fff;
    box-shadow: 1px 4px 20px 0px rgba(46, 64, 100, 0.16), 2px 2px 12px 0px rgba(46, 64, 100, 0.04);
    z-index: 401;
  }
}
</style>
