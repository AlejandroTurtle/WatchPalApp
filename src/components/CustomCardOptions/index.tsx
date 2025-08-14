import {Colors} from '@/src/config';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

interface CustomCardOptionsProps {
  icon: string;
  label: string;
  onPress?: () => void;
}

export const CustomCardOptions = ({
  icon,
  label,
  onPress,
}: CustomCardOptionsProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.rowCard}>
        <View style={styles.iconWrapper}>
          <Feather name={icon} size={26} color={Colors.white} />
        </View>

        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '49%',
    backgroundColor: Colors.secondaryBackground,
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 14,
    marginBottom: 10,
    minHeight: 84,
    justifyContent: 'center',
  },
  rowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  iconWrapper: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  label: {
    width: '100%',
    flexWrap: 'wrap',
    fontFamily: 'Poppins-Medium',
    color: Colors.white,
    fontSize: 14,
  },
});
