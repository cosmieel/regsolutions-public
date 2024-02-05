<template>
  <CardWrapper title="Настройка блока" :has-changed="hasChanged" @cancel="cancel" @save="save">
    <FieldHeadline title="Основное" />
    <FieldGroup title="Иконки и текст">
      <ItemSetting
        v-for="(mainTag, mainTagIndex) in data.tags.main"
        :key="mainTagIndex"
        title="Иконка и текст"
        :text="mainTag.text"
        @delete="deletemainTag(mainTagIndex)"
      >
        <FieldGroup title="Иконка">
          <ItemSettingIcon v-model="mainTag.icon" mode="select" />
        </FieldGroup>
        <FieldGroup title="Текст">
          <ItemInput v-model="mainTag.text" />
        </FieldGroup>
      </ItemSetting>
      <ItemSettingTrigger @click="addMainTag()" />
    </FieldGroup>

    <FieldDivider />

    <FieldGroup title="Теги">
      <ItemSetting
        v-for="(otherTag, otherTagIndex) in data.tags.other"
        :key="otherTagIndex"
        title="Теги"
        :text="otherTag.text"
        @delete="deleteOtherTag(otherTagIndex)"
      >
        <FieldGroup title="Иконка">
          <ItemSettingIcon
            v-if="otherTag.icon"
            v-model="otherTag.icon"
            mode="setting"
            @delete="deletOtherTagIcon(otherTagIndex)"
          />
          <ItemSettingTrigger v-else @click="addOtherTagIcon(otherTagIndex)" />
        </FieldGroup>
        <FieldGroup title="Текст">
          <ItemInput v-model="otherTag.text" />
        </FieldGroup>
      </ItemSetting>
      <ItemSettingTrigger @click="addOtherTag()" />
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
import { ref, computed } from 'vue';
import CardWrapper from '../../components/card-wrapper.vue';
import FieldDivider from '../../components/field-divider.vue';
import FieldGroup from '../../components/field-group.vue';
import FieldHeadline from '../../components/field-headline.vue';
import ItemChoice from '../../components/item-choice.vue';
import ItemInput from '../../components/item-input.vue';
import ItemSettingIcon from '../../components/item-setting-icon.vue';
import ItemSettingTrigger from '../../components/item-setting-trigger.vue';
import ItemSetting from '../../components/item-setting.vue';

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

function addMainTag() {
  data.value.tags.main.push({
    icon: 'checkmark',
    text: 'Новый элемент',
  });
}

function deletemainTag(index) {
  data.value.tags.main.splice(index, 1);
}

function addOtherTag() {
  data.value.tags.other.push({
    icon: '',
    text: 'Новый элемент',
  });
}

function deleteOtherTag(index) {
  data.value.tags.other.splice(index, 1);
}

function addOtherTagIcon(index) {
  data.value.tags.other[index].icon = 'checkmark';
}

function deletOtherTagIcon(index) {
  data.value.tags.other[index].icon = '';
}

defineExpose({
  hasChanged,
});
</script>
