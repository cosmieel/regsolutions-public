/* eslint-disable unicorn/consistent-function-scoping */
import { defineStore, setActivePinia, createPinia } from 'pinia';
import { getDefaultBlockData } from 'site-builder/src/services/get-default-block-data/get-default-block-data.js';
import { getDefaultFooterData } from 'site-builder/src/services/get-default-footer-data/get-default-footer-data.js';
import { getDefaultHeaderData } from 'site-builder/src/services/get-default-header-data/get-default-header-data.js';
import { ref, computed, nextTick, watch, toRaw } from 'vue';
import { defaultSiteData } from './default-site-data.js';

setActivePinia(createPinia());

export const useSiteStorage = defineStore('site-storage', () => {
  const storage = ref(null);
  const animationTime = ref(null);
  const callbackStack = [];
  const events = [];
  let createBlock = null;

  const blocksId = computed(() => {
    const blocksId = [];

    for (const block of storage.value.content.blocks) {
      blocksId.push(block.id);
    }

    return blocksId;
  });

  const catalogsId = computed(() => {
    return storage.value.content.catalogs.map((catalog) => catalog.id);
  });

  watch(
    () => storage,
    () => {
      if (callbackStack.length > 0) {
        for (const callback of callbackStack) {
          callback();
        }
      }
    },
    { deep: true }
  );

  function init(data, time, callbackCreateBlock) {
    storage.value = data || defaultSiteData;
    animationTime.value = time;

    if (callbackCreateBlock.toString() === '() => {}') {
      return;
    }

    createBlock = callbackCreateBlock;
  }

  async function addBlock(type, parameters) {
    const blockData = getDefaultBlockData(type, parameters, catalogsId.value);
    const id = createBlock ? await createBlock(blockData) : generateBlockId();
    storage.value.content.blocks.push({ ...blockData, id });

    events.createBlock(blockData);
  }

  function addHeader(parameters) {
    const headerData = getDefaultHeaderData(parameters);
    storage.value.options.layout.header = headerData;
    events.updateLayout(JSON.parse(JSON.stringify(storage.value.options.layout)));
  }

  function addFooter(parameters) {
    const footerData = getDefaultFooterData(parameters);
    storage.value.options.layout.footer = footerData;
    events.updateLayout(JSON.parse(JSON.stringify(storage.value.options.layout)));
  }

  function getType(block) {
    if (block.tagName === 'HEADER') {
      return 'DsHeader';
    }

    if (block.tagName === 'FOOTER') {
      return 'DsFooter';
    }

    const blockId = getBlockId(block);

    for (const block of storage.value.content.blocks) {
      if (block.id === blockId) {
        return block.type;
      }
    }
  }

  function getBlockData(currentBlock) {
    const data = storage.value.content.blocks.find(
      (block) => block.id === getBlockId(currentBlock)
    );

    return structuredClone(toRaw(data));
  }

  function getHeaderData() {
    return structuredClone(toRaw(storage.value.options.layout.header));
  }

  function getFooterData() {
    return structuredClone(toRaw(storage.value.options.layout.footer));
  }

  function changeBlockData(blockData, index) {
    storage.value.content.blocks.splice(index, 1);

    nextTick(() => {
      storage.value.content.blocks.splice(index, 0, blockData);
      events.updateBlock(toRaw(blockData));
    });
  }

  function changeHeaderData(data) {
    delete storage.value.options.layout.header;

    nextTick(() => {
      storage.value.options.layout.header = data;
      events.updateLayout(JSON.parse(JSON.stringify(storage.value.options.layout)));
    });
  }

  function changeFooterData(data) {
    delete storage.value.options.layout.footer;

    nextTick(() => {
      storage.value.options.layout.footer = data;
      events.updateLayout(JSON.parse(JSON.stringify(storage.value.options.layout)));
    });
  }

  function getBlockIndex(currentBlock) {
    const id = getBlockId(currentBlock);

    if (id) {
      return blocksId.value.indexOf(id);
    }
  }

  function getBlockId(currentBlock) {
    return currentBlock.firstElementChild?.id.replace('block-', '');
  }

  function deleteBlock(currentBlock) {
    events.deleteBlock(getBlockData(currentBlock));

    storage.value.content.blocks = storage.value.content.blocks.filter(
      (block) => block.id !== getBlockId(currentBlock)
    );
  }

  function deleteHeader() {
    delete storage.value.options.layout.header;
    events.updateLayout(JSON.parse(JSON.stringify(storage.value.options.layout)));
  }

  function deleteFooter() {
    delete storage.value.options.layout.footer;

    events.updateLayout(JSON.parse(JSON.stringify(storage.value.options.layout)));
  }

  function getActive(currentBlock) {
    const type = getType(currentBlock);

    if (type === 'DsHeader' || type === 'DsFooter') {
      return null;
    }

    return getBlockData(currentBlock).active;
  }

  function changeActive(currentBlock) {
    const blockId = getBlockId(currentBlock);

    for (const block of storage.value.content.blocks) {
      if (block.id === blockId) {
        block.active = !block.active;

        events.updateBlock(toRaw(block));
      }
    }
  }

  function moveUp(currentBlock) {
    const index = getBlockIndex(currentBlock);
    const block = storage.value.content.blocks[index];

    storage.value.content.blocks.splice(index, 1);

    nextTick(() => {
      setTimeout(() => {
        storage.value.content.blocks.splice(index - 1, 0, block);
        events.changeOrder(JSON.parse(JSON.stringify(storage.value.content.blocks)));
      }, animationTime.value);
    });
  }

  function moveDown(currentBlock) {
    const index = getBlockIndex(currentBlock);
    const block = storage.value.content.blocks[index];

    storage.value.content.blocks.splice(index, 1);

    nextTick(() => {
      setTimeout(() => {
        storage.value.content.blocks.splice(index + 1, 0, block);
        events.changeOrder(JSON.parse(JSON.stringify(storage.value.content.blocks)));
      }, animationTime.value);
    });
  }

  // Для компонентов, которые реагируют на любые изменения

  function onChangeStorage(callback) {
    if (typeof callback === 'function') {
      callbackStack.push(callback);
    }
  }

  function destroyCallback(callback) {
    if (callbackStack.includes(callback)) {
      const index = callbackStack.indexOf(callback);

      callbackStack.splice(index, 1);
    }
  }

  // End

  // set Events

  function setEventCreateBlock(callback) {
    events.createBlock = callback;
  }

  function setEventDeleteBlock(callback) {
    events.deleteBlock = callback;
  }

  function setEventUpdateBlock(callback) {
    events.updateBlock = callback;
  }

  function setEventChangeOrder(callback) {
    events.changeOrder = callback;
  }

  function setEventUpdateLayout(callback) {
    events.updateLayout = callback;
  }

  // End

  // Кастомное получение id (без бекенда)

  function generateBlockId() {
    const id = (Math.random() * 10_000).toFixed(0);

    if (checkContainBlocksId(id)) {
      return generateBlockId();
    }

    return id;
  }

  function checkContainBlocksId(id) {
    return blocksId.value.includes(id);
  }

  // END

  return {
    storage,
    blocksId,
    catalogsId,
    init,
    addBlock,
    addHeader,
    addFooter,
    getType,
    getBlockData,
    getHeaderData,
    getFooterData,
    changeBlockData,
    changeHeaderData,
    changeFooterData,
    getBlockIndex,
    deleteBlock,
    deleteHeader,
    deleteFooter,
    getActive,
    changeActive,
    moveUp,
    moveDown,
    onChangeStorage,
    destroyCallback,
    setEventCreateBlock,
    setEventDeleteBlock,
    setEventUpdateBlock,
    setEventChangeOrder,
    setEventUpdateLayout,
  };
});
