<template>
  <CardWrapper title="Настройка блока" :has-changed="hasChanged" @cancel="cancel" @save="save">
    <FieldHeadline title="Основное" />
    <FieldGroup title="Колонка 1">
      <ItemInput v-model="data.price[0].head[0]" />
    </FieldGroup>
    <FieldGroup title="Колонка 2">
      <ItemInput v-model="data.price[0].head[1]" />
    </FieldGroup>
    <FieldGroup title="Колонка 3">
      <ItemInput v-model="data.price[0].head[2]" />
    </FieldGroup>

    <FieldDivider />

    <FieldGroup title="Строки">
      <template v-for="(line, lineIndex) in data.price" :key="lineIndex">
        <ItemSetting
          v-if="Object.keys(line)[0] === 'body'"
          title="Строка"
          :text="line.body[0]"
          @delete="deleteLine(lineIndex)"
        >
          <FieldGroup title="Колонка 1">
            <ItemInput v-model="line.body[0]" />
          </FieldGroup>
          <FieldGroup title="Колонка 2">
            <ItemInput v-model="line.body[1]" />
          </FieldGroup>
          <FieldGroup title="Колонка 3">
            <ItemInput v-model="line.body[2]" />
          </FieldGroup>
        </ItemSetting>
      </template>
      <ItemSettingTrigger @click="addLine()" />
    </FieldGroup>

    <FieldGroup title="Описание">
      <ItemTextarea v-model="data.price.at(-1).description" :rows="2" />
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

function deleteLine(index) {
  data.value.price.splice(index, 1);
}

function addLine() {
  const index = data.value.price.length - 1;
  const description = data.value.price.at(-1);
  data.value.price.splice(index, 1, { body: ['Новый элемент', '', ''] }, description);
}

defineExpose({
  hasChanged,
});
</script>
