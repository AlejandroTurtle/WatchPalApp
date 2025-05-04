export const formatCurrency = (value: string | number): string => {
  if (typeof value === 'number') {
    value = value.toString();
  }
  value = value.replace(/\D/g, '');
  const formattedValue = (Number(value) / 100).toFixed(2);
  return `R$ ${formattedValue.replace('.', ',')}`;
};
