/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable import/extensions */
/* eslint-disable unicorn/prefer-node-protocol */
/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable unicorn/no-array-reduce */
require('dotenv').config();

const fs = require('fs/promises');
const path = require('path');
const FigmaHelper = require('./figma-helper');
const { FIGMA_TOKEN } = process.env;
const MAIN_FILE = '../../design-system/ds-icon/icons.js';
const ICONS_DIR = '../../design-system/ds-icon/icons';
const FIGMA_API_HOST = 'https://api.figma.com/v1';
const ICONS_FILE_KEY = 'BbUrxOy1jlAfvyBH4OoItX';
const ICONS_CANVAS = 'Icons';
const ICONS_TYPE = 'COMPONENT';
const ICON_SECTION = 'SECTION';
const iconNode = [];
const figmaHelper = new FigmaHelper(FIGMA_API_HOST, FIGMA_TOKEN, ICONS_FILE_KEY);
let figmaDocument;
let iconUrls;
let downloadableIcons;

function kebabToCamel(string) {
  return string
    .split('-')
    .map((item) => item[0].toUpperCase() + item.slice(1, item.length))
    .join('');
}

async function fetchIcons() {
  if (!FIGMA_TOKEN) {
    console.error(
      'No figma token found! Make sure FIGMA_TOKEN is in your .env file or is in your environment variables'
    );
  }

  try {
    figmaDocument = await figmaHelper.getDocument();
  } catch (error) {
    console.error('Something terrible happened!');
    console.log(error);
  }

  const [iconsData] = figmaDocument?.children.filter((item) => item.name === ICONS_CANVAS);

  for (const item of iconsData.children) {
    if (item.type === ICON_SECTION) {
      iconNode.push(...item.children.filter((node) => node.type === ICONS_TYPE));
    }
  }

  try {
    const iconsIds = iconNode
      .reduce((accumulator, item) => [...accumulator, item.id], [])
      .join(',');

    iconUrls = await figmaHelper.getIconsUrls(iconsIds);
    downloadableIcons = iconNode.map((icon) => ({
      ...icon,
      url: iconUrls[icon.id],
    }));
  } catch (error) {
    console.error('Something terrible happened!');
    console.log(error);
  }

  console.log('Обновление svg-файлов');

  const folderPath = path.resolve(__dirname, `${ICONS_DIR}`);

  await fs.rm(folderPath, { force: true, recursive: true });
  await fs.mkdir(folderPath, { recursive: true });

  await Promise.all(
    downloadableIcons.map(async ({ name, url }) => {
      try {
        const icon = await figmaHelper.getIcon(url);
        const markup = icon.replace(' width="24" height="24"', '');

        await fs.writeFile(path.join(folderPath, `${name}.svg`), markup);
      } catch (error) {
        console.error(`Failed to fetch icon ${name}. Original error message/object:`);
        console.log(error?.message || error);
        throw error;
      }
    })
  );

  console.log('Обновление icons.js');

  try {
    const iconNames = iconNode.map((item) => item.name);
    let contentIcons = '';

    for (const name of iconNames) {
      contentIcons = `${contentIcons}
    export { default as ${kebabToCamel(name)} } from './icons/${name}.svg';
    `;
    }

    await fs.writeFile(path.resolve(__dirname, `${MAIN_FILE}`), contentIcons);
  } catch (error) {
    console.error(`Failed to update icons.js. Original error message/object:`);
    console.log(error?.message || error);
    throw error;
  }

  console.log('Icons update completed! Good job :)');
}

// eslint-disable-next-line unicorn/prefer-top-level-await
fetchIcons();
