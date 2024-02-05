<template>
  <BaseConfirmationModal
    :id="mainId"
    :secondary-action-hs-overlay="secondaryId"
    @accept="$emit('discard')"
  >
    <template #title>Точно хотите выйти?</template>
    <template #description>
      Вся заполненая информация будет удалена, потом придется заполнять все заново
    </template>
    <template #primary-action>Выйти без сохранения</template>
    <template #secondary-action>Остаться здесь</template>
  </BaseConfirmationModal>
</template>

<script setup>
import { computed } from 'vue';
import BaseConfirmationModal from '../components/base-confirmation-modal.vue';

const props = defineProps({
  catalogItemId: {
    type: Number,
    default: -1,
  },

  type: {
    type: String,
    default: 'create',
  },
});

const mainId = computed(() => `hs-discard-product-${props.type}-modal-${props.catalogItemId}`);
const secondaryId = computed(() => `hs-${props.type}-product-modal-${props.catalogItemId}`);

defineEmits(['discard']);
</script>
