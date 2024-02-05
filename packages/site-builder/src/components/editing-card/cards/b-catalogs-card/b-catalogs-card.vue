<template>
  <CardWrapper title="Настройка блока" :has-changed="hasChanged" @cancel="cancel" @save="save">
    <FieldHeadline
      :title="currentCatalogs.length > 0 ? 'Каталоги в блоке' : 'Список пуст'"
      :link="link"
    />

    <ItemCheckbox v-for="catalog in currentCatalogs" :key="catalog.id" v-model="catalog.checked">
      {{ catalog.title }}
    </ItemCheckbox>

    <FieldDivider />

    <FieldHeadline title="Дополнительно" />
    <FieldGroup title="Заголовок">
      <ItemInput v-model="data.title" />
    </FieldGroup>
  </CardWrapper>
</template>

<script setup>
import { useSiteStorage } from 'site-builder/src/site-storage/site-storage';
import { ref, computed, reactive, watch, toRaw } from 'vue';
import CardWrapper from '../../components/card-wrapper.vue';
import FieldDivider from '../../components/field-divider.vue';
import FieldGroup from '../../components/field-group.vue';
import FieldHeadline from '../../components/field-headline.vue';
import ItemCheckbox from '../../components/item-checkbox.vue';
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
const link = `/configuration/${siteStorage.storage.meta.siteId}/catalogs`;

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

const currentCatalogs = reactive(
  siteStorage.storage.content.catalogs.map((catalog) => {
    return {
      id: catalog.id,
      title: catalog.title,
      checked: data.value.catalogsId.includes(catalog.id),
    };
  })
);

watch(
  () => currentCatalogs,
  (newCurrentCatalogs) => {
    const value = toRaw(newCurrentCatalogs)
      .filter((catalog) => catalog.checked)
      .map((catalog) => catalog.id);

    data.value.catalogsId = value;
  },
  { deep: true }
);

defineExpose({
  hasChanged,
});
</script>
