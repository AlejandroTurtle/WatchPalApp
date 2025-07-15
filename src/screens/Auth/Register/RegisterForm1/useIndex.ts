// useIndex.ts

import {Alert} from '@/src/components/Alert';
import {setItemAsync} from '@/src/libs/AsyncStorage';
import {api} from '@/src/services/api';
import {UserCreateDTO} from '@/src/types/Auth';
import {PropsScreen} from '@/src/types/Navigation';
import {validarEmail} from '@/src/utils/validarEmail';
import {useEffect, useState} from 'react';

export const useIndex = ({navigation, route}: PropsScreen) => {
  const params = route.params as UserCreateDTO;
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

  const defaultUser: UserCreateDTO = {
    nome: '',
    celular: '',
    email: '',
    confirmarEmail: '',
    senha: '',
    confirmarSenha: '',
    foto: {uri: '', fileName: '', type: ''},
  };

  const [user, setUser] = useState<UserCreateDTO>(defaultUser);

  const [isLoading, setLoading] = useState(false);
  const [alert, setAlert] = useState<Alert>(null);
  const [aceito, setAceito] = useState(false);
  const [photoChanged, setPhotoChanged] = useState(false);

  const validation = () => {
    let isValid = true;
    const errors: any = {};

    if (!user.nome) {
      errors.nome = texts.errors.requiredfield;
      isValid = false;
    }
    if (!user.celular) {
      errors.celular = texts.errors.requiredfield;
      isValid = false;
    }
    if (!user.email) {
      errors.email = texts.errors.requiredfield;
      isValid = false;
    } else if (!validarEmail(user.email)) {
      errors.email = texts.errors.invalidemail;
      isValid = false;
    }
    if (!user.confirmarEmail) {
      errors.confirmarEmail = texts.errors.requiredfield;
      isValid = false;
    } else if (user.email !== user.confirmarEmail) {
      errors.confirmarEmail = texts.errors.emailsmustmatch;
      isValid = false;
    }
    if (!user.senha) {
      errors.senha = texts.errors.requiredfield;
      isValid = false;
    } else if (user.senha.length < 6) {
      errors.senha = texts.errors.passwordminLength;
      isValid = false;
    }
    if (!user.confirmarSenha) {
      errors.confirmarSenha = texts.errors.requiredfield;
      isValid = false;
    } else if (user.senha !== user.confirmarSenha) {
      errors.confirmarSenha = texts.errors.passwordsmustmatch;
      isValid = false;
    }
    if (!aceito) {
      errors.aceito = 'Você precisa aceitar os termos de uso';
      isValid = false;
    }

    setUser(prev => ({...prev, error: errors}));
    return isValid;
  };

  useEffect(() => {
    const userData = {
      nome: 'Alejandro Gomes',
      email: 'alejandrogomes23@hotmail.com',
      senha: 'k8v674223',
      celular: '31991599292',
      confirmarEmail: 'alejandrogomes23@hotmail.com',
      confirmarSenha: 'k8v674223',
    };

    if (__DEV__) {
      setUser({
        ...user,
        nome: userData.nome,
        email: userData.email,
        senha: userData.senha,
        celular: userData.celular,
        confirmarEmail: userData.confirmarEmail,
        confirmarSenha: userData.confirmarSenha,
      });
    }
  }, []);

  const createAccount = async () => {
    setLoading(true);
    if (await validation()) {
      const body = {
        ...user,
      };
      const formData = new FormData();
      formData.append('nome', body?.nome);
      formData.append('celular', body?.celular);
      formData.append('email', body?.email);
      formData.append('password', body?.senha);
      if (photoChanged && body?.foto) {
        formData.append('foto', {
          name: body?.foto?.fileName,
          type: body?.foto?.type,
          uri: body?.foto?.uri,
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
                {name: 'Login', params: {email: user.email, senha: user.senha}},
              ],
            });
          },
        });
        setLoading(false);
      }
    }
  };

  const errosLength = user?.error
    ? Object.values(user?.error)?.filter(e => e !== undefined).length
    : 0;

  return {
    user,
    setUser,
    isLoading,
    alert,
    setAlert,
    createAccount,
    texts,
    errosLength,
    aceito,
    setAceito,
    setPhotoChanged,
  };
};
