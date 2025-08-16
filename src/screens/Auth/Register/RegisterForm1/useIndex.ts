import {Alert} from '@/src/components/Alert';
import {setItemAsync} from '@/src/libs/AsyncStorage';
import {api} from '@/src/services/api';
import {UserCreateDTO} from '@/src/types/Auth';
import {PropsScreen} from '@/src/types/Navigation';
import {validarEmail} from '@/src/utils/Validators';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

export const useIndex = ({navigation, route}: PropsScreen) => {
  const texts = {
    inputname: 'Nome',
    inputemail: 'E-mail',
    inputapelido: 'Como deseja ser chamado?',
    inputcpf: 'CPF',
    inputconfirmemail: 'Confirmar E-mail',
    inputpassword: 'Senha',
    inputconfirmPassword: 'Confirmar Senha',
    button: 'Continuar',
    inputphone: 'Celular',
    errors: {
      requiredfield: 'Campo obrigatório',
      invalidemail: 'E-mail inválido',
      emailsmustmatch: 'Os emails devem ser iguais',
      passwordsmustmatch: 'As senhas devem ser iguais',
      passwordminLength: 'A senha deve ter no mínimo 6 caracteres',
    },
  };

  const [isLoading, setLoading] = useState(false);
  const [alert, setAlert] = useState<Alert>(null);
  const [aceito, setAceito] = useState(false);
  const [photoChanged, setPhotoChanged] = useState(false);
  const [foto, setFoto] = useState<UserCreateDTO['foto']>({
    uri: '',
    fileName: '',
    type: '',
  });

  const SchemaValidation = yup.object({
    nome: yup.string().required('Nome é obrigatório'),
    celular: yup.string().required('Celular é obrigatório'),
    email: yup
      .string()
      .email('E‑mail inválido')
      .required('E‑mail é obrigatório')
      .test(
        'validar-email',
        'Preencha um e‑mail válido',
        value => !!value && validarEmail(value),
      ),
    confirmarEmail: yup
      .string()
      .email('E‑mail inválido')
      .required('Confirmação de e‑mail é obrigatória')
      .oneOf([yup.ref('email')], 'Os e‑mails não coincidem'),
    senha: yup
      .string()
      .min(6, 'Mínimo 6 caracteres')
      .required('Senha é obrigatória'),
    confirmarSenha: yup
      .string()
      .min(6, 'Mínimo 6 caracteres')
      .required('Confirmação de senha é obrigatória')
      .oneOf([yup.ref('senha')], 'As senhas não coincidem'),
  });

  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm({
    defaultValues: {
      email: '',
      senha: '',
      nome: '',
      celular: '',
      confirmarEmail: '',
      confirmarSenha: '',
    },
    resolver: yupResolver(SchemaValidation),
  });

  // useEffect(() => {
  //   const userData = {
  //     nome: 'Alejandro Gomes',
  //     email: 'alejandrogomes23@hotmail.com',
  //     senha: 'k8v674223',
  //     celular: '31991599292',
  //     confirmarEmail: 'alejandrogomes23@hotmail.com',
  //     confirmarSenha: 'k8v674223',
  //   };

  //   if (__DEV__) {
  //     setUser({
  //       ...user,
  //       nome: userData.nome,
  //       email: userData.email,
  //       senha: userData.senha,
  //       celular: userData.celular,
  //       confirmarEmail: userData.confirmarEmail,
  //       confirmarSenha: userData.confirmarSenha,
  //     });
  //   }
  // }, []);

  const createAccount = async () => {
    setLoading(true);
    const body = {
      nome: getValues('nome'),
      celular: getValues('celular'),
      email: getValues('email').toLowerCase().trim(),
      confirmarEmail: getValues('confirmarEmail').toLowerCase().trim(),
      senha: getValues('senha'),
      confirmarSenha: getValues('confirmarSenha'),
      foto,
    };

    const formData = new FormData();
    formData.append('nome', body?.nome);
    formData.append('celular', body?.celular);
    formData.append('email', body?.email);
    formData.append('password', body?.senha);
    if (photoChanged && foto) {
      formData.append('foto', {
        name: foto?.fileName,
        type: foto?.type,
        uri: foto?.uri,
      });
    }

    const response = await api.form<UserCreateDTO>(
      '/usuarios/CriarUsuario',
      formData,
    );
    if (response.success) {
      await setItemAsync('userId', response?.data?.id);
      setAlert({
        title: 'Sucesso',
        message: 'Usuário criado com sucesso',
        onPress: () => {
          navigation.reset({
            index: 0,
            routes: [
              {name: 'Login', params: {email: body.email, senha: body.senha}},
            ],
          });
        },
      });
    } else {
      setAlert({
        title: 'Alerta',
        message: response.error,
      });
    }
    setLoading(false);
  };

  return {
    isLoading,
    alert,
    setAlert,
    createAccount,
    texts,
    aceito,
    setAceito,
    setPhotoChanged,
    setFoto,
    foto,
    control,
    handleSubmit,
  };
};
