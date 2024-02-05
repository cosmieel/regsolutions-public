export const blocksListData = [
  {
    title: 'Навигация',
    color: 'blue',
    blocks: [
      {
        title: 'Шапка',
        picture: 'navigation-header',
        preview: 'header',
        block: {
          type: 'DsHeader',
        },
      },
      {
        title: 'Подвал',
        picture: 'navigation-footer',
        preview: 'footer',
        block: {
          type: 'DsFooter',
        },
      },
    ],
  },
  {
    title: 'Первый блок',
    color: 'violet',
    blocks: [
      {
        title: 'Баннер',
        picture: 'hero-banner',
        preview: 'hero-banner',
        block: {
          type: 'BBanner',
        },
      },
      {
        title: 'Картинка сбоку',
        picture: 'hero-cover',
        preview: 'hero-cover',
        block: {
          type: 'BCover',
        },
      },
      {
        title: 'Галерея',
        picture: 'hero-gallery',
        preview: 'hero-gallery',
        block: {
          type: 'BGallery',
        },
      },
    ],
  },
  {
    title: 'Магазин',
    color: 'pink',
    blocks: [
      {
        title: 'Каталоги',
        picture: 'shop-catalogs',
        preview: 'catalogs',
        block: {
          type: 'BCatalogs',
        },
      },
      {
        title: 'Товары',
        picture: 'shop-products',
        preview: 'catalog',
        block: {
          type: 'BCatalog',
        },
      },
      {
        title: 'Прайслист',
        picture: 'shop-price',
        preview: 'price',
        block: {
          type: 'BPriceList',
        },
      },
    ],
  },
  {
    title: 'Галерея',
    color: 'red',
    blocks: [
      {
        title: 'Простая',
        picture: 'gallery-simple',
        preview: 'content-gallery',
        block: {
          type: 'BGallery',
        },
      },
    ],
  },
  {
    title: 'Описание',
    color: 'orange',
    blocks: [
      {
        title: 'Текст',
        picture: 'description-text',
        preview: 'text',
        block: {
          type: 'BText',
        },
      },
      {
        title: 'Пункты',
        picture: 'description-points',
        preview: 'features-simple',
        block: {
          type: 'BFeatures',
          theme: 'simple',
        },
      },
      {
        title: 'Пункты и цифры',
        picture: 'description-features',
        preview: 'features-signed',
        block: {
          type: 'BFeatures',
          theme: 'signed',
          features: [
            {
              title: '15 лет',
              text: 'Радуем клиентов лучшими товарами и сервисом',
            },
            {
              title: '30 К',
              text: 'Выполненных заказов по всей стране',
            },
            {
              title: '15%',
              text: 'Скидка нашим постоянным клиентам',
            },
          ],
        },
      },
      {
        title: 'Текст и картинка',
        picture: 'description-cover',
        preview: 'content-cover',
        block: {
          type: 'BCover',
        },
      },
      {
        title: 'Скрытые пункты',
        picture: 'description-answers',
        preview: 'answers',
        block: {
          type: 'BAnswers',
        },
      },
      {
        title: 'Видео',
        picture: 'description-video',
        preview: 'video',
        block: {
          type: 'BVideo',
        },
      },
      {
        title: 'Теги и иконки',
        picture: 'description-tags',
        preview: 'tags',
        block: {
          type: 'BTags',
        },
      },
      {
        title: 'bnovo',
        picture: 'description-bnovo',
        preview: 'bnovo',
        block: {
          type: 'BBnovo',
        },
      },
    ],
  },
  {
    title: 'Реклама',
    color: 'lime',
    blocks: [
      {
        title: 'Баннер',
        picture: 'advertising-banner',
        preview: 'content-banner',
        block: {
          type: 'BBanner',
        },
      },
      {
        title: 'Карточки 1',
        picture: 'advertising-cards-1',
        preview: 'cards-compact',
        block: {
          type: 'BInfoGroup',
          theme: 'compact',
        },
      },
      {
        title: 'Карточки 2',
        picture: 'advertising-cards-2',
        preview: 'cards-half',
        block: {
          type: 'BInfoGroup',
          theme: 'half',
        },
      },
      {
        title: 'Карточки 3',
        picture: 'advertising-cards-3',
        preview: 'cards-full',
        block: {
          type: 'BInfoGroup',
          theme: 'full',
        },
      },
    ],
  },
  {
    title: 'Местоположение',
    color: 'green',
    blocks: [
      {
        title: 'Карта',
        picture: 'location-map',
        preview: 'map',
        block: {
          type: 'BMap',
        },
      },
    ],
  },
  {
    title: 'Отзывы и ссылки',
    color: 'sky',
    blocks: [
      {
        title: 'Соцсети',
        picture: 'reviews-and-links-social',
        preview: 'socials',
        block: {
          type: 'BSocials',
        },
      },
    ],
  },
  {
    title: 'Форма обратной связи',
    color: 'blue',
    blocks: [
      {
        title: 'Простая',
        picture: 'form-default',
        preview: 'form-default',
        block: {
          type: 'BForm',
          theme: 'default',
        },
      },
      {
        title: 'С картинкой',
        picture: 'form-half',
        preview: 'form-half',
        block: {
          type: 'BForm',
          theme: 'half',
        },
      },
      {
        title: 'На картинке',
        picture: 'form-full',
        preview: 'form-full',
        block: {
          type: 'BForm',
          theme: 'full',
          backed: false,
        },
      },
    ],
  },
  {
    title: 'Другое',
    color: 'violet',
    blocks: [
      {
        title: 'html-код',
        picture: 'other-html',
        preview: 'html',
        block: {
          type: 'BHtml',
        },
      },
    ],
  },
];
