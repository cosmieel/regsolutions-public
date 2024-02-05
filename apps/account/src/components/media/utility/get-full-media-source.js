export const getFullMediaSource = (image, imageStorage) => {
  let url;

  try {
    url = new URL(image);

    if (url.origin) {
      return image;
    }
  } catch {
    return imageStorage + image;
  }

  return imageStorage + image;
};
