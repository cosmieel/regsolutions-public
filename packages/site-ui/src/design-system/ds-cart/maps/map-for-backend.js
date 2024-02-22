export function mapForBackend(storage) {
  return storage
    .filter((storageItem) => storageItem.item?.price?.stock !== 0)
    .map((item) => {
      return {
        id: item.id,
        count: item.count,
      };
    });
}
