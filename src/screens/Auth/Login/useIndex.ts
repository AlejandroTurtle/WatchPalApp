import {Alert} from '@/src/components/Alert';
import {profileContext} from '@/src/context/profileContext';
import {getToken} from '@/src/libs/Firebase/messaging';
import {api} from '@/src/services/api';
import {UserLoginDTO, UserProfile} from '@/src/types/Auth';
import {PropsScreen} from '@/src/types/Navigation';
import {validarEmail} from '@/src/utils/Validators';
import {useEffect, useState} from 'react';
import {BackHandler} from 'react-native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

type FormFields = {
  email: string;
  password: string;
};

export const useIndex = ({navigation, route}: PropsScreen) => {
  const params = route.params as UserLoginDTO;
  const {saveProfile} = profileContext();
  const [isLoading, setLoading] = useState(false);
  const [alert, setAlert] = useState<Alert>(null);

  const SchemaValidation = yup
    .object({
      email: yup
        .string()
        .email('E‑mail inválido')
        .required('E‑mail é obrigatório')
        .test(
          'validar-email',
          'Preencha um e‑mail válido',
          value => !!value && validarEmail(value),
        ),
      password: yup
        .string()
        .min(6, 'Mínimo 6 caracteres')
        .required('Senha é obrigatória'),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(SchemaValidation),
  });

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

  useEffect(() => {
    if (__DEV__) {
      setValue('email', 'alejandrogomes23@hotmail.com');
      setValue('password', 'k8v674223');
    }
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

  useEffect(() => {
    if (params) {
      setValue('email', params.email || '');
      setValue('password', params.senha || '');
    }
  }, [params]);

  const requestLogin = async (data: FormFields) => {
    setLoading(true);

    const body = {
      email: data.email.toLowerCase().trim(),
      password: data.password,
    };

    let response = await api.post<UserProfile>('/usuarios/Login', body);

    if (response.success) {
      const _data = response?.data as UserProfile;
      saveProfile(_data);
      navigation.reset({
        index: 0,
        routes: [{name: 'Tabs'}],
      });
    } else {
      setAlert({
        message: response?.error,
        title: 'Aviso',
      });
    }
    setLoading(false);
  };

  return {
    control,
    handleSubmit,
    isLoading,
    alert,
    setAlert,
    texts,
    requestLogin,
  };
};
