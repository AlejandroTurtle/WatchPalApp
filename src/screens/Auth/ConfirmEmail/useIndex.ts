import {Alert} from '@/src/components/Alert';
import {chave} from '@/src/config';
import {profileContext} from '@/src/context/profileContext';
import {cleanItemAsync, getItemAsync} from '@/src/libs/AsyncStorage';
import {getToken} from '@/src/libs/Firebase/messaging';
import {api} from '@/src/services/api';
import {UserCreateDTO, UserProfile} from '@/src/types/Auth';
import {PropsScreen} from '@/src/types/Navigation';
import {useEffect, useState} from 'react';

type Props = {
    codigo: string;
    error?: {
        codigo?: string;
    };
};

const defaultUser: Props = {
    codigo: '',
};

export const useIndex = ({navigation, route}: PropsScreen) => {
    const params = route.params as UserCreateDTO;
    const [codigo, setCodigo] = useState<Props>(defaultUser);
    const [loading, setLoading] = useState<boolean>(false);
    const [alert, setAlert] = useState<Alert>(null);
    const [userId, setUserId] = useState<string>();
    const {saveProfile} = profileContext();

    console.log('params', params);

    useEffect(() => {
        const getUserId = async () => {
            if (!params?.id) {
                const id = await getItemAsync('userId');
                setUserId(id);
            }
        };
        getUserId();
    }, [params]);

    const error = {
        requiredfield: 'Campo obrigatório',
    };

    const validation = () => {
        let isValid = true;
        const errors: any = {};

        if (!codigo.codigo) {
            errors.codigo = error.requiredfield;
            isValid = false;
        }
        setCodigo(prev => ({...prev, error: errors}));
        return isValid;
    };

    const requestLogin = async () => {
        setLoading(true);
        let token;
        try {
            token = await getToken();
        } catch (error) {
            console.log('error: ', JSON.stringify(error, null, 2));
        }

        const body = {
            email: params?.email.toLowerCase().trim(),
            senha: params?.senha,
            chave,
            token,
        };
        console.log('body', body);
        let response = await api.post<UserProfile>(
            'autenticacao/autenticar',
            body,
        );
        console.log('response: ', response);

        if (response.success) {
            const data = response?.data as UserProfile;
            if (data?.emailConfirmado) {
                saveProfile(data);
                navigation.reset({
                    index: 0,
                    routes: [{name: 'Tabs'}],
                });
                console.log('response: ', data);
            } else {
                setAlert({
                    message: 'E-mail não confirmado',
                    title: 'Alerta',
                });
            }
        } else {
            setAlert({
                message: response?.error,
                title: 'Alerta',
            });
        }
        setLoading(false);
    };

    const handleConfirmEmail = async () => {
        setLoading(true);
        if (validation()) {
            const body = {
                id: params?.id || userId,
                codigo: codigo.codigo,
                chave: chave,
            };
            const response = await api.post(
                'autenticacao/autenticar-conf-email',
                body,
            );
            if (response.success) {
                console.log('response', JSON.stringify(response, null, 2));

                setAlert({
                    title: 'Sucesso',
                    message: 'E-mail confirmado com sucesso!',
                    onPress: async () => {
                        await cleanItemAsync('userId');
                        params?.email && params?.senha
                            ? await requestLogin()
                            : navigation.reset({
                                  index: 0,
                                  routes: [{name: 'AuthStack'}],
                              });
                    },
                });
            } else {
                setAlert({
                    title: 'Aviso',
                    message: response.error,
                });
            }
        }
        setLoading(false);
    };

    const handleResendEmail = async () => {
        setLoading(true);
        const body = {
            id: params?.id || userId,
            chave: chave,
        };
        const response = await api.post(
            'autenticacao/autenticar-reenviar-email',
            body,
        );
        console.log('body', JSON.stringify(body, null, 2));
        if (response.success) {
            console.log('response', JSON.stringify(response, null, 2));
            setAlert({
                title: 'Sucesso',
                message: 'E-mail reenviado com sucesso!',
            });
        } else {
            setAlert({
                title: 'Aviso',
                message: response.error,
            });
        }
        setLoading(false);
    };

    return {
        params,
        alert,
        setAlert,
        codigo,
        setCodigo,
        loading,
        handleConfirmEmail,
        handleResendEmail,
    };
};
