<template>
  <CardWrapper title="Настройка блока" :has-changed="hasChanged" @cancel="cancel" @save="save">
    <FeildHeadline title="Основное" />
    <FieldGroup title="Карточки">
      <DragableGroup :list="data.cards">
        <ItemSetting
          v-for="(card, cardIndex) in data.cards"
          :key="cardIndex"
          title="Карточка"
          :text="card.title"
          @delete="deleteSetting(cardIndex)"
        >
          <FieldGroup title="Изображение" tooltip="Формат PNG/JPEG">
            <itemPicture
              v-if="card.image"
              v-model="card.image"
              :url="card.image"
              :disabled="true"
              @delete="deleteImage(cardIndex)"
            />
            <ItemUploader v-else @upload="(file) => onUpload(file, cardIndex)" />
          </FieldGroup>
          <FieldGroup title="Заголовок">
            <ItemInput v-model="card.title" />
          </FieldGroup>
          <FieldGroup title="Описание">
            <ItemTextarea v-model="card.description" />
          </FieldGroup>
          <FieldGroup title="Кнопка">
            <ItemSetting
              v-if="card.button"
              title="Кнопка"
              :text="card.button.text"
              @delete="deleteButtonSetting(cardIndex)"
            >
              <FieldGroup title="Текст">
                <ItemInput v-model="card.button.text" />
              </FieldGroup>
              <FieldGroup title="Ссылка">
                <ItemInput v-model="card.button.url" />
              </FieldGroup>
            </ItemSetting>
            <ItemSettingTrigger v-else @click="clickButtonTrigger(cardIndex)" />
          </FieldGroup>
        </ItemSetting>
      </DragableGroup>

      <ItemSettingTrigger @click="clickTrigger" />
    </FieldGroup>

    <FieldDivider />

    <FeildHeadline title="Дополнительно" />
    <FieldGroup title="Заголовок">
      <ItemInput v-model="data.title" />
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
import FeildHeadline from '../../components/field-headline.vue';
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

function deleteSetting(index) {
  data.value.cards.splice(index, 1);
}

function clickTrigger() {
  data.value.cards.push({
    title: 'Новый элемент',
    description: '',
    image: '',
  });
}

async function onUpload(file, index) {
  const url = await uploadImage(file);
  data.value.cards[index].image = url;
}

function deleteImage(index) {
  data.value.cards[index].image = '';
}

function deleteButtonSetting(index) {
  delete data.value.cards[index].button;
}

function clickButtonTrigger(index) {
  data.value.cards[index].button = {
    text: 'Новый элемент',
    url: '',
  };
}

defineExpose({
  hasChanged,
});
</script>
