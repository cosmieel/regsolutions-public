<template>
  <article ref="modal" class="ds-modal" @click="closeModal">
    <div ref="wrapper" class="ds-modal__wrapper" tabindex="0" @click.stop="">
      <DsButton
        v-if="closeButton"
        theme="fab"
        size="s"
        icon="close"
        aria-label="Close"
        class="ds-modal__close-button"
        @click="closeModal"
      />
      <slot />
    </div>
  </article>
</template>

<script setup>
import DsButton from 'site-ui/src/design-system/ds-button/ds-button.vue';
import { lockBody } from 'site-ui/src/services/lock-body/lock-body.js';
import { unlockBody } from 'site-ui/src/services/unlock-body/unlock-body.js';
import { onMounted, onUnmounted, onActivated, onDeactivated, ref } from 'vue';

defineProps({
  closeButton: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['close']);

const modal = ref();
const wrapper = ref();
const body = document.querySelector('body');
const trigger = event.target;

onMounted(() => {
  body.style.paddingRight = getScrollWidth();
  lockBody('ds-modal');

  wrapper.value.focus();

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  });
});

onUnmounted(() => {
  body.style.paddingRight = 0;
  unlockBody('ds-modal');

  trigger.focus();
});

onActivated(() => {
  body.style.paddingRight = getScrollWidth();
  lockBody('ds-modal');

  wrapper.value.focus();
});

onDeactivated(() => {
  body.style.paddingRight = 0;
  unlockBody('ds-modal');

  trigger.focus();
});

const closeModal = () => {
  emit('close');
};

const getScrollWidth = () => {
  return window.innerWidth - modal.value.offsetWidth + 'px';
};
</script>

<style lang="postcss">
@import '../../tokens/ui-tokens.css';

.ds-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--bg-modal-overlay-1);
  backdrop-filter: $blur-s;
  z-index: $z-modal;
}

.ds-modal__wrapper {
  position: relative;
  overflow: auto;
  top: 100%;
  left: 50%;
  width: 100%;
  max-height: calc(100% - 80px);
  background: #fff;
  border-radius: $radius-m $radius-m 0 0;
  transform: translate(-50%, -50%);
  outline: none;
  animation-duration: 0.6s;
  animation-fill-mode: forwards;
  animation-name: emersion;

  @add-mixin desktop-all {
    top: 50%;
    width: 628px;
    max-height: calc(100% - 96px);
    border-radius: $radius-m;
  }
}

.ds-modal__close-button {
  cursor: pointer;
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 1;
}

@add-mixin mobile-all {
  @keyframes emersion {
    from {
      transform: translate(-50%, 0);
    }

    to {
      transform: translate(-50%, -100%);
    }
  }
}
</style>
