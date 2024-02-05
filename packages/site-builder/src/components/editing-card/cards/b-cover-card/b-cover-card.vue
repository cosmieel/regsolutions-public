<template>
  <CardWrapper title="Настройка блока" :has-changed="hasChanged" @cancel="cancel" @save="save">
    <FieldHeadline v-if="index > 0" title="Основное" />
    <FieldGroup title="Заголовок">
      <ItemTextarea v-model="data.contentTitle" :rows="2" />
    </FieldGroup>
    <FieldGroup title="Описание">
      <ItemTextarea v-model="data.text" :rows="2" />
    </FieldGroup>
    <FieldDivider />
    <FieldGroup title="Изображения" tooltip="Формат PNG/JPEG">
      <DragableGroup :list="data.images">
        <itemPicture
          v-for="(image, imageIndex) in data.images"
          :key="imageIndex"
          v-model="data.images[imageIndex]"
          :url="image"
          :disabled="true"
          @delete="deleteImage(imageIndex)"
        />
      </DragableGroup>
      <ItemUploader @upload="onUpload" />
    </FieldGroup>
    <FieldDivider />
    <FieldGroup title="Кнопки">
      <ItemSetting
        v-for="(button, buttonIndex) in data.buttons"
        :key="buttonIndex"
        title="Кнопка"
        :text="button.text"
        @delete="deleteButton(buttonIndex)"
      >
        <FieldGroup title="Текст">
          <ItemInput v-model="button.text" />
        </FieldGroup>

        <FieldGroup title="Ссылка">
          <ItemInput v-model="button.url" />
        </FieldGroup>
      </ItemSetting>
      <ItemSettingTrigger
        v-if="data.buttons?.length < 2 || !data.buttons"
        @click="clickButtonTrigger()"
      />
    </FieldGroup>
    <FieldDivider />
    <FieldHeadline title="Дополнительно" />
    <FieldGroup v-if="index > 0" title="Заголовок">
      <ItemInput v-model="data.title" />
    </FieldGroup>
    <FieldGroup title="Показать фон">
      <ItemChoice v-model="data.backed" />
    </FieldGroup>
    <FieldGroup title="Картинка слева">
      <ItemChoice v-model="data.reverse" />
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
import FieldHeadline from '../../components/field-headline.vue';
import ItemChoice from '../../components/item-choice.vue';
import ItemInput from '../../components/item-input.vue';
import itemPicture from '../../components/item-picture.vue';
import ItemSettingTrigger from '../../components/item-setting-trigger.vue';
import ItemSetting from '../../components/item-setting.vue';
import ItemTextarea from '../../components/item-textarea.vue';
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

function deleteImage(index) {
  data.value.images.splice(index, 1);
}

async function onUpload(file) {
  const url = await uploadImage(file);
  data.value.images.push(url);
}

function clickButtonTrigger() {
  if (!data.value.buttons) {
    data.value.buttons = [];
  }

  data.value.buttons.push({
    text: 'Новый элемент',
    url: '',
  });
}

function deleteButton(index) {
  data.value.buttons.splice(index, 1);
}

defineExpose({
  hasChanged,
});
</script>
