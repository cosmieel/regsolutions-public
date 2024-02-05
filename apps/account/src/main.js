import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { createPinia } from 'pinia';
import('preline');
import { createApp } from 'vue';
import('preline');
import App from './app.vue';
import config from './config/config.js';
import { router } from './router/router.js';
import './assets/main.css';
import './index.css';
import 'font-ui';
import 'account-ui/src/assets/main.css';

const pinia = createPinia();
const app = createApp(App);

if (config.sentry.dsn) {
  Sentry.init({
    dsn: config.sentry.dsn,
    integrations: [new Integrations.Vue({ Vue: app, attachProps: true })],
  });
}

app.use(pinia);
app.use(router);
app.use(VueQueryPlugin);

app.mount('#app');
