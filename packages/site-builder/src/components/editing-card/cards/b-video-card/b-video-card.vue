<template>
  <CardWrapper title="Настройка блока" :has-changed="hasChanged" @cancel="cancel" @save="save">
    <FeildHeadline title="Основное" />
    <FieldGroup title="Ссылка" tooltip="Ссылка на видео в YouTube">
      <ItemInput v-model="data.url" />
    </FieldGroup>
    <FieldGroup title="Обложка" tooltip="Изображение для предпросмотра видео. Формат PNG/JPEG">
      <ItemPicture
        v-if="data.cover"
        v-model="data.cover"
        :url="data.cover"
        :disabled="true"
        @delete="deleteImage"
      />
      <ItemUploader v-else @upload="onUpload" />
    </FieldGroup>
    <FieldDivider />
    <FeildHeadline title="Дополнительное" />
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
import { ref, computed, inject } from 'vue';
import CardWrapper from '../../components/card-wrapper.vue';
import FieldDivider from '../../components/field-divider.vue';
import FieldGroup from '../../components/field-group.vue';
import FeildHeadline from '../../components/field-headline.vue';
import ItemChoice from '../../components/item-choice.vue';
import ItemInput from '../../components/item-input.vue';
import ItemPicture from '../../components/item-picture.vue';
import ItemUploader from '../../components/item-uploader.vue';

const property = defineProps({
  block: {
    type: Object,
    required: true,
  },
});

const uploadImage = inject('uploadImage');

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

async function onUpload(file) {
  const url = await uploadImage(file);
  data.value.cover = url;
}

function deleteImage() {
  delete data.value.cover;
}

defineExpose({
  hasChanged,
});
</script>
