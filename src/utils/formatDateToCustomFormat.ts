export function formatDateToCustomFormat(dateString: string | Date) {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }

  const monthNames = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedTime = `${String(hours).padStart(2, '0')}:${String(
    minutes,
  ).padStart(2, '0')}`;

  return `${day} de ${month} ${year} ${formattedTime}`;
}
