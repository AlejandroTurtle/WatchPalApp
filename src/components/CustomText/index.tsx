/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {Colors} from '@/src/config';
import React from 'react';
import {StyleSheet, Text} from 'react-native';

type Props = {
  children: React.ReactNode;
  style?: object;
};

export const CustomText = ({children, style}: Props): React.JSX.Element => {
  return (
    <Text style={[styles.text, {color: Colors.white}, style]}>{children}</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Poppins-Regular',
  },
});
