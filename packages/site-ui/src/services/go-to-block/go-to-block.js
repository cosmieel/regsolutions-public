export function goToBlock(blockId) {
  const block = document.querySelector(`#block-${blockId}`);

  if (!block) {
    return;
  }

  const top = block.offsetTop - 120;

  window.scrollTo({
    top,
    behavior: 'smooth',
  });
}
