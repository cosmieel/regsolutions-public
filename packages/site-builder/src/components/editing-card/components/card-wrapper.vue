<template>
  <div class="card-wrapper">
    <div class="card-wrapper__buttons-wrapper">
      <button class="card-wrapper__button card-wrapper__button_type_cancel" @click="cancel">
        Отменить
      </button>
      <button
        class="card-wrapper__button card-wrapper__button_type_save"
        :disabled="!hasChanged"
        @click="save"
      >
        Сохранить
      </button>
    </div>
    <strong class="card-wrapper__title">{{ title }}</strong>
    <div class="card-wrapper__field">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },

  hasChanged: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['cancel', 'save']);

function cancel() {
  emit('cancel');
}

function save() {
  emit('save');
}
</script>

<style lang="postcss" scoped>
.card-wrapper {
  height: 100%;

  &__title {
    display: block;
    padding: 8px 16px;
    font-size: 14px;
    font-weight: 500;
    color: var(--gray-700, var(--colors-gray-700, #374151));
    background: #fff;
    border-bottom: 1px solid var(--gray-200, #ebedf1);
  }

  &__field {
    height: calc(100% - 80px);
    padding: 16px;
    overflow-y: auto;
  }

  &__buttons-wrapper {
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-radius: 16px 16px 0 0;
  }

  &__button {
    flex-grow: 1;
    text-align: center;
    padding: 12px 16px;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;

    &:disabled {
      opacity: 0.5;
    }

    &_type {
      &_cancel {
        color: var(--gray-700, var(--colors-gray-700, #374151));
        background: var(--gray-100, #f3f4f6);
      }

      &_save {
        color: var(--white-white, #fff);
        background: var(--blue-700, #3755fa);
      }
    }
  }
}
</style>
