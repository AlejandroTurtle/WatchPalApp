import {Alert} from '@/src/components/Alert';
import {chave} from '@/src/config';
import {profileContext} from '@/src/context/profileContext';
import {cleanItemAsync, getItemAsync} from '@/src/libs/AsyncStorage';
import {api} from '@/src/services/api';
import {UserCreateDTO} from '@/src/types/Auth';
import {PropsScreen} from '@/src/types/Navigation';
import {useEffect, useState} from 'react';

type Props = {
  codigo: string;
  error?: {
    codigo?: string;
  };
};

const defaultUser: Props = {
  codigo: '',
};

export const useIndex = ({navigation, route}: PropsScreen) => {
  const params = route.params as UserCreateDTO;
  const [codigo, setCodigo] = useState<Props>(defaultUser);
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<Alert>(null);
  const [userId, setUserId] = useState<string>();
  const {saveProfile} = profileContext();

  useEffect(() => {
    const getUserId = async () => {
      if (!params?.id) {
        const id = await getItemAsync('userId');
        setUserId(id);
      }
    };
    getUserId();
  }, [params]);

  const error = {
    requiredfield: 'Campo obrigatório',
  };

  const validation = () => {
    let isValid = true;
    const errors: any = {};

    if (!codigo.codigo) {
      errors.codigo = error.requiredfield;
      isValid = false;
    }
    setCodigo(prev => ({...prev, error: errors}));
    return isValid;
  };

  const handleConfirmEmail = async () => {
    setLoading(true);
    if (validation()) {
      const body = {
        id: params?.id || userId,
        codigo: codigo.codigo,
        chave: chave,
      };
      const response = await api.post(
        'autenticacao/autenticar-conf-email',
        body,
      );
      if (response.success) {
        setAlert({
          title: 'Sucesso',
          message: 'E-mail confirmado com sucesso!',
          onPress: async () => {
            await cleanItemAsync('userId');
            navigation.reset({
              index: 0,
              routes: [{name: 'Tabs'}],
            });
          },
        });
      } else {
        setAlert({
          title: 'Aviso',
          message: response.error,
        });
      }
    }
    setLoading(false);
  };

  const handleResendEmail = async () => {
    setLoading(true);
    const body = {
      id: params?.id || userId,
      chave: chave,
    };
    const response = await api.post(
      'autenticacao/autenticar-reenviar-email',
      body,
    );
    if (response.success) {
      setAlert({
        title: 'Sucesso',
        message: 'E-mail reenviado com sucesso!',
      });
    } else {
      setAlert({
        title: 'Aviso',
        message: response.error,
      });
    }
    setLoading(false);
  };

  return {
    params,
    alert,
    setAlert,
    codigo,
    setCodigo,
    loading,
    handleConfirmEmail,
    handleResendEmail,
  };
};
