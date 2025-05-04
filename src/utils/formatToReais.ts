export function formatToReais(number: number | string) {
  const cleanValue = String(number).replace(/[^\d\.,]/g, '');

  // Substitui vírgulas por pontos (para lidar com formatos diferentes)
  const dotValue = cleanValue.replace(',', '.');

  // Converte o valor limpo em um número
  const numberValue = parseFloat(dotValue);
  const value = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(numberValue);
  if (value.includes('NaN')) {
    return '';
  }
  return value;
}
