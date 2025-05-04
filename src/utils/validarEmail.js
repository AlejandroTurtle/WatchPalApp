export function validarEmail(email) {
  // Regular expression for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Test if the email matches the regular expression
  return emailRegex.test(email);
}
