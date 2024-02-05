export const splitTags = (tag, withIcon = false) => {
  if (withIcon) {
    return tag.text
      .split(',')
      .filter((item) => item.trim().length > 0)
      .map((item) => ({
        ...tag,
        text: item.trim(),
      }));
  }

  return tag
    .split(',')
    .filter((item) => item.trim().length > 0)
    .map((item) => item.trim());
};
