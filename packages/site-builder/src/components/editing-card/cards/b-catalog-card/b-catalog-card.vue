<template>
  <CardWrapper title="Настройка блока" :has-changed="hasChanged" @cancel="cancel" @save="save">
    <FieldHeadline title="Товары в блоке" :link="link" />

    <FieldGroup title="Каталог">
      <ItemSelect v-model="selectCatalog" :list="catalogs.map((catalog) => catalog.title)" />
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
import { ref, computed, watch } from 'vue';
import CardWrapper from '../../components/card-wrapper.vue';
import FieldDivider from '../../components/field-divider.vue';
import FieldGroup from '../../components/field-group.vue';
import FieldHeadline from '../../components/field-headline.vue';
import ItemInput from '../../components/item-input.vue';
import ItemSelect from '../../components/item-select.vue';

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
const catalogSettingsLink = `catalogSettings/${
  data.value.catalogId || siteStorage.storage.content.catalogs[0]?.id
}`;
const catalogItemsListLink =
  siteStorage.storage.content.catalogs.length > 0 ? catalogSettingsLink : 'catalogs';
const link = `/configuration/${siteStorage.storage.meta.siteId}/${catalogItemsListLink}`;

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

const catalogs = ref(siteStorage.storage.content.catalogs);

const selectCatalog = ref(
  catalogs.value.find((catalog) => {
    if (data.value.catalogId) {
      return catalog.id === data.value.catalogId;
    }

    return catalog.id;
  })?.title
);

watch(selectCatalog, (newSelectCatalog) => {
  data.value.catalogId = catalogs.value.find((catalog) => catalog.title === newSelectCatalog)?.id;
});

defineExpose({
  hasChanged,
});
</script>
