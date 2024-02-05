<template>
  <CardWrapper title="Настройка блока" :has-changed="hasChanged" @cancel="cancel" @save="save">
    <FeildHeadline title="Основное" />
    <FieldGroup title="Текст">
      <ItemTextarea v-model="data.text" />
    </FieldGroup>
    <FieldGroup title="Кнопка">
      <ItemSetting v-if="hasData" title="Кнопка" :text="data.button?.text" @delete="deleteSetting">
        <FieldGroup title="Текст">
          <ItemInput v-model="data.button.text" />
        </FieldGroup>
        <FieldGroup title="Ссылка">
          <ItemInput v-model="data.button.url" />
        </FieldGroup>
      </ItemSetting>
      <ItemSettingTrigger v-if="!hasData" @click="clickTrigger" />
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
import FeildHeadline from '../../components/field-headline.vue';
import ItemChoice from '../../components/item-choice.vue';
import ItemInput from '../../components/item-input.vue';
import ItemSettingTrigger from '../../components/item-setting-trigger.vue';
import ItemSetting from '../../components/item-setting.vue';
import ItemTextarea from '../../components/item-textarea.vue';

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
const hasData = computed(() => {
  return data.value.button && Object.values(data.value.button).some((value) => !!value);
});

function deleteSetting() {
  data.value.button = { text: '', url: '' };
}

function clickTrigger() {
  data.value.button = {
    text: 'Новый элемент',
    url: '',
  };
}

defineExpose({
  hasChanged,
});
</script>
