export function formatCEP(input) {
  if (!input || input.length === 0) {
    return input;
  }

  const cep = input.replace(/\D/g, '');

  if (cep.length <= 5) {
    const part1 = cep.substring(0, 5);
    return `${part1}`;
  } else if (cep.length <= 8) {
    const part1 = cep.substring(0, 5);
    const part2 = cep.substring(5, 8);
    return `${part1}-${part2}`;
  }
}
