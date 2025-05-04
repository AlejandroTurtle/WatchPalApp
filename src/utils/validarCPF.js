export function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '');

  if (cpf === '') {
    return false;
  }

  if (cpf.length !== 11) {
    return false;
  }

  // Eliminate known invalid CPFs
  if (
    cpf === '00000000000' ||
    cpf === '11111111111' ||
    cpf === '22222222222' ||
    cpf === '33333333333' ||
    cpf === '44444444444' ||
    cpf === '55555555555' ||
    cpf === '66666666666' ||
    cpf === '77777777777' ||
    cpf === '88888888888' ||
    cpf === '99999999999'
  ) {
    return false;
  }

  // Validate first digit
  let sum = 0;
  let weight = 10;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i), 10) * weight--;
  }
  let remainder = sum % 11;
  let digit = remainder < 2 ? 0 : 11 - remainder;
  if (digit !== parseInt(cpf.charAt(9), 10)) {
    return false;
  }

  // Validate second digit
  sum = 0;
  weight = 11;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * weight--;
  }
  remainder = sum % 11;
  digit = remainder < 2 ? 0 : 11 - remainder;
  if (digit !== parseInt(cpf.charAt(10))) {
    return false;
  }

  return true;
}
