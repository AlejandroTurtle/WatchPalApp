import {chave} from '../config';
import {api} from '../services/api';
import {KeysPix} from '../types/TypeKeysPix';

export const getKeysPix = async () => {
  const response = await api.post<KeysPix>('parametros/pix-tipos-chave', {
    chave: chave,
  });
  if (response.success) {
    if (response.data && Array.isArray(response.data)) {
      return response.data.map((key: {id: string; nome: string}) => ({
        id: parseInt(key.id, 10),
        nome: key.nome,
      }));
    }
    return [];
  }
};
