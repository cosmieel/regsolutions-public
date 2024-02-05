# Site UI

UI компоненты сайта

## Stack

- Vue v3
- pinia

## Usage

1. Установка пакета site-ui для проекта

   ```sh
   npm install --save site-ui -w=<workspace>
   ```

1. Подключение пакета

   ```ts
   import { DsLayout } from 'site-ui';

   <DsLayout :meta="meta" :content="content" />

   ```

1. Обновление пакета иконок

   - Получить токен FIGMA
   - Установить токен в env. FIGMA_TOKEN=
   - Запустить скрипт

   ```sh
   node packages/site-ui/src/scripts/fetch-icons/fetch-icons.js
   ```

   - Старые иконки удаляться, новые загрузятся

1. Установка брейк-поинтов

   - в app.vue:

   ```js
   import { useBreakPoint } from 'site-ui/src/break-point/break-point';

   const breakPoint = useBreakPoint();
   reakPoint.init();
   ```

1. Подключение стилей дизайн-системы

   - В main.js:

   ```js
   import 'site-ui/src/style/style.css';
   ```

1. Подключение пользовательского цвета

   - В main.js:

   ```js
   import { setAccentColor } from 'site-ui/src/colors/set-accent-colors';
   import 'site-ui/src/colors/colors.css';

   setAccentColor(window.website.color, window.website.isColorLight);
   ```
