// useIndex.ts

import {Alert} from '@/src/components/Alert';
import {setItemAsync} from '@/src/libs/AsyncStorage';
import {getToken} from '@/src/libs/Firebase/messaging';
import {api} from '@/src/services/api';
import {UserCreateDTO} from '@/src/types/Auth';
import {PropsScreen} from '@/src/types/Navigation';
import {KeysPix} from '@/src/types/TypeKeysPix';
import {getKeysPix} from '@/src/utils/GetTypesKeyPix';
import {validarCPF} from '@/src/utils/validarCPF';
import {validarEmail} from '@/src/utils/validarEmail';
import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import _default from 'react-native-permissions';

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
  const [keysPix, setKeysPix] = useState<KeysPix[]>([]);
  const [mask, setMask] = useState<any>(undefined);
  const [photoChanged, setPhotoChanged] = useState(false);

  // if (__DEV__) {
  //     useEffect(() => {
  //         setUser({
  //             ...user,
  //             nome: 'Alejandro',
  //             apelido: 'Ale',
  //             celular: '(31) 991599292',
  //             email: 'alejandrogomes23@hotmail.com',
  //             chavepixtipo: 2,
  //             chavepix: '(31) 991599292',
  //             cpf: '147.694.396-60',
  //             confirmarEmail: 'alejandrogomes23@hotmail.com',
  //             senha: 'Teste@01',
  //             confirmarSenha: 'Teste@01',
  //             chave: chave,
  //         });
  //     }, []);
  // }

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

  if (__DEV__) {
    user.nome = 'Alejandro Gomes';
    user.celular = '(31) 9 9159 9292';
    user.email = 'teste@hodtmail.com';
    user.confirmarEmail = 'teste@hodtmail.com';
    user.senha = 'Teste@01';
    user.confirmarSenha = 'Teste@01';
  }

  const createAccount = async () => {
    setLoading(true);
    if (await validation()) {
      const body = {
        ...user,
      };
      console.log('body', JSON.stringify(body, null, 2));
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
        console.log('response', JSON.stringify(response, null, 2));
        await setItemAsync('userId', response?.data?.id);
        setAlert({
          title: 'Sucesso',
          message: 'Usuário criado com sucesso',
          onPress: () => {
            navigation.navigate('ConfirmEmail', {
              id: response?.data?.id,
              email: body?.email,
              senha: body?.senha,
            });
          },
        });
      } else {
        setAlert({
          title: 'Aviso',
          message: response?.error,
        });
        console.log('response', JSON.stringify(response, null, 2));
      }
    }
    setLoading(false);
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
    keysPix,
    mask,
    setPhotoChanged,
  };
};
