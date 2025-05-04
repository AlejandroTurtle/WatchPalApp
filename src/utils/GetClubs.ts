import {api} from 'services/api';
import {ClubResponse} from 'types/Clubs';

export const getClubs = async () => {
  const response = await api.get<ClubResponse[]>('clubes/listar');
  if (response.success && response.data) {
    // console.log('response.data: ', response.data);
    return response.data;
  }
};
