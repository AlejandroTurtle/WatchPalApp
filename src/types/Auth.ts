import {ImagePickerResult} from '../components/CustomProfileImagePicker';

export type UserCreateDTO = {
  nome: string;
  celular: string;
  id?: number;
  email: string;
  confirmarEmail: string;
  senha: string;
  confirmarSenha: string;
  foto: ImagePickerResult;
  error?: {
    nome?: string;
    celular?: string;
    email?: string;
    confirmarEmail?: string;
    senha?: string;
    confirmarSenha?: string;
    aceito?: string;
    foto: ImagePickerResult;
  };
};

export type ImagePickerResponse = {
  uri: string;
  fileName: string;
  type: string;
};

export type UserLoginDTO = {
  email: string;
  senha: string;
  chave: string;
  error?: {
    email?: string;
    senha?: string;
  };
};

export type UserProfile = {
  id: string;
  emailConfirmado?: boolean;
  token: string;
  nome: string;
  apelido: string;
  id_usuario: number;
  cpf: string;
  chavepix: string;
  chavepixtipo: string;
  chavepixtipoId: number;
  email: string;
  foto: ImagePickerResult;
  celular: string;
};

export type User = {
  id: string;
  emailConfirmado?: boolean;
  token: string;
  nome: string;
  apelido: string;
};
