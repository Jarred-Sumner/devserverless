let defaultFormatter: Intl.NumberFormat;
export function formatNumber(value: number) {
  if (!defaultFormatter) {
    defaultFormatter = Intl.NumberFormat();
  }

  return defaultFormatter.format(value);
}

export function formatMillis(value: number) {
  return `${(value / 1000).toPrecision(2)}s`;
}
