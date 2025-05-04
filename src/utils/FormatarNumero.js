export function FormatarNumero(input: string) {
  console.log(input);
  if (!input || input.length === 0) {
    return input;
  }

  // Step 1: Remove all non-numeric characters
  const cleanedNumber = input.replace(/\D/g, '');

  // Step 2: Format the phone number based on its length
  let formattedNumber = '';

  if (cleanedNumber.length <= 2) {
    formattedNumber = cleanedNumber;
  } else if (cleanedNumber.length <= 6) {
    formattedNumber = `(${cleanedNumber.slice(0, 2)}) ${cleanedNumber.slice(
      2,
    )}`;
  } else if (cleanedNumber.length === 10) {
    formattedNumber = `(${cleanedNumber.slice(0, 2)}) ${cleanedNumber.slice(
      2,
      6,
    )} ${cleanedNumber.slice(6, 10)}`;
  } else if (cleanedNumber.length < 10) {
    formattedNumber = `(${cleanedNumber.slice(0, 2)}) ${cleanedNumber.slice(
      2,
      3,
    )} ${cleanedNumber.slice(3, 7)} ${cleanedNumber.slice(7)}`;
  } else {
    // Handle phone numbers longer than 10 digits (e.g., 99 (9) 9999 9999)
    formattedNumber = `(${cleanedNumber.slice(0, 2)}) ${cleanedNumber.slice(
      2,
      3,
    )} ${cleanedNumber.slice(3, 7)} ${cleanedNumber.slice(
      7,
      11,
    )} ${cleanedNumber.slice(11)}`;
  }

  // Step 3: Return the formatted phone number
  return formattedNumber.trim().slice(0, 16);
}
