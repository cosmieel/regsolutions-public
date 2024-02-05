<template>
  <CardWrapper title="Настройка блока" :has-changed="hasChanged" @cancel="cancel" @save="save">
    <FieldGroup title="Заголовок">
      <ItemInput v-model="data.title" />
    </FieldGroup>
    <FieldDivider />
    <FieldGroup title="Изображения" tooltip="Формат PNG/JPEG">
      <DragableGroup :list="data.images">
        <itemPicture
          v-for="(image, imageIndex) in data.images"
          :key="imageIndex"
          v-model="image.title"
          :url="image.url"
          @delete="deleteImage(imageIndex)"
        />
        <ItemUploader @upload="onUpload" />
      </DragableGroup>
    </FieldGroup>
  </CardWrapper>
</template>

<script setup>
import { useSiteStorage } from 'site-builder/src/site-storage/site-storage';
import { ref, computed, inject } from 'vue';
import CardWrapper from '../../components/card-wrapper.vue';
import DragableGroup from '../../components/dragable-group.vue';
import FieldDivider from '../../components/field-divider.vue';
import FieldGroup from '../../components/field-group.vue';
import ItemInput from '../../components/item-input.vue';
import itemPicture from '../../components/item-picture.vue';
import ItemUploader from '../../components/item-uploader.vue';

const property = defineProps({
  block: {
    type: Object,
    required: true,
  },
});

const uploadImage = inject('uploadImage');

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

// Дочерняя логика

async function onUpload(file) {
  const url = await uploadImage(file);
  data.value.images.push({
    url,
    title: 'Подпись...',
  });
}

function deleteImage(index) {
  data.value.images.splice(index, 1);
}

defineExpose({
  hasChanged,
});
</script>
