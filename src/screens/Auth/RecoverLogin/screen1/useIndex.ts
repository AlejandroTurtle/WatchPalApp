// useIndex.ts

import {Alert} from '@/src/components/Alert';
import {api} from '@/src/services/api';
import {PropsScreen} from '@/src/types/Navigation';
import {validarEmail} from '@/src/utils/Validators';
import {yupResolver} from '@hookform/resolvers/yup';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';

export const useIndex = ({navigation, route}: PropsScreen) => {
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
  const request = async () => {
    setLoading(true);
    const body = {
      email: getValues('email').toLowerCase().trim(),
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
          navigation.navigate('RecoverLogin2', {email: body.email}),
      });
    } else {
      setAlert({
        message: response.error,
        title: 'Alerta',
      });
    }
  };

  return {
    isLoading,
    alert,
    setAlert,
    texts,
    control,
    handleSubmit,
    request,
  };
};
