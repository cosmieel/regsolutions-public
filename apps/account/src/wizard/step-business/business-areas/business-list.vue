<template>
  <ul class="business-list">
    <li v-for="item in businessItems" :key="item.id">
      <UiSmallCard
        :is-card-selected="selectedBusiness === item.id"
        :icon-name="item.iconName"
        :icon-bg="item.iconBg"
        :icon-fill="item.iconFill"
        :title="item.title"
        @click="selectBusiness(item.id)"
      />
    </li>
  </ul>
</template>

<script setup>
import { UiSmallCard } from 'account-ui';
import { onMounted, reactive, ref } from 'vue';

const businessItems = reactive([
  {
    id: 0,
    title: 'Отель',
    iconName: 'bedroom',
    iconBg: 'bg-blue-50',
    iconFill: 'text-blue-500',
    type: 'HOTELS',
  },
  {
    id: 1,
    title: 'Интернет-магазин',
    iconName: 'shop',
    iconBg: 'bg-indigo-50',
    iconFill: 'text-indigo-500',
    type: 'MARKET',
  },
  {
    id: 2,
    title: 'Бьюти',
    iconName: 'beauty',
    iconBg: 'bg-violet-50',
    iconFill: 'text-violet-500',
    type: 'BEAUTY',
  },
  {
    id: 3,
    title: 'Ресторан',
    iconName: 'restaurant',
    iconBg: 'bg-purple-50',
    iconFill: 'text-purple-500',
    type: 'CAFE',
  },
  {
    id: 4,
    title: 'Обучение',
    iconName: 'education',
    iconBg: 'bg-fuchsia-50',
    iconFill: 'text-fuchsia-500',
    type: 'COURSE',
  },
  {
    id: 5,
    title: 'Медицина',
    iconName: 'medstuff',
    iconBg: 'bg-pink-50',
    iconFill: 'text-pink-500',
    type: 'MEDICINE',
  },
  {
    id: 6,
    title: 'Другое',
    iconName: 'more',
    iconBg: '',
    iconFill: 'text-gray-700',
    type: 'OTHER',
  },
]);

const selectedBusiness = ref('');

const emit = defineEmits(['select-business']);

function selectBusiness(index) {
  selectedBusiness.value = index;

  emit('select-business', businessItems[index].type);
}

onMounted(() => {
  if (localStorage.getItem('wizard')) {
    const index = businessItems.findIndex((item) => {
      return item.type == JSON.parse(localStorage.getItem('wizard')).type;
    });

    if (index !== -1) {
      selectBusiness(index);
    }
  }
});
</script>

<style lang="postcss" scoped>
.business-list {
  @apply space-y-4 max-h-[338px] px-[12px] mx-[-12px] pt-[12px] mt-[-12px] pb-14 overflow-y-scroll;
}
</style>
