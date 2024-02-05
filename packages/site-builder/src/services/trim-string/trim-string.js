export function trimString(string, symbols) {
  if (string.length <= symbols) {
    return string;
  }

  if (string[symbols - 1] === ' ') {
    return string.slice(0, symbols - 1) + '...';
  }

  return string.slice(0, symbols) + '...';
}
