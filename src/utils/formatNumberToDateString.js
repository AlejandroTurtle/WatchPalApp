export function formatAAMMYYYY(value) {
  const input = String(value).replace(/[^0-9]/g, '');

  // Ensure the input numbers are valid for date
  const getValidDay = day => (day >= 1 && day <= 31 ? day : '31');
  const getValidMonth = month => {
    const monthInt = parseInt(month, 10);
    return (monthInt >= 1 && monthInt <= 12) ? month : '12';
  };
  const getValidYear = year => year; // Keep as is if not 4 digits

  if (input.length <= 2) {
    const day = input.substring(0, 2);
    return `${getValidDay(day)}`;
  } else if (input.length <= 4) {
    const day = input.substring(0, 2);
    const month = input.substring(2, 4);
    return `${getValidDay(day)}/${month}`;
  } else if (input.length <= 8) {
    const day = input.substring(0, 2);
    const month = input.substring(2, 4);
    const year = input.substring(4, 8);
    return `${getValidDay(day)}/${getValidMonth(month)}/${getValidYear(year)}`;
  }

  return input;
}
