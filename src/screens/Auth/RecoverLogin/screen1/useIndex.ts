// useIndex.ts

import {Alert} from '@/src/components/Alert';
import {chave} from '@/src/config';
import {api} from '@/src/services/api';
import {PropsScreen} from '@/src/types/Navigation';
import {validarEmail} from '@/src/utils/validarEmail';
import {useEffect, useState} from 'react';

type UserDTO = {
  email: string;
  chave: string;
  error?: {
    email?: string;
  };
};

const defaultUser: UserDTO = {
  email: '',
  chave: chave,
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
      console.log('email: ');
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
      chave: user.chave,
    };
    let response = await api.post<{codigo: string}>(
      'autenticacao/recuperar-senha',
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

  // useEffect(() => {
  //   if (__DEV__) {
  //     setUser({
  //       email: 's8qsbnhyve@smykwb.com',
  //       chave: chave,
  //     });
  //   }
  // }, [navigation]);

  const nextScreen = async () => {
    // if (byPass) {
    //   navigation.navigate('RecoverLogin2', {email: user.email});
    //   return;
    // }

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
