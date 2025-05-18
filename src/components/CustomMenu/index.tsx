import {Colors, dynamicSize} from '@/src/config';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

type Props = {
  name: string;
  onPress?: () => void;
};

export const CustomMenu = ({name, onPress}: Props) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginVertical: dynamicSize(10),
      justifyContent: 'space-between',
    },
    line: {
      borderBottomColor: Colors.blue,
      borderBottomWidth: dynamicSize(1),
      width: '100%',
      opacity: 0.5,
    },
    text: {
      fontFamily: 'Poppins-Regular',
      fontSize: dynamicSize(16),
      color: Colors.blue,
    },
  });

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Text style={styles.text}>{name}</Text>
        <Feather name="chevron-right" size={20} color={Colors.blue} />
      </TouchableOpacity>
      <View style={styles.line} />
    </>
  );
};
