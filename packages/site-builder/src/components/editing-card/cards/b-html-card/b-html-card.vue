<template>
  <CardWrapper title="Настройка блока" :has-changed="hasChanged" @cancel="cancel" @save="save">
    <FieldGroup title="Код">
      <ItemTextarea v-model="data.html" />
    </FieldGroup>
    <FieldDivider />
    <FeildHeadline title="Дополнительно" />
    <FieldGroup title="Заголовок">
      <ItemInput v-model="data.title" />
    </FieldGroup>
    <FieldGroup title="Показать фон">
      <ItemChoice v-model="data.backed" />
    </FieldGroup>
  </CardWrapper>
</template>

<script setup>
import { useSiteStorage } from 'site-builder/src/site-storage/site-storage';
import { ref, computed } from 'vue';
import CardWrapper from '../../components/card-wrapper.vue';
import FieldDivider from '../../components/field-divider.vue';
import FieldGroup from '../../components/field-group.vue';
import ItemChoice from '../../components/item-choice.vue';
import ItemInput from '../../components/item-input.vue';
import ItemTextarea from '../../components/item-textarea.vue';

const property = defineProps({
  block: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(['save']);

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
}

defineExpose({
  hasChanged,
});
</script>
