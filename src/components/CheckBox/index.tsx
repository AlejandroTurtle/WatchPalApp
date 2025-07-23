// src/components/CheckBox.tsx
import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {Colors} from '@/src/config';

type CheckBoxProps = {
  value: string; // ex: "1-3"
  checked: boolean; // está marcado?
  onPress: (value: string) => void;
};

export const CheckBox: React.FC<CheckBoxProps> = ({
  value,
  checked,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(value)}>
      <Feather
        name={checked ? 'check-circle' : 'circle'}
        size={20}
        color={checked ? Colors.blue : Colors.gray300}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
});
