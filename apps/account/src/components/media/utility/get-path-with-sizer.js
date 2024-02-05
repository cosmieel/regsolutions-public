import config from 'account/src/config/config.js';

export const getPathWithSizer = (url, size) => {
  const pathToSizer = config.resizerUrl;

  if (pathToSizer && size) {
    return `${pathToSizer}/${size}/${url}`;
  }

  return url;
};
