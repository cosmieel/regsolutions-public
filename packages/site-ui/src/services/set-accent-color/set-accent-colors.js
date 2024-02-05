import { shaderColor } from '../shader-color/shader-color.js';

export function setAccentColor(color, isColorLight) {
  if (!color) {
    return;
  }

  const style = document.createElement('style');
  const head = document.head || document.querySelectorAll('head')[0];
  const fontAccent = isColorLight ? '--font-primary' : '--font-primary-inverse';

  style.innerHTML = `
    :root {
      --font-accent: ${color};
      --font-dynamic: var(${fontAccent});

      --bg-button-primary-default: ${color};
      --bg-button-primary-hover: ${shaderColor(color, -4)};
      --bg-button-primary-active: ${shaderColor(color, -8)};
    }
  `;

  head.append(style);
}
