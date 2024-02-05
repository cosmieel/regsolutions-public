export function unlockBody(key) {
  const body = document.querySelector('body');
  const locked = body.dataset.locked;

  if (!locked) {
    return;
  }

  body.dataset.locked = locked
    .split(', ')
    .filter((item) => item !== key)
    .join(' ');

  if (body.dataset.locked !== '') {
    return;
  }

  // eslint-disable-next-line unicorn/prefer-dom-node-dataset
  body.removeAttribute('data-locked');
  body.style.height = '';
  body.style.overflow = '';
}
