import { FAVICON_KEY, LOGO_KEY, THUMBNAIL_KEY } from './constants.js';

const DEFAULT_VALUES = {
  [LOGO_KEY]: '',
  [FAVICON_KEY]: '',
  [THUMBNAIL_KEY]: '',
};

export const getInitialValues = (data) => {
  return {
    [LOGO_KEY]: data?.[LOGO_KEY] || DEFAULT_VALUES[LOGO_KEY],
    [FAVICON_KEY]: data?.[FAVICON_KEY] || DEFAULT_VALUES[FAVICON_KEY],
    [THUMBNAIL_KEY]: data?.[THUMBNAIL_KEY] || DEFAULT_VALUES[THUMBNAIL_KEY],
  };
};
