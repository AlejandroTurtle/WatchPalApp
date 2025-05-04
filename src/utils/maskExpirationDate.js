export const maskExpirationDate = (date: string) => {
  // Assuming the input format is "mm/yy"
  return date
    .replace(/(\d{2})(\d{2})/, '$1/$2')
    .trim()
    .slice(0, 5);
};
