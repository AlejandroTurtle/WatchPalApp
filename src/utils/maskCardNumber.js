export const maskCardNumber = (number: string) => {
  // Assuming the input format is "9999999999999999"
  return number
    .replace(/(\d{4})(?=\d)/g, '$1 ')
    .trim()
    .slice(0, 19);
};
