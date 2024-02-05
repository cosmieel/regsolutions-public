/* eslint-disable import/no-default-export */
import { fileURLToPath } from 'node:url';
import Vue from '@vitejs/plugin-vue';
import { mergeConfig } from 'vite';
import { configDefaults, defineConfig } from 'vitest/config';
import viteConfig from './vite.config.js';

export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [Vue()],
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('src/', import.meta.url)),
    },
  })
);
