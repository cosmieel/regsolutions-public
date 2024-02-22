/* eslint-disable unicorn/consistent-function-scoping */
import { useQueryClient } from '@tanstack/vue-query';
import config from 'account/src/config/config.js';
import { currency } from 'currency';
import compact from 'lodash/compact';
import { defineStore, storeToRefs } from 'pinia';
import { nextTick, ref, watch, toRaw } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUploadMutation } from '../../components/composables/upload-mutation.js';
import { useCatalogConfigurationStore } from '../../site-configuration/stores/catalog-configuration-store.js';
import { useCatalogItemsConfigurationStore } from '../../site-configuration/stores/catalog-items-configuration-store.js';
import { usePageConfigurationStore } from '../../site-configuration/stores/page-configuration-store.js';
import { useSiteConfigurationStore } from '../../site-configuration/stores/site-configuration-store.js';
import { useUserAccountStore } from '../../user-account/stores/user-account.js';
import { getBlocks } from '../composables/blocks-query.js';
import { useCreateBlockMutation } from '../composables/create-block-mutation.js';
import { useDeleteBlockMutation } from '../composables/delete-block-mutation.js';
import { useDuplicateBlockMutation } from '../composables/duplicate-block-mutation.js';
import { useSortBlocksMutation } from '../composables/sort-blocks-mutation.js';
import { useUpdateBlockMutation } from '../composables/update-block-mutation.js';
import { useUpdateMenuMutation } from '../composables/update-menu-mutation.js';

const INITIAL_DATA = {
  pageState: {},
  meta: {},
  options: {},
  content: {},
  mainPageId: -1,
  isPageChanged: false,
  isInital: false,
  currentPageBlocks: [],
};

