// useIndex.ts

import {Alert} from '@/src/components/Alert';
import {api} from '@/src/services/api';
import {PropsScreen} from '@/src/types/Navigation';
import {useEffect, useState} from 'react';

type UserDTO = {
  email: string;
  error?: {
    email?: string;
  };
};

const defaultUser: UserDTO = {
  email: '',
};

export const useIndex = ({navigation, route}: PropsScreen) => {
  const [user, setUser] = useState<UserDTO>(defaultUser);
  const [isLoading, setLoading] = useState(false);
  const [alert, setAlert] = useState<Alert>(null);

  const texts = {
    inputemail: 'E-mail',
    linkremenberpwd: 'Você lembrou sua senha?',
    button: 'Continuar',
    title: 'Recuperar senha',
    subtitle: 'Adicione seu e-mail para receber o código',
    errors: {
      emptyfield: 'Campo obrigatório',
      invalidemail: 'E-mail inválido',
    },
  };

  const setError = (key: keyof UserDTO, message: string) => {
    setUser(prevUser => ({
      ...prevUser,
      error: {
        ...prevUser.error,
        [key]: message,
      },
    }));
  };

  const validation = async () => {
    if (!user.email) {
      setError('email', texts.errors.emptyfield);
      return false;
    } else if (!validarEmail(user.email)) {
      setError('email', texts.errors.invalidemail);
      return false;
    }
    return true;
  };

  const request = async () => {
    setLoading(true);
    const body = {
      email: user.email.toLowerCase().trim(),
    };
    let response = await api.post<{codigo: string}>(
      '/usuarios/EmailRecuperarSenha',
      body,
    );
    setLoading(false);
    if (response.success) {
      setAlert({
        title: 'Sucesso',
        message: 'Código enviado com sucesso',
        onPress: () =>
          navigation.navigate('RecoverLogin2', {email: user.email}),
      });
    } else {
      setAlert({
        message: response.error,
        title: 'Alerta',
      });
    }
  };

  const nextScreen = async () => {
    let isPassed = await validation();
    isPassed && (await request());
  };

  return {
    user,
    setUser,
    isLoading,
    alert,
    setAlert,
    nextScreen,
    texts,
  };
};
