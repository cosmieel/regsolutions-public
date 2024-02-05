export const bForm = {
  id: '',
  title: '',
  type: 'BForm',
  backed: true,
  theme: 'default',
  image: '/pic-6.png',
  contentTitle: 'Всегда на связи',
  description: 'Оставьте свои контакты и мы свяжемся с вами',
  privacyText: 'Нажимая на кнопку, вы соглашаетесь с пользовательским соглашением',
  button: {
    text: 'Отправить',
  },
  fields: [
    {
      name: 'field1',
      label: 'Имя',
      type: 'text',
      required: false,
    },
    {
      name: 'field2',
      label: '+7',
      type: 'phone',
      required: false,
    },
  ],
  active: true,
};
