<template>
  <CardWrapper title="Настройка блока" :has-changed="hasChanged" @cancel="cancel" @save="save">
    <FieldHeadline title="Основное" />
    <FieldGroup v-if="data.theme !== 'default'" title="Изображения" tooltip="Формат PNG/JPEG1">
      <itemPicture
        v-if="data.image"
        v-model="data.image"
        :url="data.image"
        :disabled="true"
        @delete="deleteImage"
      />
      <ItemUploader v-else @upload="onUpload" />
    </FieldGroup>
    <FieldGroup title="Заголовок">
      <ItemInput v-model="data.contentTitle" />
    </FieldGroup>
    <FieldGroup title="Подзаголовок">
      <ItemTextarea v-model="data.description" :rows="2" />
    </FieldGroup>
    <FieldGroup title="Оферта">
      <ItemTextarea v-model="data.privacyText" :rows="4" />
    </FieldGroup>
    <FieldGroup title="Кнопка">
      <ItemSetting v-if="hasData" title="Кнопка" :text="data.button?.text" @delete="deleteButton">
        <FieldGroup title="Текст">
          <ItemInput v-model="data.button.text" />
        </FieldGroup>
      </ItemSetting>
      <ItemSettingTrigger v-if="!hasData" @click="addButton" />
    </FieldGroup>
    <FieldDivider />
    <FieldGroup title="Поля ввода">
      <ItemSetting
        v-for="(field, fieldIndex) in data.fields"
        :key="fieldIndex"
        title="Поле ввода"
        :text="field.label"
        @delete="deleteField(fieldIndex)"
      >
        <FieldGroup title="Лейбл">
          <ItemInput v-model="field.label" />
        </FieldGroup>
        <FieldGroup title="Тип">
          <ItemSelect v-model="selects[fieldIndex]" :list="list" />
        </FieldGroup>
        <FieldGroup title="Поле обязательно">
          <ItemChoice v-model="field.required" />
        </FieldGroup>
      </ItemSetting>
      <ItemSettingTrigger @click="addField" />
    </FieldGroup>
    <FieldDivider />

    <FieldHeadline title="Дополнительно" />
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
import { ref, reactive, computed, inject, watch, toRaw } from 'vue';
import CardWrapper from '../../components/card-wrapper.vue';
import FieldDivider from '../../components/field-divider.vue';
import FieldGroup from '../../components/field-group.vue';
import FieldHeadline from '../../components/field-headline.vue';
import ItemChoice from '../../components/item-choice.vue';
import ItemInput from '../../components/item-input.vue';
import itemPicture from '../../components/item-picture.vue';
import ItemSelect from '../../components/item-select.vue';
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
const fieldTypes = [
  {
    type: 'email',
    text: 'E-mail',
  },
  {
    type: 'phone',
    text: 'Телефон',
  },
  {
    type: 'text',
    text: 'Однострочный текст',
  },
  {
    type: 'textarea',
    text: 'Многострочный текст',
  },
];

const hasData = computed(() => {
  return data.value.button && Object.keys(data.value.button).length > 0;
});

async function onUpload(file) {
  const url = await uploadImage(file);

  data.value.image = url;
}

function deleteImage() {
  data.value.image = '';
}

function deleteButton() {
  data.value.button = [];
}

function addButton() {
  data.value.button = {
    text: 'Новый элемент',
  };
}

const list = ref(fieldTypes.map((field) => field.text));

const selects = reactive(getSelects());

watch(
  () => selects,
  (newSelects) => {
    for (const [index, field] of data.value.fields.entries()) {
      const fieldType = fieldTypes.find((field) => field.text === toRaw(newSelects)[index]).type;
      field.type = fieldType;
    }
  },
  { deep: true }
);

function addField() {
  data.value.fields.push({
    label: 'Новый элемент',
    type: 'text',
    required: false,
  });

  updateNameField();

  selects.value = getSelects();
}

function deleteField(index) {
  data.value.fields.splice(index, 1);
  updateNameField();
}

function updateNameField() {
  for (const [index, field] of data.value.fields.entries()) {
    field.name = `field${index + 1}`;
  }
}

function getSelects() {
  return data.value.fields.map((field) => fieldTypes.find((item) => item.type === field.type).text);
}

defineExpose({
  hasChanged,
});
</script>
