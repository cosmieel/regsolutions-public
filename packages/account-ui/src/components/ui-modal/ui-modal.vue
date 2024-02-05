<template>
  <transition-group name="modal-slide-down">
    <div v-for="(item, index) in list" :key="item.id" class="modal">
      <div
        v-if="list.length - 1 === index"
        class="modal__overlay"
        @click="closeNotPersistent(item)"
      />

      <component
        v-bind="{ modalProps: item?.props || {} }"
        :is="item?.content"
        v-if="item?.content"
        class="modal__container"
        :class="{ modal__container_translate: item.modalTranslate }"
      />
    </div>
  </transition-group>
</template>

<script setup>
import { computed, watch, provide, onBeforeUnmount } from 'vue';
import { PROVIDE_MODAL_INSTANCE_KEY } from './constants.js';
import { ModalManager } from './modal-manager.js';
import { useEscapeKey } from '../../utility/composition/use-escape-key.js';

const props = defineProps({
  instance: {
    type: ModalManager,
    required: true,
  },

  routerInstance: {
    type: Object,
    default: null,
  },
});

const list = computed(() => {
  return props.instance.list.value || [];
});
const isOpen = computed(() => list.value.length > 0);

watch(isOpen, (value) => {
  const documentElement = document.documentElement;

  if (documentElement) {
    documentElement.style.overflow = value ? 'hidden' : '';
  }
});

const handleClose = () => {
  props.instance?.close?.();
};

const handleCloseAll = () => {
  props.instance?.closeAll?.();
};

const closeNotPersistent = (item) => {
  if (item?.persistent) {
    handleClose();
  }
};

useEscapeKey(() => closeNotPersistent(list.value.at(-1)));

provide(PROVIDE_MODAL_INSTANCE_KEY, props.instance);

props.routerInstance?.beforeEach((to, from) => {
  if (from.path !== to.path && props.instance.list.value.length > 0) {
    handleCloseAll();
  }
});

const closeOnUnmountWithoutRouter = () => {
  if (!props.routerInstance && isOpen.value) {
    const documentElement = document.documentElement;

    handleCloseAll();
    documentElement && (documentElement.style.overflow = '');
  }
};

onBeforeUnmount(() => {
  closeOnUnmountWithoutRouter();
});
</script>

<style lang="postcss" scoped>
$transition: all 0.3s ease;

.modal-slide-down-enter-active,
.modal-slide-down-leave-active {
  transition: $transition;
}

.modal-slide-down-enter-from,
.modal-slide-down-leave-to {
  .modal__container,
  .modal__overlay {
    opacity: 0;
  }
}

.modal-slide-down-enter-from,
.modal-slide-down-leave-to {
  .modal__container {
    &_translate {
      transform: translateY(-100px);
    }
  }
}

.modal {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &__overlay {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(31, 41, 55, 0.2);
    backdrop-filter: blur(2px);
    transition: $transition;
  }

  &__container {
    transition: $transition;
  }
}
</style>
