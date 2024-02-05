<template>
  <div class="active-outline" :class="{ 'active-outline_header': blockType === 'DsHeader' }">
    <span
      class="active-outline__line active-outline__line_type_top"
      :style="{ top: `${topPoint - 2}px`, left: `${leftPoint - 2}px`, width: `${width + 2}px` }"
    ></span>
    <span
      class="active-outline__line active-outline__line_type_rigth"
      :style="{ top: `${topPoint - 2}px`, left: `${rigthPoint}px`, height: `${height + 2}px` }"
    ></span>
    <span
      class="active-outline__line active-outline__line_type_bottom"
      :style="{ top: `${bottomPoint}px`, left: `${leftPoint}px`, width: `${width + 2}px` }"
    ></span>
    <span
      class="active-outline__line active-outline__line_type_left"
      :style="{ top: `${topPoint}px`, left: `${leftPoint - 2}px`, height: `${height + 2}px` }"
    ></span>
  </div>
</template>

<script setup>
import { useSiteStorage } from 'site-builder/src/site-storage/site-storage';
import { ref, onUnmounted } from 'vue';

const property = defineProps({
  block: {
    type: Object,
    default: () => {},
  },
});

const siteStorage = useSiteStorage();
const blockType = siteStorage.getType(property.block);

const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const entryWidth = entry.borderBoxSize[0].inlineSize;
    const entryHeight = entry.borderBoxSize[0].blockSize;
    updatePositionPoint(entryWidth, entryHeight);
  }
});

resizeObserver.observe(property.block);

onUnmounted(() => {
  resizeObserver.unobserve(property.block);
});

const width = ref(null);
const height = ref(null);
const topPoint = ref(null);
const leftPoint = ref(null);
const rigthPoint = ref(null);
const bottomPoint = ref(null);

function updatePositionPoint(entryWidth, entryHeight) {
  width.value = entryWidth ?? property.block.offsetWidth;
  height.value = entryHeight ?? property.block.offsetHeight;
  topPoint.value = property.block.offsetTop;
  leftPoint.value = property.block.offsetLeft;
  rigthPoint.value = leftPoint.value + width.value;
  bottomPoint.value = topPoint.value + height.value;
}
</script>

<style lang="postcss" scoped>
.active-outline {
  width: 0;
  height: 0;

  &_header {
    .active-outline__line {
      z-index: 1;
    }
  }

  &__line {
    position: absolute;
    z-index: 200;
    background-color: #4f7fff;

    &_type {
      &_top {
        height: 2px;
      }

      &_rigth {
        width: 2px;
      }

      &_bottom {
        height: 2px;
      }

      &_left {
        width: 2px;
      }
    }
  }
}
</style>
