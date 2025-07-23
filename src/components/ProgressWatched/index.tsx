import {Colors} from '@/src/config';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ProgressBar} from 'react-native-paper';

type PropsProgressWatched = {
  progress: number;
};

export const ProgressWatched = ({progress}: PropsProgressWatched) => {
  return (
    <ProgressBar
      progress={progress}
      style={styles.progress}
      color={Colors.blue}
    />
  );
};

const styles = StyleSheet.create({
  progress: {
    height: 8,
    width: 155,
    borderRadius: 20,
    backgroundColor: Colors.gray400,
  },
});