export const useBuilderFrameStore = defineStore('builderFrameStore', () => {
  const route = useRoute();
  const router = useRouter();
  const queryClient = useQueryClient();

  const siteConfigurationStore = useSiteConfigurationStore();
  const pageConfigurationStore = usePageConfigurationStore();
  const catalogConfigurationStore = useCatalogConfigurationStore();
  const catalogItemsConfigurationStore = useCatalogItemsConfigurationStore();
  const userAccountStore = useUserAccountStore();

  const { currentSite, currentPagesList } = storeToRefs(siteConfigurationStore);
  const { currentPage } = storeToRefs(pageConfigurationStore);
  const { currentCatalogsList } = storeToRefs(catalogConfigurationStore);
  const { currentImagesStorage } = storeToRefs(userAccountStore);

  const createBlockMutation = useCreateBlockMutation();
  const updateBlockMutation = useUpdateBlockMutation();
  const duplicateBlockMutation = useDuplicateBlockMutation();
  const deleteBlockMutation = useDeleteBlockMutation();
  const sortBlocksMutation = useSortBlocksMutation();
  const updateMenuMutation = useUpdateMenuMutation();
  const uploadMutation = useUploadMutation();

  const pageState = ref(INITIAL_DATA.pageState);
  const meta = ref(INITIAL_DATA.meta);
  const options = ref(INITIAL_DATA.options);
  const content = ref(INITIAL_DATA.content);
  const mainPageId = ref(INITIAL_DATA.mainPageId);
  const isPageChanged = ref(INITIAL_DATA.isPageChanged);
  const isInital = ref(INITIAL_DATA.isInital);

  let currentPageBlocks = INITIAL_DATA.currentPageBlocks;

  watch(
    currentPagesList,
    async (value) => {
      if (value.length > 0 && !isInital.value) {
        isInital.value = true;

        const id = route.params.pageId;

        if (id === '-1' && currentPagesList.value.length > 0) {
          const foundIndexPage = currentPagesList.value.find((item) => item?.slug === '');

          router.replace({
            name: 'frame',
            params: {
              siteId: currentSite.id,
              pageId: foundIndexPage?.id || currentPagesList.value[0].id,
            },
          });
        } else {
          pageState.value = await prepareFrameData(id);
        }
      }
    },
    { immediate: true }
  );

  watch(
    currentPagesList,
    (pages) => {
      pages
        .filter((page) => page.id === currentPage?.value?.id)
        .map((page) => {
          currentPage.value.title = page.title;
        });
    },
    { deep: true }
  );

  watch(
    () => route.name,
    async (value) => {
      if (value === 'frame' && route.params.pageId && route.params.pageId !== '-1') {
        nextTick(async () => {
          await setCurrentPageData(route.params.pageId);
        });
      }
    },
    { deep: true }
  );

  function $reset() {
    pageConfigurationStore.clearPagesData();
    catalogConfigurationStore.handleClearCurrentCatalogsList();

    pageState.value = INITIAL_DATA.pageState;
    meta.value = INITIAL_DATA.meta;
    options.value = INITIAL_DATA.options;
    content.value = INITIAL_DATA.content;
    mainPageId.value = INITIAL_DATA.mainPageId;
    isPageChanged.value = INITIAL_DATA.isPageChanged;
    isInital.value = INITIAL_DATA.isInital;

    currentPageBlocks = INITIAL_DATA.currentPageBlocks;
  }

  async function prepareFrameData(pageId) {
    let currentPageId = pageId;
    let blocks = [];
    let catalogs = [];
    let catalogItems = [];

    await fetchPages();

    if (currentPageId) {
      blocks = await setBlocks(currentPageId);
      catalogs = await fetchCatalogs();
      catalogItems = await setCatalogItems(currentCatalogsList.value);
    }

    return setPageState(
      setMetaValue(currentPage.value, currentSite.value),
      setOptionsValue(currentSite.value, currentImagesStorage.value),
      setContentValue(
        blocks,
        catalogs,
        catalogItems.map((items) => toRaw(items))
      )
    );
  }

  async function setCurrentPageData(currentPageId) {
    currentPageBlocks = [];
    isPageChanged.value = true;

    nextTick(async () => {
      await fetchPages();

      pageState.value = await prepareFrameData(currentPageId);
      pageState.value.options.layout = setLayoutOptions(currentSite.value);

      isPageChanged.value = false;
    });
  }

  async function fetchPages() {
    await siteConfigurationStore.fetchPages(route.params.siteId);
  }

  async function fetchBlocks(pageId) {
    const blocks = await queryClient.fetchQuery({
      queryKey: ['blocks'],
      queryFn: async () => await getBlocks(pageId),
    });

    return blocks;
  }

  async function fetchCatalogs() {
    let catalogs;

    const catalogsList = await catalogConfigurationStore.fetchCatalogs(route.params.siteId, {
      active: true,
    });

    const clonedCatalogsList = structuredClone(toRaw(catalogsList));

    catalogs = clonedCatalogsList.map((item) => {
      const itemCurrency = currency.getCurrency(item.currency);
      itemCurrency.unit = item.unit || '';

      let { name, description, button, checkout, ...catalogData } = item;
      catalogData.currency = itemCurrency;

      return {
        title: name,
        text: description,
        button: {
          text: button,
        },
        checkout: setCheckoutForm(checkout),
        ...catalogData,
      };
    });

    return catalogs;
  }

  async function fetchCatalogItems(siteId, catalogId) {
    const catalogItemsList = await catalogItemsConfigurationStore.fetchCatalogItems(
      siteId,
      Number(catalogId),
      { active: true }
    );

    const clonedCatalogItemsList = structuredClone(toRaw(catalogItemsList));

    return clonedCatalogItemsList.map((item) => {
      let { category, price, priceOld, count, name, unit, ...catalogItemData } = item;

      return {
        brand: category,
        title: name,
        price: {
          currentPrice: price,
          oldPrice: priceOld,
          unit: unit || '',
          stock: count,
        },
        ...catalogItemData,
      };
    });
  }

  function setCheckoutForm(currentСheckout) {
    const clonedCheckout = structuredClone(toRaw(currentСheckout));

    if (!clonedCheckout?.fields?.length) {
      return currentСheckout;
    }

    return clonedCheckout;
  }

  async function setBlocks(pageId) {
    let blocksList = await fetchBlocks(pageId);
    const clonedBlock = structuredClone(blocksList);

    const blocksItems = clonedBlock.items.map((block) => {
      const blockType = block?.__type;
      delete block?.__type;

      return {
        type: blockType,
        ...block,
      };
    });

    return compact(
      currentPage.value.blocksDraft.map((blockId) => {
        return blocksItems.find((block) => block.id === blockId);
      })
    );
  }

  async function setCatalogItems(currentCatalogsList) {
    const catalogItems = [];

    for (const catalog in currentCatalogsList) {
      const catalogId = currentCatalogsList[catalog].id;
      const catalogItemsList = await fetchCatalogItems(route.params.siteId, Number(catalogId));

      catalogItems.push(...catalogItemsList);
    }

    return catalogItems;
  }

  function setMetaValue(currentPage, currentSite) {
    return {
      siteId: currentSite?.id,
      url: currentPage?.slug,
      siteTitle: currentSite?.name,
      pageTitle: currentPage?.title,
      description: currentPage?.description,
      ogImage: currentPage?.image,
      // code: 200,
      // urlKey: ``,
      keywords: currentPage?.keywords,
    };
  }

  function setOptionsValue(currentSite, storage) {
    return {
      cart: currentSite.cart || true,
      isPartner: currentSite.isPartner,
      // appleTouchIcon: '',
      color: {
        hex: currentSite.color,
        isColorLight: currentSite.isColorLight,
      },
      logo: currentSite.logo,
      favicon: currentSite.favicon,
      thumbnail: currentSite.thumbnail,
      language: currentSite.language,
      // faviconIco: 'string',
      checkout: setCheckoutForm(currentSite.checkout),

      layout: setLayoutOptions(currentSite),

      hosts: {
        storage,
        resizer: config.resizerUrl,
      },
    };
  }

  function setLayoutOptions(currentSite) {
    const isEmpty = (object) => object && Object.keys(object).length === 0;

    return {
      header: isEmpty(currentSite.header) ? null : currentSite.header,
      footer: isEmpty(currentSite.footer) ? null : currentSite.footer,
    };
  }

  function setContentValue(blocks, catalogs, catalogItems) {
    return {
      blocks: blocks || [],
      catalogs,
      catalogItems,
    };
  }

  function setPageState(meta, options, content) {
    return {
      meta,
      options,
      content,
    };
  }

  function prepareBlockProps(blockProps, isUpdate = false) {
    const clonedBlock = structuredClone(blockProps);
    const blockType = clonedBlock?.type;

    delete clonedBlock?.type;
    delete clonedBlock?.id;

    if (!isUpdate) {
      delete clonedBlock?.active;
    }

    return {
      __type: blockType,
      ...clonedBlock,
    };
  }

  async function createBlockRequest(blockProps) {
    const response = await createBlockMutation.mutateAsync({
      pageId: route.params.pageId,
      blockProps: prepareBlockProps(blockProps),
    });

    if (createBlockMutation.isSuccess.value) {
      currentPageBlocks.push(Number(response.id));

      const blocks = currentPage.value.blocks
        ? [...currentPage.value.blocks, ...currentPageBlocks]
        : currentPageBlocks;

      await pageConfigurationStore.updatePageRequest({
        id: Number(route.params.pageId),
        blocks: blocks.map(Number),
      });

      await siteConfigurationStore.updateUnPublishedChangesCounter();
    }

    return response;
  }

  async function updateBlockRequest(blockProps) {
    await updateBlockMutation.mutateAsync({
      pageId: route.params.pageId,
      blockId: blockProps.id,
      blockProps: prepareBlockProps(blockProps, true),
    });

    await siteConfigurationStore.updateUnPublishedChangesCounter();
  }

  async function duplicateBlockRequest(blockId) {
    await duplicateBlockMutation.mutateAsync({
      pageId: route.params.pageId,
      blockId,
    });
  }

  async function deleteBlockRequest(blockId) {
    await deleteBlockMutation.mutateAsync({
      pageId: route.params.pageId,
      blockId,
    });

    currentPage.value.blocks = currentPage.value.blocks.filter((currentBlockId) => {
      return currentBlockId !== blockId;
    });

    await pageConfigurationStore.updatePageRequest({
      id: Number(route.params.pageId),
      blocks: currentPage.value.blocks.map(Number),
    });

    await siteConfigurationStore.updateUnPublishedChangesCounter();
  }

  async function sortBlocksRequest(blocks) {
    const sortedBlocksIdList = blocks.map((block) => Number(block.id));

    await sortBlocksMutation.mutateAsync({
      pageId: route.params.pageId,
      blocks: sortedBlocksIdList,
    });

    if (sortBlocksMutation.isSuccess.value) {
      await siteConfigurationStore.updateUnPublishedChangesCounter();
    }
  }

  async function updateMenuRequest(menuData) {
    const requestData = {
      id: route.params.siteId,
      ...menuData,
    };

    if (!menuData?.header) {
      requestData.header = {};
    }

    if (!menuData?.footer) {
      requestData.footer = {};
    }

    await updateMenuMutation.mutateAsync(requestData);

    if (currentSite.value) {
      if (menuData?.header && currentSite.value?.header) {
        currentSite.value.header = menuData.header;
      }

      if (menuData?.footer && currentSite.value?.footer) {
        currentSite.value.footer = menuData.footer;
      }
    }

    await siteConfigurationStore.updateUnPublishedChangesCounter();
  }

  async function uploadRequest(image) {
    const data = await uploadMutation.mutateAsync({ file: image });

    if (uploadMutation.isSuccess.value) {
      await siteConfigurationStore.updateUnPublishedChangesCounter();

      return data.url;
    }
  }

  return {
    currentSite,
    currentPagesList,
    mainPageId,
    pageState,
    meta,
    options,
    content,
    prepareFrameData,
    createBlockRequest,
    updateBlockRequest,
    duplicateBlockRequest,
    deleteBlockRequest,
    sortBlocksRequest,
    updateMenuRequest,
    uploadRequest,
    isPageChanged,
    setCurrentPageData,
    $reset,
  };
});
