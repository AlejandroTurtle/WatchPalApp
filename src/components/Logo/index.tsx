import {dynamicSize} from '@/src/config';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import logoLight from '@/src/assets/lightLogo.png';
import logoDark from '@/src/assets/darkLogo.png';

export const Logo = () => {
  const {dark} = useTheme();

  const currentLogo = dark ? logoLight : logoDark;
  return (
    <View style={styles.containerImage}>
      <Image style={styles.image} source={logoLight} />
    </View>
  );
};

const styles = StyleSheet.create({
  containerImage: {
    width: '100%',
    minHeight: 50,
  },
  image: {
    width: '100%',
    resizeMode: 'contain',
    height: dynamicSize(400),
  },
});
