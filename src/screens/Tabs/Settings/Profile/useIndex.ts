import {Alert} from '@/src/components/Alert';
import {profileContext} from '@/src/context/profileContext';
import {setItemAsync} from '@/src/libs/AsyncStorage';
import {api} from '@/src/services/api';
import {User, UserProfile} from '@/src/types/Auth';
import {PropsScreen} from '@/src/types/Navigation';
import {KeysPix} from '@/src/types/TypeKeysPix';
import {getKeysPix} from '@/src/utils/GetTypesKeyPix';
import {useEffect, useState} from 'react';

export type PixType =
  | 'Celular'
  | 'CPF'
  | 'CNPJ'
  | 'Aleatória'
  | 'E-mail'
  | undefined;

export const useIndex = ({navigation, route}: PropsScreen) => {
  const {profile, loadProfile} = profileContext();
  const [user, setUser] = useState<UserProfile | null>(profile);
  const [mask, setMask] = useState<PixType>(undefined);
  const [keysPix, setKeysPix] = useState<KeysPix[]>([]);
  const [loading, setLoading] = useState(false);
  const [photoChanged, setPhotoChanged] = useState(false);
  const [alert, setAlert] = useState<Alert>(null);
  const [initialData, setInitialData] = useState<UserProfile | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadProfile();
    });
    loadProfile();
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (profile) {
      setUser(profile);
    }
  }, [profile]);

  useEffect(() => {
    if (!initialData || !user) {
      setHasChanges(false);
      return;
    }

    const dirty =
      JSON.stringify(initialData) !== JSON.stringify(user) || photoChanged;
    setHasChanges(dirty);
  }, [user, initialData, photoChanged]);

  useEffect(() => {
    const keysPixGet = async () => {
      const keys = await getKeysPix();
      if (keys) {
        setKeysPix(keys);
      }
    };
    keysPixGet();
  }, []);

  const handlePickerChange = (selectedId: number) => {
    setUser(prev =>
      prev ? {...prev, chavepixtipo: String(selectedId)} : null,
    );

    switch (selectedId) {
      case 1:
        setMask('Aleatória');
        break;
      case 2:
        setMask('Celular');
        break;
      case 3:
        setMask('E-mail');
        break;
      case 4:
        setMask('CPF');
        break;
      case 5:
        setMask('CNPJ');
        break;
      default:
        setMask(undefined);
    }
  };

  const changeKeyboardType = (maskType: PixType) => {
    switch (maskType) {
      case 'Celular':
        return 'phone-pad';
      case 'E-mail':
        return 'email-address';
      case 'CPF':
        return 'numeric';
      case 'CNPJ':
        return 'numeric';
      default:
        return 'default';
    }
  };

  const texts = {
    errors: {
      requiredfield: 'Campo obrigatório',
      invalidemail: 'E-mail inválido',
    },
  };

  const validation = () => {
    let isValid = true;
    const errors: any = {};

    if (!user?.apelido) {
      errors.apelido = texts.errors.requiredfield;
      isValid = false;
    }
    if (!user?.celular) {
      errors.celular = texts.errors.requiredfield;
      isValid = false;
    }

    if (!user?.chavepix) {
      errors.chavepix = texts.errors.requiredfield;
      isValid = false;
    }

    if (!user?.email) {
      errors.email = texts.errors.requiredfield;
      isValid = false;
    } else if (!validarEmail(user?.email)) {
      errors.email = texts.errors.invalidemail;
      isValid = false;
    }

    setUser(prev => (prev ? {...prev, error: errors} : null));
    return isValid;
  };

  const changeUserData = async () => {
    setLoading(true);
    const body = {
      ...user,
    };
    const formData = new FormData();
    formData.append('nome', body?.nome);
    formData.append('apelido', body?.apelido?.trim());
    formData.append('celular', body?.celular);
    formData.append('chavepixtipo', body?.chavepixtipo);
    formData.append('chavepix', body?.chavepix);
    formData.append('email', body?.email);
    formData.append('cpf', body?.cpf);
    if (photoChanged && body.foto) {
      formData.append('foto', {
        name: body.foto?.fileName,
        type: body.foto?.type,
        uri: body.foto?.uri,
      });
    }
    const response = await api.form('usuarios/alterar', formData);
    if (response.success) {
      setAlert({
        title: 'Sucesso',
        message: 'Perfil alterado com sucesso',
        onPress: () =>
          navigation.reset({
            index: 0,
            routes: [{name: 'Tabs'}],
          }),
      });
      loadProfile();
      if (body.email !== profile?.email) {
        await setItemAsync('userId', profile?.id);
        setAlert({
          title: 'Sucesso',
          message: 'Agora você precisa confirmar seu e-mail',
          onPress: () =>
            navigation.navigate('ConfirmEmailProfile', {id: profile?.id}),
        });
      }
    } else {
      setAlert({
        title: 'Alerta',
        message: response.error,
      });
    }
    setLoading(false);
  };

  const handleChange = () => {
    if (validation()) {
      changeUserData();
    }
  };

  return {
    user,
    setUser,
    profile,
    handlePickerChange,
    mask,
    changeKeyboardType,
    keysPix,
    loading,
    handleChange,
    setPhotoChanged,
    alert,
    setAlert,
  };
};
