export function lockBody(key) {
  const body = document.querySelector('body');

  const locked = body.dataset.locked;

  if (locked && locked.includes(key)) {
    return;
  }

  body.dataset.locked = locked ? `${locked}, ${key}` : key;

  body.style.height = '100vh';
  body.style.overflow = 'hidden';
}
