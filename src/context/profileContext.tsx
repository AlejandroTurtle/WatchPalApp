/* eslint-disable react-hooks/rules-of-hooks */
import React, {createContext, useContext, useEffect, useState} from 'react';
import {
  cleanAllItemAsync,
  getItemAsync,
  setItemAsync,
} from '../libs/AsyncStorage';
import {User, UserProfile} from '../types/Auth';
import {api} from '../services/api';

type PropsContext = {
  user: User | null;
  profile: UserProfile | null;
  saveProfile: (data: UserProfile) => void;
  removeProfile: () => Promise<void>;
  tokenVerify: () => Promise<boolean>;
  rememberUser: () => Promise<UserProfile | null>;
  loadProfile: () => Promise<void>;
};

const Context = createContext({} as PropsContext);

export const AppProfileContext = ({
  children,
}: {
  children: React.JSX.Element;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const tokenVerify = async () => {
    try {
      const token = await getItemAsync('token');
      const response = await api.post<any>('/usuarios/ValidarToken', {
        token,
      });
      if (response.success) {
        return true;
      } else {
        await removeProfile();
        return false;
      }
    } catch (error) {
      return true;
    }
  };

  async function loadProfile() {
    try {
      const response = await api.get<UserProfile>('/usuarios/UsuariosDados');
      if (response.success && response.data) {
        const _data = response.data as any;
        setProfile(_data);
      }
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
    }
  }

  useEffect(() => {
    loadProfile();
  }, []);

  async function rememberUser() {
    const rememberProfile = await getItemAsync('profile');
    setUser(rememberProfile);
    return rememberProfile;
  }

  async function saveProfile(data: UserProfile) {
    if (data?.token) {
      await setItemAsync('token', data?.token);
    }
    const _data = {
      id: data?.id,
    };
    await setItemAsync('profile', _data);
    setUser(data);
  }

  async function removeProfile() {
    setUser(null);
    await cleanAllItemAsync();
  }

  return (
    <Context.Provider
      value={{
        user,
        saveProfile,
        removeProfile,
        tokenVerify,
        rememberUser,
        loadProfile,
        profile,
      }}>
      {children}
    </Context.Provider>
  );
};

export function profileContext(): PropsContext {
  return useContext(Context) as PropsContext;
}
