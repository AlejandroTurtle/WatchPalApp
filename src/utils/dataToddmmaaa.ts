export function dataToddmmaaa(dateString?: string) {
  // Check if the input is a valid date string
  const date = dateString
    ? new Date(dateString)
    : new Date(Date.now() - 86400000 * 18);

  if (isNaN(date.getTime())) {
    return dateString;
  }

  // Extract day, month, year, hour, and minute
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const dayFormat = String(day).padStart(2, '0');
  const monthFormat = String(month + 1).padStart(2, '0');

  // return dd/mm/aaaa
  return `${dayFormat}/${monthFormat}/${year}`;
}
