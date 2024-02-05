<template>
  <CardWrapper title="Настройка блока" :has-changed="hasChanged" @cancel="cancel" @save="save">
    <FieldGroup title="Пункты меню">
      <DragableGroup :list="data.items">
        <ItemSetting
          v-for="(item, index) in data.items"
          :key="index"
          title="Пункт меню"
          :text="item.text"
          @delete="deleteItems(index)"
        >
          <FieldGroup title="Название">
            <ItemInput v-model="item.text" />
          </FieldGroup>
          <FieldGroup title="Ссылка">
            <ItemInput v-model="item.url" :disabled="item.group && item.group.length > 0" />
          </FieldGroup>
        </ItemSetting>
      </DragableGroup>

      <ItemSettingTrigger @click="clickTrigger" />
    </FieldGroup>
    <FieldDivider />
  </CardWrapper>
</template>

<script setup>
import { useSiteStorage } from 'site-builder/src/site-storage/site-storage';
import { ref, computed } from 'vue';
import CardWrapper from '../../components/card-wrapper.vue';
import DragableGroup from '../../components/dragable-group.vue';
import FieldDivider from '../../components/field-divider.vue';
import FieldGroup from '../../components/field-group.vue';
import ItemInput from '../../components/item-input.vue';
import ItemSettingTrigger from '../../components/item-setting-trigger.vue';
import ItemSetting from '../../components/item-setting.vue';

defineProps({
  block: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['save', 'cancel']);

const siteStorage = useSiteStorage();
const data = ref(siteStorage.getFooterData());

const hasChanged = computed(() => {
  return JSON.stringify(data.value) !== JSON.stringify(siteStorage.getFooterData());
});

function save() {
  siteStorage.changeFooterData(data.value);
  data.value = siteStorage.getFooterData();
  emit('save');
}

function cancel() {
  data.value = siteStorage.getFooterData();
  emit('cancel');
}

// Дочерняя логика

function deleteItems(index) {
  data.value.items.splice(index, 1);
}

function clickTrigger() {
  data.value.items.push({
    text: 'Новый элемент',
    url: '',
  });
}

defineExpose({
  hasChanged,
});
</script>
