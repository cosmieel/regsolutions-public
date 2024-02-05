/* eslint-disable no-undef */
/* eslint-disable import/no-default-export */
import { fileURLToPath, URL } from 'node:url';
import Vue from '@vitejs/plugin-vue';
import { defineConfig, loadEnv } from 'vite';
import svgLoader from 'vite-svg-loader';

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = Object.assign(process.env, loadEnv(mode, process.cwd(), ''));

  return defineConfig({
    server: {
      port: 8092,
    },

    plugins: [
      Vue({
        template: {
          compilerOptions: {
            isCustomElement: (tag) => tag.startsWith('swiper-'),
          },
        },
      }),
      svgLoader(),
    ],

    optimizeDeps: {
      exclude: ['vue-demi'],
    },

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('src', import.meta.url)),
      },
    },
  });
};
