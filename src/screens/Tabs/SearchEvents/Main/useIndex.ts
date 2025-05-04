import {Event} from '@/types/Event';
export const useIndex = () => {
  const mocks: Event[] = [
    {
      id: '1',
      title: 'Feira de Artesanato',
      description:
        'Participe de uma corrida de 5km pela cidade lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.',
      coordinate: {latitude: -19.938, longitude: -43.903},
      image: require('../../../../assets/download1.png'),
      location: 'Av. Paulista, 1000 - São Paulo - SP',
      date: 'Sexta-feira - 10/10/2025',
      creator: 'Alejandro Gomes',
      dateInicial: '10/10/2025',
      dateFinal: '15/10/2025',
      price: 50.0,
      hour: '18:00',
    },
    {
      id: '2',
      title: 'Corrida Comunitária',
      description:
        'Participe de uma corrida de 5km pela cidade lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.',
      coordinate: {latitude: -19.936, longitude: -43.905},
      image: require('../../../../assets/download1.png'),
      location: 'Av. Paulista, 1000 - São Paulo - SP',
      date: 'Quarta-feira - 04/09/2025',
      creator: 'Alejandro Gomes',
      dateInicial: '10/10/2025',
      dateFinal: '15/10/2025',
      price: 150.0,
      hour: '20:00',
    },
    {
      id: '3',
      title: 'Show ao Ar Livre',
      description:
        'Participe de uma corrida de 5km pela cidade lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.',
      coordinate: {latitude: -19.939, longitude: -43.902},
      image: require('../../../../assets/download1.png'),
      location: 'Av. Paulista, 1000 - São Paulo - SP',
      date: 'Quinta-feira - 22/05/2025',
      creator: 'Alejandro Gomes',
      dateInicial: '10/10/2025',
      dateFinal: '15/10/2025',
      hour: '19:00',
      price: 80.0,
    },
  ];

  return {mocks};
};
