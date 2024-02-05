# Site Builder

Коструктор сайта

## Stack

- Vue v3
- pinia

## Usage

1. Установка пакета site-ui для проекта

   ```sh
   npm install --save sandbox -w=<workspace>
   ```

1. Подключение пакета

   ```ts
   import { DsLayout } from 'site-ui';

   <DsLayout :meta="meta" :content="content" :router="routerTest" />

   ```
