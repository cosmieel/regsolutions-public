<template>
  <div class="ui-pagination">
    <UiPaginationBase
      v-model="page"
      :total-count="totalCount"
      :per-page="perPage"
      :max-pages-shown="3"
      :on-page-selected="handlePageSelect"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { UiPaginationBase } from './index.js';

const router = useRouter();
const route = useRoute();

const page = ref(Number(route.query.page) || 1);

defineProps({
  totalCount: {
    type: Number,
    required: true,
  },

  perPage: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['page-select']);

const handlePageSelect = (page) => {
  router.push({ query: { ...route.query, page: page } });

  emit('page-select', page);
};
</script>
