export function getDefaultHeaderData(parameters) {
  const defaultHeader = {
    menuItems: [
      {
        text: 'О нас',
        url: '',
        group: [],
      },
      {
        text: 'Каталог',
        url: '',
        group: [],
      },
      {
        text: 'Контакты',
        url: '',
        group: [
          {
            text: 'Адрес',
            url: '',
          },
          {
            text: 'Соцсети',
            url: '',
          },
        ],
      },
    ],

    buttons: [
      {
        text: '8 900 000 00 00',
        url: '',
      },
      {
        text: 'Написать',
        url: '',
      },
    ],
  };

  return { ...defaultHeader, ...parameters };
}
