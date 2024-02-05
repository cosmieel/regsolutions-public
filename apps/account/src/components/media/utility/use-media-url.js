import { useUserAccountStore } from 'account/src/user-account/stores/user-account';
import { computed } from 'vue';
import { getPathWithSizer } from './get-path-with-sizer.js';
import { getFullMediaSource } from '../utility/get-full-media-source.js';

export const useMediaUrl = (path, size) => {
  const userAccountStore = useUserAccountStore();

  const url = computed(() => userAccountStore.currentImagesStorage);

  return computed(() => (path ? getPathWithSizer(getFullMediaSource(path, url.value), size) : ''));
};
