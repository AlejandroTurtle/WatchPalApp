import {PropsScreen} from '@/src/types/Navigation';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useIndex} from './useIndex';
import {CustomCardOptions} from '@/src/components/CustomCardOptions';
import {CustomScreenContainer} from '@/src/components/CustomScreenContainer';
import {CustomHeader} from '@/src/components/CustomHeader';

export const Adjustments = ({navigation, route}: PropsScreen) => {
  const {logout, handleMessageSuporte, handleShare} = useIndex({
    navigation,
    route,
  });

  return (
    <CustomScreenContainer>
      <CustomHeader text="Ajustes" />
      <View style={styles.cardsRow}>
        <CustomCardOptions
          icon="user"
          label="Perfil"
          onPress={() => navigation.navigate('Profile')}
        />
        <CustomCardOptions
          icon="help-circle"
          label="Suporte"
          onPress={handleMessageSuporte}
        />
        <CustomCardOptions
          icon="user-plus"
          label="Convidar Amigos"
          onPress={handleShare}
        />
        <CustomCardOptions icon="log-out" label="Sair" onPress={logout} />
      </View>
    </CustomScreenContainer>
  );
};

const styles = StyleSheet.create({
  cardsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
