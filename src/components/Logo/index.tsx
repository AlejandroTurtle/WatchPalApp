import {dynamicSize} from '@/src/config';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
// Corrigindo a importação da imagem
import logo from '@/src/assets/logo.png';
import {useTheme} from '@react-navigation/native';
import logoLight from '@/src/assets/lightLogo.png';
import logoDark from '@/src/assets/darkLogo.png';

export const Logo = () => {
  const {colors, dark} = useTheme();

  const currentLogo = dark ? logoLight : logoDark;
  return (
    <View style={styles.containerImage}>
      {/* Usando a imagem importada diretamente */}
      <Image style={styles.image} source={currentLogo} />
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
