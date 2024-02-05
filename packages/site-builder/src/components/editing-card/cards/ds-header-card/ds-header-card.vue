<template>
  <CardWrapper title="Настройка блока" :has-changed="hasChanged" @cancel="cancel" @save="save">
    <FieldGroup title="Пункты меню">
      <DragableGroup :list="data.menuItems">
        <ItemSetting
          v-for="(item, index) in data.menuItems"
          :key="index"
          title="Пункт меню"
          :text="item.text"
          @delete="deleteMenuItems(index)"
        >
          <FieldGroup title="Текст">
            <ItemInput v-model="item.text" />
          </FieldGroup>
          <FieldGroup
            v-if="item.url || item.url === ''"
            title="Ссылка"
            :disabled="item.group && item.group.length > 0"
          >
            <ItemInput v-model="item.url" :disabled="item.group && item.group.length > 0" />
          </FieldGroup>

          <template v-if="item.group">
            <FieldDivider />
            <FieldGroup title="Подпункты">
              <DragableGroup :list="item.group">
                <ItemSetting
                  v-for="(subitem, subindex) in item.group"
                  :key="subindex"
                  title="Подпункт"
                  :text="subitem.text"
                  @delete="deleteSubMenuItems(index, subindex)"
                >
                  <FieldGroup title="Текст">
                    <ItemInput v-model="subitem.text" />
                  </FieldGroup>
                  <FieldGroup title="Ссылка">
                    <ItemInput v-model="subitem.url" />
                  </FieldGroup>
                </ItemSetting>
              </DragableGroup>

              <ItemSettingTrigger @click="clickSubtrigger(item.group)" />
            </FieldGroup>
          </template>
        </ItemSetting>
      </DragableGroup>

      <ItemSettingTrigger v-if="data.menuItems.length < 4" @click="clickTrigger" />
    </FieldGroup>
    <FieldDivider />
    <FieldGroup title="Кнопки">
      <ItemSetting
        v-for="(button, index) in data.buttons"
        :key="index"
        title="Кнопка"
        :text="button.text"
        @delete="deleteButton(index)"
      >
        <FieldGroup title="Текст">
          <ItemInput v-model="button.text" />
        </FieldGroup>
        <FieldGroup title="Ссылка">
          <ItemInput v-model="button.url" />
        </FieldGroup>
      </ItemSetting>
      <ItemSettingTrigger v-if="data.buttons.length < 2" @click="clickButtontrigger()" />
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
const data = ref(siteStorage.getHeaderData());

const hasChanged = computed(() => {
  return JSON.stringify(data.value) !== JSON.stringify(siteStorage.getHeaderData());
});

function save() {
  siteStorage.changeHeaderData(data.value);
  data.value = siteStorage.getHeaderData();
  emit('save');
}

function cancel() {
  data.value = siteStorage.getHeaderData();
  emit('cancel');
}

// Дочерняя логика

function deleteMenuItems(index) {
  data.value.menuItems.splice(index, 1);
}

function clickTrigger() {
  data.value.menuItems.push({
    text: 'Новый элемент',
    url: '',
    group: [],
  });
}

function deleteSubMenuItems(index, subindex) {
  data.value.menuItems[index].group.splice(subindex, 1);
}

function clickSubtrigger(group) {
  group.push({
    text: 'Новый элемент',
    url: '',
  });
}

function deleteButton(index) {
  data.value.buttons.splice(index, 1);
}

function clickButtontrigger() {
  data.value.buttons.push({
    text: 'Новый элемент',
    url: '',
  });
}

defineExpose({
  hasChanged,
});
</script>
