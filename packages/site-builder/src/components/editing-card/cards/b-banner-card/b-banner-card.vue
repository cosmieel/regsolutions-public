<template>
  <CardWrapper title="Настройка блока" :has-changed="hasChanged" @cancel="cancel" @save="save">
    <FieldHeadline v-if="index > 0" title="Основное" />
    <FieldGroup title="Баннеры">
      <DragableGroup :list="data.banners">
        <ItemSetting
          v-for="(banner, bannerIndex) in data.banners"
          :key="bannerIndex"
          title="Баннер"
          :text="banner.title"
          @delete="deleteBanner(bannerIndex)"
        >
          <FieldGroup title="Изображение" tooltip="Формат PNG/JPEG">
            <itemPicture
              v-if="banner.image"
              v-model="banner.image"
              :url="banner.image"
              :disabled="true"
              @delete="deleteImage(bannerIndex)"
            />
            <ItemUploader v-else @upload="(file) => onUpload(file, bannerIndex)" />
          </FieldGroup>
          <FieldGroup title="Заголовок">
            <ItemTextarea v-model="banner.title" :rows="2" />
          </FieldGroup>
          <FieldGroup title="Описание">
            <ItemTextarea v-model="banner.text" :rows="2" />
          </FieldGroup>
          <FieldDivider />
          <FieldGroup title="Кнопки">
            <ItemSetting
              v-for="(button, buttonIndex) in banner.buttons"
              :key="buttonIndex"
              title="Кнопка"
              :text="button.text"
              @delete="deleteButton(buttonIndex, bannerIndex)"
            >
              <FieldGroup title="Текст">
                <ItemInput v-model="button.text" />
              </FieldGroup>

              <FieldGroup title="Ссылка">
                <ItemInput v-model="button.url" />
              </FieldGroup>
            </ItemSetting>
            <ItemSettingTrigger
              v-if="banner.buttons?.length < 2"
              @click="clickButtonTrigger(bannerIndex)"
            />
          </FieldGroup>
        </ItemSetting>
      </DragableGroup>

      <ItemSettingTrigger @click="clickTrigger" />
    </FieldGroup>
    <template v-if="index > 0">
      <FieldHeadline title="Дополнительно" />
      <FieldGroup title="Заголовок">
        <ItemInput v-model="data.title" />
      </FieldGroup>
      <FieldGroup title="Показать фон">
        <ItemChoice v-model="data.backed" />
      </FieldGroup>
    </template>
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

function clickTrigger() {
  data.value.banners.push({
    title: 'Новый элемент',
    text: '',
    image: '',
    buttons: [],
  });
}

function deleteBanner(index) {
  data.value.banners.splice(index, 1);
}

function deleteImage(index) {
  delete data.value.banners[index].image;
}

async function onUpload(file, index) {
  const url = await uploadImage(file);
  data.value.banners[index].image = url;
}

function clickButtonTrigger(index) {
  if (!data.value.banners[index].buttons) {
    data.value.banners[index].buttons = [];
  }

  data.value.banners[index].buttons.push({
    text: 'Новый элемент',
    url: '',
  });
}

function deleteButton(index, bannerIndex) {
  data.value.banners[bannerIndex].buttons.splice(index, 1);
}

defineExpose({
  hasChanged,
});
</script>
