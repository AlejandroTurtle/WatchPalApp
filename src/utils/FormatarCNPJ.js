export function FormatarCNPJ(cnpj: string): string {
  // Remove any non-numeric characters
  const numericCnpj = cnpj.replace(/\D/g, '');

  // Apply the CNPJ mask
  return numericCnpj
    .slice(0, 14)
    .replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
}
