// eslint-disable-next-line import/no-default-export
export default {
  sentry: {
    dsn: import.meta.env.VITE_SENTRY_DSN,
  },
  resizerUrl: import.meta.env.VITE_IMAGE_SIZER_URL,
  resize: {
    logo: 'x200',
    favicon: '48x48',
    catalogTableItem: '40x40',
    productTableItem: '40x40',
    pageSettingsBasic: {
      previewSearchResult: '32x32',
    },
    pageSettings: {
      favicon: '16x16',
    },
    fileSectionMultiple: '206x188',
    previewView: {
      previewSearchResult: '32x32',
    },
    createUpdateModal: {
      demoView: '238x228',
    },
  },
};
