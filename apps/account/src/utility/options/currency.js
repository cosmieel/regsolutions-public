import { currency, CURRENCY_CODES } from 'currency';

export const getCurrencySymbolOptions = () =>
  Object.keys(CURRENCY_CODES).map((value) => {
    const currencyData = currency.getCurrency(value);

    return {
      name: `${currencyData.name} (${currencyData.symbol})`,
      value: value,
    };
  });

export const currencySymbolOptions = getCurrencySymbolOptions();
