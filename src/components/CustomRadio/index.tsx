import {Colors, dynamicSize} from '@/src/config';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  aceito: boolean;
  text: string;
  onToggle: (value: boolean) => void;
};

export const CustomRadio = ({aceito, text, onToggle}: Props) => {
  const styles = StyleSheet.create({
    checkbox: {
      marginRight: dynamicSize(5),
    },
    checkoutContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: dynamicSize(10),
      borderColor: Colors.blue,
    },
    checkoutText: {
      fontSize: dynamicSize(16),
      color: Colors.white,
      flex: 1,
      textAlign: 'justify',
    },
  });

  return (
    <View style={styles.checkoutContainer}>
      <TouchableOpacity
        onPress={() => onToggle(!aceito)}
        style={styles.checkbox}>
        {aceito ? (
          <MaterialCommunityIcons
            name="checkbox-marked"
            size={dynamicSize(25)}
            color={Colors.blue}
          />
        ) : (
          <MaterialCommunityIcons
            name="checkbox-blank-outline"
            size={dynamicSize(25)}
            color={Colors.blue}
          />
        )}
      </TouchableOpacity>
      <Text style={styles.checkoutText}>{text}</Text>
    </View>
  );
};
