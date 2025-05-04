/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {Colors, dynamicSize} from '@/src/config';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

type props = {
  text: string;
  onPress: () => void;
  customStyle?: object;
};

export const CustomTextWithNavigation = ({
  text,
  onPress,
  customStyle,
}: props) => {
  const styles = StyleSheet.create({
    container: {
      width: '100%',
    },
    text: {
      paddingLeft: dynamicSize(2),
      fontSize: dynamicSize(16),
      color: Colors.blue,
      textAlign: 'center',
      fontFamily: 'Poppins-bold',
      fontWeight: 'bold',
    },
    pressable: {
      justifyContent: 'center',

      marginVertical: dynamicSize(2),
    },
  });

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      testID={text.replace(/ /g, '_')}
      onPress={onPress}
      style={[styles.pressable, customStyle]}>
      <Text style={[styles.text, customStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};
