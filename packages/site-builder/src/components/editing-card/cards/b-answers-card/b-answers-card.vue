<template>
  <CardWrapper title="Настройка блока" :has-changed="hasChanged" @cancel="cancel" @save="save">
    <FieldHeadline title="Основное" />
    <FieldGroup title="Вопросы">
      <DragableGroup :list="data.answers">
        <ItemSetting
          v-for="(answer, index) in data.answers"
          :key="index"
          title="Вопрос"
          :text="answer.title"
          @delete="deleteItems(index)"
        >
          <FieldGroup title="Вопрос">
            <ItemTextarea v-model="answer.title" />
          </FieldGroup>
          <FieldGroup title="Ответ">
            <ItemTextarea v-model="answer.text" />
          </FieldGroup>
        </ItemSetting>
      </DragableGroup>

      <ItemSettingTrigger @click="clickTrigger" />
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
import DragableGroup from '../../components/dragable-group.vue';
import FieldDivider from '../../components/field-divider.vue';
import FieldGroup from '../../components/field-group.vue';
import FieldHeadline from '../../components/field-headline.vue';
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

function deleteItems(index) {
  data.value.answers.splice(index, 1);
}

function clickTrigger() {
  data.value.answers.push({
    title: 'Новый элемент',
    text: '',
  });
}

defineExpose({
  hasChanged,
});
</script>
