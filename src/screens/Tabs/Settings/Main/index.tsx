import React from 'react';
import {PropsScreen} from '@/src/types/Navigation';
import {CustomScreenContainer} from '@/src/components/CustomScreenContainer';
import {CustomHeader} from '@/src/components/CustomHeader';
import {CustomMenu} from '@/src/components/CustomMenu';
import {useIndex} from './useIndex';

export const Settings = ({navigation, route}: PropsScreen) => {
  const {logout} = useIndex({navigation, route});
  return (
    <CustomScreenContainer>
      <CustomHeader text="Configurações" noBack />
      <CustomMenu name="Sair" onPress={logout} />
    </CustomScreenContainer>
  );
};
