export const formatKeyToName = (currentCode, codes) => {
  switch (currentCode) {
    case codes.RUB: {
      return 'Российский рубль';
    }
    case codes.USD: {
      return 'Доллар';
    }
    case codes.EUR: {
      return 'Евро';
    }
    default: {
      return 'Unknown';
    }
  }
};
