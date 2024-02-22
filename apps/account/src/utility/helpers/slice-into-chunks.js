/**
 * @description Slice any array into chunks
 * @param { Array } pool Some array
 * @param { number } chunkSize array division boundary
 * @return { Array }
 */

export const sliceIntoChunks = (pool, chunkSize) => {
  let result = [];

  for (let index = 0; index < pool.length; index += chunkSize) {
    result.push(pool.slice(index, index + chunkSize));
  }

  return result;
};
