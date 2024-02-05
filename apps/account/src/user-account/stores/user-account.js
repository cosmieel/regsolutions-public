import { useQueryClient } from '@tanstack/vue-query';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { getOptions, useOptionsQuery } from '../composables/options-query.js';

export const useUserAccountStore = defineStore('userAccount', () => {
  const queryClient = useQueryClient();
  const queryCache = queryClient.getQueryCache();

  const { isSuccess, data: options } = useOptionsQuery();

  const currentImagesStorage = ref('');

  async function setCurrentImagesStorageFromCache() {
    const dataFromCache = queryCache.queriesMap['["options"]']?.state?.data;

    if (dataFromCache) {
      currentImagesStorage.value = dataFromCache.hosts.storage;

      return;
    }

    const fetchedImagesStorage = await queryClient.fetchQuery({
      queryKey: ['options'],
      queryFn: async () => await getOptions(),
    });

    currentImagesStorage.value = fetchedImagesStorage.hosts.storage;
  }

  watch(isSuccess, async (value) => {
    if (value) {
      await setCurrentImagesStorageFromCache();
    }
  });

  return {
    currentImagesStorage,
    options,
  };
});
