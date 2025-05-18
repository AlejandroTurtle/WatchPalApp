// useIndex.ts

import {Alert} from '@/src/components/Alert';
import {api} from '@/src/services/api';
import {PropsScreen} from '@/src/types/Navigation';
import {useState} from 'react';

type UserDTO = {
  codigo: string;
  password: string;
  confirmPassword: string;
  error?: {
    codigo?: string;
  };
};

const defaultUser: UserDTO = {
  codigo: '',
  password: '',
  confirmPassword: '',
};

export const useIndex = ({navigation, route}: PropsScreen) => {
  const params = route.params;
  console.log('params: ', JSON.stringify(params, null, 2));
  const [user, setUser] = useState<UserDTO>(defaultUser);
  const [isLoading, setLoading] = useState(false);
  const [alert, setAlert] = useState<Alert>(null);

  console.log('parametros: ', params);

  const texts = {
    inputcode: 'Código',
    linkremenberpwd: 'Recordei minha senha',
    inputpassword: 'Nova Senha',
    inputconfirmpassword: 'Confirme sua nova senha',
    button: 'Continuar',
    title: 'Vamos recuperar sua conta!',
    subtitle: 'Adicione o código que enviamos para seu e-mail e sua nova senha',
    errors: {
      emptyfield: 'Campo obrigatório',
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
    if (!user.codigo) {
      setError('codigo', texts.errors.emptyfield);
      return false;
    }
    if (!user.password) {
      setError('password', texts.errors.emptyfield);
      return false;
    }
    if (!user.confirmPassword) {
      setError('confirmPassword', texts.errors.emptyfield);
      return false;
    }
    if (user.password !== user.confirmPassword) {
      setError('confirmPassword', 'As senhas não coincidem');
      return false;
    }
    return true;
  };

  const requestNewPassword = async () => {
    setLoading(true);
    const body = {
      code: user.codigo,
      password: user.password,
    };
    const request = await api.post('/usuarios/RecuperarSenha', body);
    if (request.success) {
      console.log('request', JSON.stringify(request, null, 2));
      setAlert({
        title: 'Sucesso',
        message: 'Senha alterada com sucesso',
        onPress: () =>
          navigation.navigate('Login', {
            email: params.email,
            password: user.password,
          }),
      });
    } else {
      setAlert({
        title: 'Alerta',
        message: request.error,
      });
    }
    setLoading(false);
  };

  const nextScreen = async () => {
    console.log('entrou aqui: ');
    let isPassed = await validation();
    console.log('isPassed: ', isPassed);
    isPassed && (await requestNewPassword());
  };

  const resendCode = async () => {
    const body = {
      email: params.email,
    };
    const request = await api.post('/usuarios/ReenviarCodigo', body);
    if (request.success) {
      setAlert({
        title: 'Sucesso',
        message: 'Código reenviado com sucesso',
      });
    } else {
      setAlert({
        title: 'Alerta',
        message: request.error,
      });
    }
  };

  return {
    user,
    setUser,
    isLoading,
    alert,
    setAlert,
    nextScreen,
    texts,
    resendCode,
  };
};
