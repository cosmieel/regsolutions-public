<template>
  <div class="ds-layout" :class="{ 'ds-layout_mode_view': siteMode.isView }">
    <Transition
      @before-enter="beforeEnterBlock"
      @after-enter="afterEnterBlock"
      @before-leave="beforeLeaveBlock"
      @after-leave="afterLeaveBlock"
    >
      <DsHeader
        v-if="data.options.layout?.header"
        :meta="data.meta"
        :options="data.options"
        :catalog-items="data.content.catalogItems"
        :catalogs="data.content.catalogs"
        @mouseenter="cursorEnter"
        @mouseleave="cursorLeave"
      />
    </Transition>

    <DsMain
      :blocks="data.content.blocks"
      :color="data.options.color"
      :action="data.options.action"
      :catalogs="data.content.catalogs"
      :catalog-items="data.content.catalogItems"
      @before-enter-main="beforeEnterBlock"
      @after-enter-main="afterEnterBlock"
      @before-leave-main="beforeLeaveBlock"
      @after-leave-main="afterLeaveBlock"
      @cursor-enter-main="cursorEnter"
      @cursor-leave-main="cursorLeave"
    />

    <Transition
      @before-enter="beforeEnterBlock"
      @after-enter="afterEnterBlock"
      @before-leave="beforeLeaveBlock"
      @after-leave="afterLeaveBlock"
    >
      <DsFooter
        v-if="data.options.layout?.footer"
        :meta="data.meta"
        :options="data.options"
        :footer="data.options.layout.footer"
        @mouseenter="cursorEnter"
        @mouseleave="cursorLeave"
      />
    </Transition>
    <DsRegPartner v-if="data.options.isPartner && !siteMode.isEdit" />
    <DsNotificationWrapper />
  </div>
</template>

<script setup>
import { useBreakPoint } from 'site-ui/src/break-point/break-point';
import DsFooter from 'site-ui/src/design-system/ds-footer/ds-footer.vue';
import DsHeader from 'site-ui/src/design-system/ds-header/ds-header.vue';
import DsMain from 'site-ui/src/design-system/ds-main/ds-main.vue';
import DsNotificationWrapper from 'site-ui/src/design-system/ds-notification/ds-notification-wrapper.vue';
import DsRegPartner from 'site-ui/src/design-system/ds-reg-partner/ds-reg-partner.vue';
import { localizer } from 'site-ui/src/localizer/localizer';
import { OPTIONS_KEY } from 'site-ui/src/services/constants/constants.js';
import { initStyle } from 'site-ui/src/services/init-style/init-style.js';
import { useSiteMode } from 'site-ui/src/site-mode/site-mode';
// eslint-disable-next-line import/no-unresolved
import { register } from 'swiper/element/bundle';
import { onBeforeMount, provide } from 'vue';

const property = defineProps({
  data: {
    type: Object,
    required: true,
  },

  mode: {
    type: String,
    default: 'view',
  },
});

register();

provide(OPTIONS_KEY, property.data.options);

const breakPoint = useBreakPoint();
breakPoint.init();

const siteMode = useSiteMode();
siteMode.changeMode(property.mode);

localizer.setLanguage(property.data.options.language);

onBeforeMount(() => {
  if (!property.data.options.color?.hex) {
    return;
  }

  initStyle(property.data.options.color?.hex, property.data.options.color?.isColorLight);
});

// Режим конструктора

const emit = defineEmits([
  'beforeEnterBlock',
  'afterEnterBlock',
  'beforeLeaveBlock',
  'afterLeaveBlock',
  'cursorEnter',
  'cursorLeave',
]);

// События анимации обновления DOM

function beforeEnterBlock(element) {
  if (siteMode.isEdit) {
    emit('beforeEnterBlock', element);
  }
}

function afterEnterBlock(element) {
  if (siteMode.isEdit) {
    emit('afterEnterBlock', element);
  }
}

function beforeLeaveBlock(element) {
  if (siteMode.isEdit) {
    emit('beforeLeaveBlock', element);
  }
}

function afterLeaveBlock(element) {
  if (siteMode.isEdit) {
    emit('afterLeaveBlock', element);
  }
}

// События курсора

function cursorEnter(event) {
  if (siteMode.isEdit) {
    emit('cursorEnter', event.target);
  }
}

function cursorLeave(event) {
  if (siteMode.isEdit) {
    emit('cursorLeave', event.target);
  }
}
</script>

<style lang="postcss" scoped>
@import 'site-ui/src/tokens/ui-tokens.css';

.ds-layout {
  background-color: var(--bg-layout-background);

  &_mode_view {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
