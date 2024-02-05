import { getPaginationStyle } from './get-pagination-style.js';

export function getParameters(type, slideNumber, pagination) {
  const parameters = {
    injectStyles: [],
  };

  if (type === 'single') {
    parameters.slidesPerView = 1;
    parameters.loop = true;
  }

  if (type === 'multiple') {
    parameters.spaceBetween = 24;
    parameters.slidesPerView = 1.2;
    parameters.breakpoints = {
      621: {
        slidesPerView: 2.2,
      },
      1025: {
        slidesPerView: 3,
      },
    };
    parameters.loop = false;
    parameters.injectStyles.push(`.swiper { padding-bottom: 36px; overflow: visible;}`);
  }

  if (type === 'multiple-shadow') {
    parameters.slidesPerView = 1.2;
    parameters.breakpoints = {
      621: {
        slidesPerView: 2.2,
      },
      1025: {
        slidesPerView: 3,
      },
    };
    parameters.loop = false;
    parameters.injectStyles.push(`.swiper { padding-bottom: 24px; overflow: visible;}`);
  }

  if (type === 'gallery-modal') {
    parameters.slidesPerView = 5;
    parameters.loop = slideNumber / 2 > 5;
    parameters.spaceBetween = 4;
    parameters.centeredSlides = true;
    parameters.slideToClickedSlide = true;
  }

  if (pagination) {
    parameters.pagination = {
      dynamicBullets: true,
    };

    parameters.injectStyles.push(...getPaginationStyle(pagination));
  }

  return parameters;
}
