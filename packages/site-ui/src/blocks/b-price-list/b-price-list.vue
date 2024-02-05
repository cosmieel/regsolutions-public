<template>
  <article :id="'block-' + block.id" class="b-price-list">
    <ds-container :title="block.title" :backed="block.backed">
      <div class="b-price-list__content">
        <div ref="priceWrapper" class="b-price-list__wrapper">
          <DsPrice :price="block.price" />
        </div>
        <DsGradient v-if="needGradient" position="right" />
      </div>
    </ds-container>
  </article>
</template>

<script setup>
import { useBreakPoint } from 'site-ui/src/break-point/break-point';
import DsContainer from 'site-ui/src/design-system/ds-container/ds-container.vue';
import DsGradient from 'site-ui/src/design-system/ds-gradient/ds-gradient.vue';
import DsPrice from 'site-ui/src/design-system/ds-price/ds-price.vue';
import { ref, onMounted, onUnmounted } from 'vue';

const breakPoint = useBreakPoint();

defineProps({
  block: {
    type: Object,
    required: true,
  },
});

const priceWrapper = ref(null);
const needGradient = ref(false);

onMounted(() => {
  priceWrapper.value.addEventListener('scroll', () => {
    setGradient();
  });

  setGradient();
  breakPoint.onResize(setGradient);
});

onUnmounted(() => {
  breakPoint.destroy(setGradient);
});

function setGradient() {
  const scrollWidth = priceWrapper.value.scrollWidth;
  const clientWidth = priceWrapper.value.clientWidth;
  const scrollLeft = priceWrapper.value.scrollLeft;

  if (scrollWidth > clientWidth) {
    needGradient.value = scrollWidth - clientWidth === scrollLeft ? false : true;
  } else {
    needGradient.value = false;
  }
}
</script>

<style lang="postcss" scoped>
.b-price-list {
  &__content {
    position: relative;
  }

  &__wrapper {
    overflow-x: auto;
    overflow-y: hidden;
  }
}
</style>
