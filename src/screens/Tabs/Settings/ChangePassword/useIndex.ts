import {Alert} from '@/src/components/Alert';
import {api} from '@/src/services/api';
import {PropsScreen} from '@/src/types/Navigation';
import {useState} from 'react';

type changePassword = {
  senhaAtual: string;
  senhaNova: string;
  error?: {
    senhaAtual?: string;
    senhaNova?: string;
  };
};

const initialInputs: changePassword = {
  senhaAtual: '',
  senhaNova: '',
};
export const useIndex = ({navigation, route}: PropsScreen) => {
  const [data, setData] = useState(initialInputs);
  const [alert, setAlert] = useState<Alert>(null);
  const [loading, setLoading] = useState(false);

  const setError = (key: keyof changePassword, message: string) => {
    setData(prevUser => ({
      ...prevUser,
      error: {
        ...prevUser.error,
        [key]: message,
      },
    }));
  };

  const validation = async () => {
    if (!data.senhaAtual) {
      setError('senhaAtual', 'Campo obrigatório');
      return false;
    } else if (!data.senhaNova) {
      setError('senhaNova', 'Campo obrigatório');
      return false;
    } else if (data.senhaNova.length < 8) {
      setError('senhaNova', 'Senha muito curta');
      return false;
    } else if (data.senhaAtual === data.senhaNova) {
      setError('senhaNova', 'Senhas iguais');
      return false;
    }
    return true;
  };

  const changePassword = async () => {
    setLoading(true);
    const response = await api.post('usuarios/alterar-senha', data);
    if (response.success) {
      setAlert({
        title: 'Sucesso',
        message: 'Senha alterada com sucesso',
        onPress: () => navigation.goBack(),
      });
    } else if (response.error) {
      setAlert({
        title: 'Alerta',
        message: response.error,
      });
    }
    setLoading(false);
  };

  const changePasswordHandler = async () => {
    const isValid = await validation();
    if (isValid) {
      changePassword();
    }
  };

  return {data, setData, alert, setAlert, changePasswordHandler, loading};
};
