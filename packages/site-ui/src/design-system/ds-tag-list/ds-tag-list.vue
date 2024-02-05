<template>
  <div class="ds-tags-list" :class="{ 'ds-tags-list_clicable': modal }">
    <ul
      ref="tagList"
      class="ds-tags-list__list"
      :class="classList"
      :style="{ maxHeight: heightList }"
      @click="openModal"
    >
      <li v-for="tag in tags" :key="getKey(tag.text)" class="ds-tags-list__item">
        <DsTag :text="tag.text" :icon="tag.icon" />
      </li>
    </ul>

    <DsGradient v-if="needGradient" position="right" />

    <ds-modal v-if="showModal" @close="showModal = false">
      <div class="ds-tags-list__modal-wrapper">
        <ul class="ds-tags-list__list ds-tags-list__list_type_wrap">
          <li v-for="tag in tags" :key="getKey(tag.text)" class="ds-tags-list__item">
            <DsTag :text="tag.text" :icon="tag.icon" />
          </li>
        </ul>
      </div>
    </ds-modal>
  </div>
</template>

<script setup>
import { useBreakPoint } from 'site-ui/src/break-point/break-point';
import DsGradient from 'site-ui/src/design-system/ds-gradient/ds-gradient.vue';
import DsModal from 'site-ui/src/design-system/ds-modal/ds-modal.vue';
import DsTag from 'site-ui/src/design-system/ds-tag/ds-tag.vue';
import { ref, computed, onMounted, onUnmounted } from 'vue';

const breakPoint = useBreakPoint();

const property = defineProps({
  tags: {
    type: Array,
    required: true,
  },

  type: {
    type: String,
    default: 'wrap',
  },

  modal: {
    type: Boolean,
    default: false,
  },

  maxRow: {
    type: Number,
    default: 0,
  },
});

const tagList = ref(null);
const needGradient = ref(false);
const showModal = ref(false);
const heightList = ref(null);

const classList = computed(() => {
  return `ds-tags-list__list_type_${property.type}`;
});

onMounted(() => {
  tagList.value.addEventListener('scroll', () => {
    setGradient();
  });

  setGradient();
  breakPoint.onResize(setGradient);

  setHeight();
  breakPoint.onResize(setHeight);
});

onUnmounted(() => {
  breakPoint.destroy(setGradient);
  breakPoint.destroy(setHeight);
});

function setGradient() {
  if (property.type === 'wrap') {
    needGradient.value = false;
    return;
  }

  const scrollWidth = tagList.value.scrollWidth;
  const clientWidth = tagList.value.clientWidth;
  const scrollLeft = tagList.value.scrollLeft;

  if (scrollWidth > clientWidth) {
    needGradient.value =
      Math.round(scrollWidth - clientWidth) <= Math.round(scrollLeft) ? false : true;
  } else {
    needGradient.value = false;
  }
}

function setHeight() {
  if (!property.maxRow || property.type === 'inline') {
    heightList.value = null;
    return;
  }

  const itemHeight = tagList.value.firstElementChild.offsetHeight;
  const height = property.maxRow * itemHeight + (property.maxRow - 1) * 8;
  heightList.value = height + 'px';
}

function openModal() {
  if (!property.modal) {
    return;
  }

  showModal.value = true;
}

function getKey(item) {
  return `${item}${Math.random()}`;
}
</script>

<style lang="postcss" scoped>
@import 'site-ui/src/tokens/ui-tokens.css';

.ds-tags-list {
  position: relative;

  &_clicable {
    cursor: pointer;
  }

  &__list {
    display: flex;
    gap: 8px;
    padding: 0;
    margin: 0;

    &_type {
      &_inline {
        overflow-x: auto;
        flex-wrap: nowrap;
      }

      &_wrap {
        overflow: hidden;
        flex-wrap: wrap;
      }
    }
  }

  &__item {
    flex-shrink: 0;
    list-style-type: none;
  }

  &__modal-wrapper {
    padding: 32px;
  }
}
</style>
