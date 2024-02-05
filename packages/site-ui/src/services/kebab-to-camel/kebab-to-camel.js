export function kebabToCamel(string) {
  return string
    .split('-')
    .map((item) => item[0].toUpperCase() + item.slice(1, item.length))
    .join('');
}
