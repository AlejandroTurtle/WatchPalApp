// useIndex.ts

import {Alert} from '@/src/components/Alert';
import {api} from '@/src/services/api';
import {PropsScreen} from '@/src/types/Navigation';
import {validarEmail} from '@/src/utils/Validators';
import {yupResolver} from '@hookform/resolvers/yup';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';

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
  const [user, setUser] = useState<UserDTO>(defaultUser);
  const [isLoading, setLoading] = useState(false);
  const [alert, setAlert] = useState<Alert>(null);

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [confirmSecureTextEntry, setConfirmSecureTextEntry] = useState(true);

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

  const SchemaValidation = yup.object({
    email: yup
      .string()
      .email('E‑mail inválido')
      .required('E‑mail é obrigatório')
      .test(
        'validar-email',
        'Preencha um e‑mail válido',
        value => !!value && validarEmail(value),
      ),
  });

  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(SchemaValidation),
  });
  const requestNewPassword = async () => {
    setLoading(true);
    const body = {
      code: user.codigo,
      password: user.password,
    };
    const request = await api.post('/usuarios/RecuperarSenha', body);
    if (request.success) {
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
    texts,
    resendCode,
    secureTextEntry,
    setSecureTextEntry,
    control,
    handleSubmit,
    requestNewPassword,
    confirmSecureTextEntry,
    setConfirmSecureTextEntry,
  };
};
