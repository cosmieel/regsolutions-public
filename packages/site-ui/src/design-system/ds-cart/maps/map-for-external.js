export function mapForExternal(storage) {
  return storage.map((item) => {
    return {
      id: item.id,
      count: item.count,
      price: item.price,
    };
  });
}
