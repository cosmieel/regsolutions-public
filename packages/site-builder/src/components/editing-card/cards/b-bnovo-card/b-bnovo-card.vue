<template>
  <CardWrapper title="Настройка блока" :has-changed="hasChanged" @cancel="cancel" @save="save">
    <FieldHeadline title="Основное" />
    <FieldGroup title="bnovo-uid">
      <ItemInput v-model="data.bnovoId" />
    </FieldGroup>
    <FieldGroup title="Полный вид">
      <ItemChoice v-model="data.fullMode" />
    </FieldGroup>

    <FieldGroup title="Бронь от" tooltip="Минимальное количество дней для брони">
      <ItemInput v-model="data.minNumberDays" type="number" />
    </FieldGroup>
    <FieldGroup v-if="!data.fullMode" title="Ссылка">
      <ItemInput v-model="data.url" />
    </FieldGroup>
    <FieldGroup v-if="!data.fullMode" title="Промокод">
      <ItemChoice v-model="data.couponSupport" />
    </FieldGroup>
    <FieldDivider />
    <FieldHeadline title="Дополнительно" />
    <FieldGroup title="Заголовок">
      <ItemInput v-model="data.title" />
    </FieldGroup>
  </CardWrapper>
</template>

<script setup>
import { useSiteStorage } from 'site-builder/src/site-storage/site-storage';
import { ref, computed } from 'vue';
import CardWrapper from '../../components/card-wrapper.vue';
import FieldDivider from '../../components/field-divider.vue';
import FieldGroup from '../../components/field-group.vue';
import FieldHeadline from '../../components/field-headline.vue';
import ItemChoice from '../../components/item-choice.vue';
import ItemInput from '../../components/item-input.vue';

const property = defineProps({
  block: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['save', 'cancel']);

const siteStorage = useSiteStorage();
const data = ref(siteStorage.getBlockData(property.block));
const index = siteStorage.getBlockIndex(property.block);

const hasChanged = computed(() => {
  return JSON.stringify(data.value) !== JSON.stringify(siteStorage.getBlockData(property.block));
});

function save() {
  siteStorage.changeBlockData(data.value, index);
  data.value = siteStorage.getBlockData(property.block);
  emit('save');
}

function cancel() {
  data.value = siteStorage.getBlockData(property.block);
  emit('cancel');
}

// Дочерняя логика

defineExpose({
  hasChanged,
});
</script>
