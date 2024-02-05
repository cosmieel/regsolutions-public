<template>
  <TransitionGroup
    name="main"
    tag="main"
    class="ds-main"
    :class="{ 'ds-main_mode_view': siteMode.isView }"
    @after-enter="onAfterEnter"
    @after-leave="onAfterLeave"
    @before-enter="onBeforeEnter"
    @before-leave="onBeforeLeave"
  >
    <ds-packer
      v-for="(block, index) in blocks"
      :key="block.id"
      :type="getPackerType(block.type, index)"
      :[dataEdit]="'block'"
      @mouseenter="cursorEnter"
      @mouseleave="cursorLeave"
    >
      <component
        :is="getBlockComponent(block.type)"
        :block="block"
        :color="getColor(block.type)"
        :storage-host="getHost(block.type)"
        :action="getAction(block.type)"
        :catalogs="getCatalogs(block.type)"
        :catalog-items="getCatalogItems(block.type)"
        :type="getComponentType(block.type, index)"
        :[dataActive]="block.active"
      />
    </ds-packer>
  </TransitionGroup>
</template>

<script setup>
import BAnswers from 'site-ui/src/blocks/b-answers/b-answers.vue';
import BBanner from 'site-ui/src/blocks/b-banner/b-banner.vue';
import BBnovo from 'site-ui/src/blocks/b-bnovo/b-bnovo.vue';
import BCatalog from 'site-ui/src/blocks/b-catalog/b-catalog.vue';
import BCatalogs from 'site-ui/src/blocks/b-catalogs/b-catalogs.vue';
import BCover from 'site-ui/src/blocks/b-cover/b-cover.vue';
import BFeatures from 'site-ui/src/blocks/b-features/b-features.vue';
import BForm from 'site-ui/src/blocks/b-form/b-form.vue';
import BGallery from 'site-ui/src/blocks/b-gallery/b-gallery.vue';
import BHtml from 'site-ui/src/blocks/b-html/b-html.vue';
import BInfoGroup from 'site-ui/src/blocks/b-info-group/b-info-group.vue';
import BMap from 'site-ui/src/blocks/b-map/b-map.vue';
import BPriceList from 'site-ui/src/blocks/b-price-list/b-price-list.vue';
import BProductHero from 'site-ui/src/blocks/b-product-hero/b-product-hero.vue';
import BSocials from 'site-ui/src/blocks/b-socials/b-socials.vue';
import BTags from 'site-ui/src/blocks/b-tags/b-tags.vue';
import BText from 'site-ui/src/blocks/b-text/b-text.vue';
import BVideo from 'site-ui/src/blocks/b-video/b-video.vue';
import DsPacker from 'site-ui/src/design-system/ds-packer/ds-packer.vue';
import { useSiteMode } from 'site-ui/src/site-mode/site-mode';
import { computed } from 'vue';

const property = defineProps({
  blocks: {
    type: Array,
    required: true,
  },

  color: {
    type: Object,
    default: () => {},
  },

  action: {
    type: Object,
    default: () => {},
  },

  storageHost: {
    type: String,
    default: '',
  },

  catalogs: {
    type: Array,
    default: () => [],
  },

  catalogItems: {
    type: Array,
    default: () => [],
  },
});

const blocksComponents = [
  BText,
  BCover,
  BFeatures,
  BTags,
  BAnswers,
  BForm,
  BPriceList,
  BBanner,
  BCatalog,
  BSocials,
  BVideo,
  BInfoGroup,
  BCatalogs,
  BGallery,
  BMap,
  BBnovo,
  BHtml,
  BProductHero,
];

const heroBlocks = new Set(['BCover', 'BBanner', 'BGallery', 'BProductHero']);
const blocksComponentsData = getComponentsData();

function getComponentsData() {
  const data = [];

  for (const blockComponent of blocksComponents) {
    const componentInstance = blockComponent.__name
      .split('-')
      .map((item) => {
        return item[0].toUpperCase() + item.slice(1);
      })
      .join('');

    data.push({ blockComponent, type: componentInstance });
  }

  return data;
}

function getBlockComponent(type) {
  for (const data of blocksComponentsData) {
    if (data.type === type) {
      return data.blockComponent;
    }
  }
}

function getPackerType(type, index) {
  return heroBlocks.has(type) && index === 0 ? 'hero' : 'content';
}

function getComponentType(type, index) {
  if (!heroBlocks.has(type)) {
    return;
  }

  return index === 0 ? 'hero' : 'content';
}

// Дополнительные пропсы
function getColor(type) {
  return type === 'BBnovo' ? property.color : null;
}

function getHost(type) {
  return [
    'BBanner',
    'BCatalog',
    'BCatalogs',
    'BCover',
    'BForm',
    'BGallery',
    'BInfoGroup',
    'BProductHero',
  ].includes(type)
    ? property.storageHost
    : null;
}

function getCatalogs(type) {
  return ['BCatalog', 'BCatalogs', 'BProductHero'].includes(type) ? property.catalogs : null;
}

function getCatalogItems(type) {
  return ['BCatalog', 'BProductHero'].includes(type) ? property.catalogItems : null;
}

function getAction(type) {
  return ['BCatalog', 'BProductHero', 'BForm'].includes(type) ? property.action : null;
}

// Режим конструктора

const emit = defineEmits([
  'beforeEnterMain',
  'beforeLeaveMain',
  'afterLeaveMain',
  'afterEnterMain',
  'cursorEnterMain',
  'cursorLeaveMain',
]);

const siteMode = useSiteMode();
const dataActive = computed(() => (siteMode.isEdit ? 'data-active' : null));
const dataEdit = computed(() => (siteMode.isEdit ? 'data-edit' : null));

// События анимации обновления DOM

function onAfterEnter(element) {
  if (siteMode.isEdit) {
    emit('afterEnterMain', element);
  }
}

function onAfterLeave(element) {
  if (siteMode.isEdit) {
    emit('afterLeaveMain', element);
  }
}

function onBeforeEnter(element) {
  if (siteMode.isEdit) {
    emit('beforeEnterMain', element);
  }
}

function onBeforeLeave(element) {
  if (siteMode.isEdit) {
    emit('beforeLeaveMain', element);
  }
}

// События курсора

function cursorEnter(event) {
  if (siteMode.isEdit) {
    emit('cursorEnterMain', event);
  }
}

function cursorLeave(event) {
  if (siteMode.isEdit) {
    emit('cursorLeaveMain', event);
  }
}
</script>

<style lang="postcss" scoped>
.ds-main {
  overflow: hidden;

  &_mode_view {
    flex: 1 0 auto;
  }
}

.main-enter-active,
.main-leave-active {
  transition: all 0.3s ease;
}
.main-enter-from,
.main-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
