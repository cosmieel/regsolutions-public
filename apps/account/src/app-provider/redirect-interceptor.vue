<template>
  <slot />
</template>

<script setup>
import { inject, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { IS_AUTHENTICATED_PROVIDE_KEY, IS_ADMIN_PROVIDE_KEY } from './constants.js';

const router = useRouter();

const isAdmin = inject(IS_ADMIN_PROVIDE_KEY);
const isAuthenticated = inject(IS_AUTHENTICATED_PROVIDE_KEY);

router.beforeEach((to, from, next) => {
  if (isAuthenticated.value && to.meta?.hiddenForAdmin?.value && isAdmin.value) {
    return next({ name: to.meta?.hiddenForAdmin.redirect || 'accountMain' });
  }

  next();
});

onBeforeMount(() => {
  const currentRoute = router.currentRoute.value;

  if (isAuthenticated.value && currentRoute.meta?.hiddenForAdmin?.value && isAdmin.value) {
    return router.replace({ name: currentRoute.meta?.hiddenForAdmin.redirect || 'accountMain' });
  }
});
</script>
