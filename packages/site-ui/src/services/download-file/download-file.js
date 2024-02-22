import { getConstructedUrl } from '../get-constructed-url/get-constructed-url.js';

export async function downloadFile(url, hosts) {
  const constructedUrl = getConstructedUrl(url, hosts);
  const response = await fetch(constructedUrl, {
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
  });
  const blob = await response.blob();
  const link = document.createElement('a');
  const fileName = constructedUrl.split('/').at(-1);

  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();

  URL.revokeObjectURL(link.href);
}
