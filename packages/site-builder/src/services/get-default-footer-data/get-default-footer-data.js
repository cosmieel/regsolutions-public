export function getDefaultFooterData(parameters) {
  const defaultFooter = {
    items: [
      {
        text: 'О нас',
        url: '',
      },
      {
        text: 'Вопросы',
        url: '',
      },
      {
        text: 'Контакты',
        url: '',
      },
      {
        text: 'Связаться с нами',
        url: '',
      },
    ],
  };

  return { ...defaultFooter, ...parameters };
}
