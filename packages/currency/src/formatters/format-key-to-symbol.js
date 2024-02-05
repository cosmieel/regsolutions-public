export const formatKeyToSymbol = (currentCode, codes) => {
  switch (currentCode) {
    case codes.RUB: {
      return '₽';
    }
    case codes.USD: {
      return '$';
    }
    case codes.EUR: {
      return '€';
    }
    default: {
      return 'Unknown';
    }
  }
};
