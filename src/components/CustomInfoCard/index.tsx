import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {Colors} from '@/src/config';

interface CustomInfoCardProps {
  iconName: string;
  value: number | string;
  label: string;
  loading?: boolean;
}

export const CustomInfoCard = ({
  iconName,
  value,
  label,
  loading,
}: CustomInfoCardProps) => {
  return (
    <View style={styles.card}>
      <Icon name={iconName} size={28} color={Colors.white} />
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>
        {loading ? <ActivityIndicator color={Colors.white} size={20} /> : value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.blue,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 110, // reduzido para caber 3 cards
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  value: {
    fontSize: 14, // menor para caber no card
    fontWeight: 'bold',
    color: Colors.white,
    marginTop: 4,
  },
  label: {
    fontSize: 12, // menor para ficar proporcional
    color: Colors.white,
    marginTop: 2,
    textAlign: 'center',
  },
});
