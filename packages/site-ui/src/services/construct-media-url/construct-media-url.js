export const constructMediaUrl = (url, sizerUrl, size) => {
  if (sizerUrl && size) {
    return `${sizerUrl}/${size}/${url}`;
  }

  return url;
};
