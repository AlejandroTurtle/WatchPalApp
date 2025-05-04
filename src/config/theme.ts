// filepath: /c:/Users/Alejandro/Documents/Projetos/PokerPag/src/Config/theme.ts
import {DefaultTheme, Theme} from '@react-navigation/native';
import {Colors} from './index';

const MyTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.white,
  },
  fonts: {
    regular: {
      fontFamily: 'Poppins-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'SFProDisplay-Medium',
      fontWeight: 'normal',
    },
    bold: {
      fontFamily: 'Poppins-SemiBold',
      fontWeight: 'bold',
    },
    heavy: {
      fontFamily: 'SFProDisplay-Heavy',
      fontWeight: 'bold',
    },
  },
};

export default MyTheme;
