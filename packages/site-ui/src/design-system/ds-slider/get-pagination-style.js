export function getPaginationStyle(pagination) {
  const styles = [];

  if (pagination === 'primary') {
    styles.push(
      `
      .swiper-pagination-bullet {
        opacity: 1;
        background-color: var(--bg-pagination-default);
        backdrop-filter: blur(6px);
      }
    `,
      `
      .swiper-pagination-bullet-active {
        background-color: var(--bg-pagination-active);
        backdrop-filter: none;
      }
    `
    );
  }

  if (pagination === 'inverse') {
    styles.push(
      `
      .swiper-pagination-bullet {
        opacity: 1;
        background-color: var(--bg-pagination-inverse-default);
        backdrop-filter: blur(6px);
      }
    `,
      `
      .swiper-pagination-bullet-active {
        background-color: var(--bg-pagination-inverse-active);
        backdrop-filter: none;
      }
    `
    );
  }

  return styles;
}
