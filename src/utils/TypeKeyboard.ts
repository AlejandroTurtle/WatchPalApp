import {PixType} from 'screens/Tabs/Settings/Profile/useIndex';

export const typeKeyboard = (mask: PixType) => {
  switch (mask) {
    case 'Celular':
    case 'CPF':
    case 'CNPJ':
      return 'number-pad';
    case 'E-mail':
      return 'email-address';
    default:
      return 'default';
  }
};
