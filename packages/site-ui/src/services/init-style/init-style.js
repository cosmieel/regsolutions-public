import { setAccentColor } from 'site-ui/src/services/set-accent-color/set-accent-colors';
import 'site-ui/src/style/style.css';

export function initStyle(color, isColorLight) {
  setAccentColor(color, isColorLight);
}
