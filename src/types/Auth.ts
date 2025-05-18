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
  error?: {
    email?: string;
    senha?: string;
  };
};

export type UserProfile = {
  id: string;
  token: string;
  nome: string;
  id_usuario: number;
  email: string;
  foto: ImagePickerResult;
  celular: string;
};

export type User = {
  id: string;
  token: string;
  nome: string;
  apelido: string;
};
