import {Alert} from '@/src/components/Alert';
import {chave} from '@/src/config';
import {profileContext} from '@/src/context/profileContext';
import {getToken} from '@/src/libs/Firebase/messaging';
import {api} from '@/src/services/api';
import {UserLoginDTO, UserProfile} from '@/src/types/Auth';
import {PropsScreen} from '@/src/types/Navigation';
import {validarEmail} from '@/src/utils/validarEmail';
import {useEffect, useState} from 'react';
import {BackHandler} from 'react-native';

export const useIndex = ({navigation, route}: PropsScreen) => {
  const defaultUser: UserLoginDTO = {
    email: '',
    senha: '',
    chave: chave,
  };

  const [user, setUser] = useState<UserLoginDTO>(defaultUser);
  const {saveProfile} = profileContext();
  const [isLoading, setLoading] = useState(false);
  const [alert, setAlert] = useState<Alert>(null);

  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {
        return true;
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  const texts = {
    linksignup: 'Criar conta',
    linkforgot: 'Esqueceu sua senha?',
    inputemail: 'E-mail',
    inputpassword: 'Senha',
    button: 'Login',
    errors: {
      emptyfield: 'Campo obrigatório',
      invalidemail: 'E-mail inválido',
    },
  };

  const setError = (key: keyof UserLoginDTO, message: string) => {
    setUser(prevUser => ({
      ...prevUser,
      error: {
        ...prevUser.error,
        [key]: message,
      },
    }));
  };

  useEffect(() => {
    const userData = [
      {email: 'alejandrogomes23@hotmail.com', senha: 'k8v674223'},
    ];

    if (__DEV__) {
      const id = 0;
      setUser({
        email: userData[id].email,
        senha: userData[id].senha,
      });
    }
  }, []);

  const validation = async () => {
    console.log('validation: ', JSON.stringify(user, null, 2));
    if (!user.email) {
      setError('email', texts.errors.emptyfield);
      return false;
    } else if (!validarEmail(user.email)) {
      setError('email', texts.errors.invalidemail);
      return false;
    } else if (!user.senha) {
      setError('senha', texts.errors.emptyfield);
      return false;
    }
    return true;
  };

  const requestLogin = async () => {
    setLoading(true);

    const body = {
      email: user.email.toLowerCase().trim(),
      password: user.senha,
    };

    let response = await api.post<UserProfile>('/usuarios/Login', body);

    if (response.success) {
      const data = response?.data as UserProfile;
      if (data?.emailConfirmado) {
        saveProfile(data);
        navigation.reset({
          index: 0,
          routes: [{name: 'Tabs'}],
        });
        console.log('response: ', JSON.stringify(data, null, 2));
      } else {
        setAlert({
          message: 'E-mail não confirmado',
          title: 'Alerta',
        });
      }
    } else {
      setAlert({
        message: response?.error,
        title: 'Aviso',
      });
    }
    setLoading(false);
  };

  const nextScreen = async () => {
    let isPassed = await validation();
    isPassed && (await requestLogin());
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
