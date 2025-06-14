import {PropsScreen} from '@/src/types/Navigation';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {useIndex} from './useIndex';
import {CustomScreenContainer} from '@/src/components/CustomScreenContainer';
import {CustomHeader} from '@/src/components/CustomHeader';
import {CustomShowFavorites} from '@/src/components/CustomShowFavorites';

export const Favorites = ({navigation, route}: PropsScreen) => {
  const {favorites} = useIndex({navigation, route});

  return (
    <CustomScreenContainer>
      <CustomHeader text="Favoritos" noBack />

      <CustomShowFavorites favorites={favorites} />
    </CustomScreenContainer>
  );
};

const styles = StyleSheet.create({});
