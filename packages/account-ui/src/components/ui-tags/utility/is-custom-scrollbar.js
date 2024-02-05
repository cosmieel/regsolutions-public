import { computed } from 'vue';
import { platform } from '../../../utility/get-platform.js';

export const isCustomScrollbar = computed(() => !platform.APPLE && !platform.ANDROID);
