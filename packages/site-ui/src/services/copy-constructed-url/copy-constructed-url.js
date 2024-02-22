import { getConstructedUrl } from '../get-constructed-url/get-constructed-url.js';

export function copyConstructedUrl(url, hosts) {
  navigator.clipboard.writeText(getConstructedUrl(url, hosts));
}
