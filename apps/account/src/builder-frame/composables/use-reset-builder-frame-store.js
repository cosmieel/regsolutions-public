import { useRouter } from 'vue-router';
import { useBuilderFrameStore } from '../store/builder-frame-store.js';

export const useResetBuilderStore = () => {
  const router = useRouter();

  const builderFrameStore = useBuilderFrameStore();

  router.beforeEach((to) => {
    if (
      to.name === 'frame' ||
      to.name === 'framePagePreview' ||
      to.path.split('/').includes('configuration')
    ) {
      return;
    }

    builderFrameStore.$reset();
  });
};
