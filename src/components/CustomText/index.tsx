/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {Colors} from '@/src/config';
import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, useColorScheme} from 'react-native';

type Props = {
  children: React.ReactNode;
  style?: object;
};

export const CustomText = ({children, style}: Props): React.JSX.Element => {
  const {colors} = useTheme();

  return (
    <Text style={[styles.text, {color: colors.text}, style]}>{children}</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Poppins-Regular',
  },
});
