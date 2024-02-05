<template>
  <CardWrapper title="Настройка блока" :has-changed="hasChanged" @cancel="cancel" @save="save">
    <FieldHeadline title="Основное" />
    <FieldGroup title="Координаты">
      <ItemInput v-model="coordinates" />
    </FieldGroup>
    <FieldGroup title="Название">
      <ItemInput v-model="data.address" />
    </FieldGroup>
    <FieldGroup title="Описание">
      <ItemTextarea v-model="data.text" :rows="3" />
    </FieldGroup>
    <FieldDivider />
    <FieldGroup title="Особенности">
      <ItemSetting
        v-for="(feature, featureIndex) in data.features"
        :key="featureIndex"
        title="Особенности"
        :text="feature.title"
        @delete="deleteFeature(featureIndex)"
      >
        <FieldGroup title="Иконка">
          <ItemSettingIcon v-model="feature.icon" mode="select" :groups="['city', 'nature']" />
        </FieldGroup>
        <FieldGroup title="Заголовок">
          <ItemInput v-model="feature.title" />
        </FieldGroup>
        <FieldGroup title="Описание">
          <ItemInput v-model="feature.description" />
        </FieldGroup>
      </ItemSetting>
      <ItemSettingTrigger @click="addFeature" />
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
import { ref, computed, watch } from 'vue';
import CardWrapper from '../../components/card-wrapper.vue';
import FieldDivider from '../../components/field-divider.vue';
import FieldGroup from '../../components/field-group.vue';
import FieldHeadline from '../../components/field-headline.vue';
import ItemChoice from '../../components/item-choice.vue';
import ItemInput from '../../components/item-input.vue';
import ItemSettingIcon from '../../components/item-setting-icon.vue';
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
const coordinates = ref(data.value.coordinates.join(', '));

watch(coordinates, (newCoordinates) => {
  data.value.coordinates = newCoordinates.split(', ');
});

function addFeature() {
  data.value.features.push({
    icon: 'paris',
    title: 'Рядом с достопремечательностями',
    description: 'Поблизости есть популярные туристические места',
  });
}

function deleteFeature(index) {
  data.value.features.splice(index, 1);
}

defineExpose({
  hasChanged,
});
</script>
