export function getTopIndent(block, indentTop) {
  if (!block) {
    return;
  }

  if (block.getBoundingClientRect().bottom <= indentTop + 8 + 29) {
    return { top: block.offsetTop + block.offsetHeight - 29, position: 'absolute' };
  }

  if (block.getBoundingClientRect().top <= indentTop + 8 + 29) {
    return { top: indentTop + 8, position: 'fixed' };
  }

  return { top: block.getBoundingClientRect().top - 29, position: 'fixed' };
}
