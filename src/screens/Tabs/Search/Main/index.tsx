import {PropsScreen} from '@/src/types/Navigation';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useIndex} from './useIndex';
import {CustomScreenContainer} from '@/src/components/CustomScreenContainer';
import {CustomHeader} from '@/src/components/CustomHeader';
import {CustomInput} from '@/src/components/CustomInput';
import {CustomListMedia} from '@/src/components/CustomListMedia';
import {dynamicSize} from '@/src/config';

export const Search = ({navigation, route}: PropsScreen) => {
  const {control, handleSubmit, SearchMedia, media} = useIndex({
    navigation,
    route,
  });

  return (
    <>
      <View style={styles.container}>
        <CustomHeader text="Busca" noBack />
        <CustomInput
          label="Busca"
          name="busca"
          control={control}
          placeholder="Digite sua busca..."
          onSubmitEditing={handleSubmit(SearchMedia)}
          closed
        />
        <CustomListMedia
          media={media}
          onPress={item => navigation.navigate('Details', {filme: item})}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: dynamicSize(10),
  },
});
