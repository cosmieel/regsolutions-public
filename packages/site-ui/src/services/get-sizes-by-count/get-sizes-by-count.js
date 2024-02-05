export const getSizesByCount = (count, maxCount, sizes) => {
  if (count > maxCount) {
    return sizes[maxCount];
  }

  return sizes[count];
};
