import { OPTIONS_KEY } from 'site-ui/src/services/constants/constants.js';
import { constructMediaUrl } from 'site-ui/src/services/construct-media-url/construct-media-url';
import { computed, inject, unref } from 'vue';

export const useImageSizer = (path, size) => {
  const options = inject(OPTIONS_KEY);

  return computed(() => {
    const unrefPath = unref(path);

    return unrefPath
      ? constructMediaUrl(`${options.hosts.storage}${unrefPath}`, options?.hosts?.resizer, size)
      : '';
  });
};
