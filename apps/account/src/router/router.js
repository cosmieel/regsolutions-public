import { createWebHistory, createRouter } from 'vue-router';
import { routes } from './routes.js';

const history = createWebHistory();

export const router = createRouter({
  history,
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach(async (to) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  if (!isAuthenticated && to.name !== 'signup') {
    return { name: 'signup' };
  }

  if (isAuthenticated && to.name === 'signup') {
    return { name: 'wizardWelcome' };
  }
});
