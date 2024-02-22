export const getConstructedUrl = (path, hosts, size) => {
  if (!path) {
    return '';
  }

  const regex = /(^https:\/\/)|(^http:\/\/)/;
  const { storage, resizer } = hosts;

  if (regex.test(path)) {
    return path;
  }

  if (resizer && size) {
    return `${resizer}/${size}/${storage}${path}`;
  }

  return `${storage}${path}`;
};
