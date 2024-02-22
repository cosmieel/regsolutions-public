<template>
  <article :id="'block-' + block.id" class="b-info-group">
    <ds-container :title="block.title" :backed="false">
      <ds-slider
        v-if="block.cards.length < 6 && block.cards.length > 3"
        :items="block.cards.length"
        :type="typeSlider"
        :controls="controls"
        pagination="primary"
      >
        <ds-slide v-for="(card, index) in block.cards" :key="getKey(index)">
          <div v-if="block.theme !== 'full'" class="b-info-group__card-wrapper">
            <DsInfoCard
              :theme="block.theme"
              :title="card.title"
              :description="trimString(card.description, 100)"
              :image="card.image"
              :button="getButtonParameters(card)"
              :index="index"
              :resizer-size="resizeConfig.infoCard[block.theme]"
              @click="showModal"
            />
          </div>

          <DsInfoCard
            v-else
            :theme="block.theme"
            :title="card.title"
            :description="trimString(card.description, 100)"
            :image="card.image"
            :button="getButtonParameters(card)"
            :index="index"
            :resizer-size="resizeConfig.infoCard[block.theme]"
            @click="showModal"
          />
        </ds-slide>
      </ds-slider>

      <ds-list v-else type="horizontal">
        <ds-list-item v-for="(card, index) in currentItems" :key="getKey(index)">
          <DsInfoCard
            :key="getKey(index)"
            :theme="block.theme"
            :title="card.title"
            :description="trimString(card.description, 100)"
            :image="card.image"
            :button="getButtonParameters(card)"
            :index="index"
            :resizer-size="resizeConfig.infoCard[block.theme]"
            @click="showModal"
          />
        </ds-list-item>
      </ds-list>
      <div v-if="itemsNumber < block.cards.length" class="b-info-group__button-wrapper">
        <DsButton
          theme="ghost"
          icon="chevron-m-down"
          :text="localizer.t('cardGroup.show')"
          @click="showMore"
        />
      </div>
    </ds-container>
    <ds-modal v-if="modal" @close="modal = false">
      <ds-list type="vertical" class="b-info-group__list-modal">
        <ds-list-item v-for="(card, index) in block.cards" :key="getKey(index)">
          <DsInfoCardModal
            :key="getKey(index)"
            :theme="modalCardTheme"
            :title="card.title"
            :description="card.description"
            :image="card.image"
            :button="{
              text: card.button?.text,
              url: card.button?.url,
            }"
            :index="'block-' + block.id + '-' + index"
          />
        </ds-list-item>
      </ds-list>
    </ds-modal>
  </article>
</template>

<script setup>
import { useBreakPoint } from 'site-ui/src/break-point/break-point';
import { resizeConfig } from 'site-ui/src/configs/resize-config.js';
import DsButton from 'site-ui/src/design-system/ds-button/ds-button.vue';
import DsContainer from 'site-ui/src/design-system/ds-container/ds-container.vue';
import DsInfoCardModal from 'site-ui/src/design-system/ds-info-card/ds-info-card-modal.vue';
import DsInfoCard from 'site-ui/src/design-system/ds-info-card/ds-info-card.vue';
import DsListItem from 'site-ui/src/design-system/ds-list/ds-list-item.vue';
import DsList from 'site-ui/src/design-system/ds-list/ds-list.vue';
import DsModal from 'site-ui/src/design-system/ds-modal/ds-modal.vue';
import DsSlide from 'site-ui/src/design-system/ds-slider/ds-slide.vue';
import DsSlider from 'site-ui/src/design-system/ds-slider/ds-slider.vue';
import { localizer } from 'site-ui/src/localizer/localizer';
import { trimString } from 'site-ui/src/services/trim-string/trim-string.js';
import { useSiteMode } from 'site-ui/src/site-mode/site-mode';
import { ref, computed, onUpdated } from 'vue';

const breakPoint = useBreakPoint();
const siteMode = useSiteMode();

const property = defineProps({
  block: {
    type: Object,
    required: true,
  },
});

const typeSlider = computed(() => {
  return property.block.theme === 'full' ? 'multiple' : 'multiple-shadow';
});

const controls = computed(() => {
  return breakPoint.isMobileAll ? '' : 'primary';
});

function getKey(index) {
  return `${index}${Math.random()}`;
}

const itemsNumber = ref(6);

const currentItems = computed(() => {
  if (property.block.cards.length <= itemsNumber.value) {
    return property.block.cards;
  }

  return property.block.cards.slice(0, itemsNumber.value);
});

function showMore() {
  if (siteMode.isEdit) {
    return;
  }

  itemsNumber.value =
    property.block.cards.length >= itemsNumber.value + 6
      ? itemsNumber.value + 6
      : property.block.cards.length;
}

const modalCardTheme = computed(() => {
  return property.block.theme === 'compact' ? 'compact' : 'half';
});

const modal = ref(false);
const activeCardId = ref(null);

function showModal(index) {
  activeCardId.value = `block-${property.block.id}-${index}`;
  modal.value = true;
}

function getButtonParameters(card) {
  if (!card.button) {
    return;
  }

  return {
    text: card.button.text,
    url: card.button.url,
    color: property.block.theme === 'full' ? 'secondary-inverse' : 'secondary',
  };
}

onUpdated(() => {
  if (modal.value) {
    const activeCard = document.querySelector(`#${activeCardId.value}`);

    if (breakPoint.isMobileAll) {
      setTimeout(() => {
        activeCard.scrollIntoView({ block: 'start', behavior: 'smooth' });
      }, 700);
    } else {
      activeCard.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  }

  activeCardId.value = null;
});
</script>

<style lang="postcss" scoped>
@import 'site-ui/src/tokens/ui-tokens.css';

.b-info-group {
  &__card-wrapper {
    height: 100%;
    padding: 12px;
  }

  &__button-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 32px;

    @add-mixin desktop-all {
      margin-top: 56px;
    }
  }

  &__list-modal {
    padding: 24px;
  }
}
</style>
