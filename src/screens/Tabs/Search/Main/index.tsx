import {PropsScreen} from '@/src/types/Navigation';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useIndex} from './useIndex';

export const Search = ({navigation, route}: PropsScreen) => {
  const {} = useIndex({navigation, route});

  return (
    <View>
      <Text>AccountData</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
