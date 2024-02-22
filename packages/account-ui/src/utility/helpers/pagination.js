export const offsetLimit = (page, limit = 24) => ({
  limit,
  offset: limit * (page - 1),
});

export const totalCount = (count, limit) => Math.ceil(count / limit);
