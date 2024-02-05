/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */

class FigmaHelper {
  constructor(apiHost, figmaToken, fileKey) {
    this.apiHost = apiHost;
    this.figmaToken = figmaToken;
    this.headers = { 'x-figma-token': this.figmaToken };
    this.fileKey = fileKey;
  }

  async getDocument() {
    process.stdout.write('Получение документа \n');

    const response = await fetch(`${this.apiHost}/files/${this.fileKey}`, {
      method: 'GET',
      headers: this.headers,
    });
    const figmaFile = await response.json();

    return figmaFile.document;
  }

  async getIconsUrls(iconsIds) {
    process.stdout.write('Получение url иконок \n');

    const response = await fetch(
      `${this.apiHost}/images/${this.fileKey}?format=svg&ids=${iconsIds}`,
      {
        method: 'GET',
        headers: this.headers,
      }
    );
    const iconsUrls = await response.json();

    return iconsUrls.images;
  }

  async getIcon(url) {
    process.stdout.write('Скачивание иконки \n');

    const response = await fetch(url, {
      method: 'GET',
    });

    const iconsUrls = await response.text();

    return iconsUrls;
  }
}

module.exports = FigmaHelper;
