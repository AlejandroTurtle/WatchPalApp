export function formatCPF(input) {
  if (!input || input.length === 0) {
    return input;
  }

  const cpf = input.replace(/\D/g, '');

  if (cpf.length <= 3) {
    return cpf;
  } else if (cpf.length <= 6) {
    const part1 = cpf.substring(0, 3);
    const part2 = cpf.substring(3, 6);
    return `${part1}.${part2}`;
  } else if (cpf.length <= 9) {
    const part1 = cpf.substring(0, 3);
    const part2 = cpf.substring(3, 6);
    const part3 = cpf.substring(6, 9);
    return `${part1}.${part2}.${part3}`;
  } else {
    const part1 = cpf.substring(0, 3);
    const part2 = cpf.substring(3, 6);
    const part3 = cpf.substring(6, 9);
    const part4 = cpf.substring(9, 11);
    return `${part1}.${part2}.${part3}-${part4}`;
  }
}
