<template>
  <CardWrapper title="Настройка блока" :has-changed="hasChanged" @cancel="cancel" @save="save">
    <FieldHeadline title="Основное" />
    <FieldGroup title="Соцсети">
      <DragableGroup :list="data.socials">
        <ItemSetting
          v-for="(social, socialIndex) in data.socials"
          :key="socialIndex"
          title="Соцсеть"
          :text="social.url"
          @delete="deleteSocial(socialIndex)"
        >
          <FieldGroup title="Соцсеть">
            <ItemSettingIcon v-model="social.icon" mode="select" :groups="['socials']" />
          </FieldGroup>
          <FieldGroup v-if="social.icon === 'mail'" title="E-mail">
            <ItemInput v-model="social.url" />
          </FieldGroup>
          <FieldGroup
            v-else-if="social.icon === 'whats-app'"
            title="Телефон"
            tooltip="Формат: +70000000000"
          >
            <ItemInput v-model="social.url" />
          </FieldGroup>
          <FieldGroup v-else title="Ссылка">
            <ItemInput v-model="social.url" />
          </FieldGroup>
        </ItemSetting>
      </DragableGroup>

      <ItemSettingTrigger @click="addSocial" />
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
import ItemSettingIcon from '../../components/item-setting-icon.vue';
import ItemSettingTrigger from '../../components/item-setting-trigger.vue';
import ItemSetting from '../../components/item-setting.vue';

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

function addSocial() {
  data.value.socials.push({
    icon: 'telegram',
    url: '',
  });
}

function deleteSocial(index) {
  data.value.socials.splice(index, 1);
}

defineExpose({
  hasChanged,
});
</script>
