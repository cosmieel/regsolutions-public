import { CURRENCY_CODES, currency } from 'currency';

export const useCurrencySymbol = (currencyValue = CURRENCY_CODES.RUB, unit) => {
  return `${currency.getCurrency(currencyValue).symbol}${unit || ''}`;
};
