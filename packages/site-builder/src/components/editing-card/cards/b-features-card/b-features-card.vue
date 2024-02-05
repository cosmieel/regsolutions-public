<template>
  <CardWrapper title="Настройка блока" :has-changed="hasChanged" @cancel="cancel" @save="save">
    <FeildHeadline title="Основное" />
    <FieldGroup title="Секции">
      <ItemSetting
        v-for="(feature, featureIndex) in data.features"
        :key="featureIndex"
        title="Секция"
        :text="feature.title"
        @delete="deleteSetting(featureIndex)"
      >
        <FieldGroup title="Заголовок">
          <ItemInput v-model="feature.title" />
        </FieldGroup>
        <FieldGroup title="Описание">
          <ItemTextarea v-model="feature.text" />
        </FieldGroup>
      </ItemSetting>
      <ItemSettingTrigger @click="clickTrigger" />
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

function deleteSetting(index) {
  data.value.features.splice(index, 1);
}

function clickTrigger() {
  data.value.features.push({
    title: '',
    text: 'Новый элемент',
  });
}

defineExpose({
  hasChanged,
});
</script>
