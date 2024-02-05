export async function downloadFile(url) {
  const response = await fetch(url, {
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
  });
  const blob = await response.blob();
  const link = document.createElement('a');
  const fileName = url.split('/').at(-1);

  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();

  URL.revokeObjectURL(link.href);
}
