export const formatCurrency = (value: number, currency = 'USD') =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value);

export const formatPercent = (value: number) =>
  `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;

export const formatNumber = (value: number) =>
  new Intl.NumberFormat('en-US', { notation: 'compact' as any, maximumFractionDigits: 2 }).format(value);
