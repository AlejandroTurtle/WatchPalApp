import {dynamicSize} from '@/src/config';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
// Corrigindo a importação da imagem
import logo from '@/src/assets/logo.png';

export const Logo = () => {
    console.log('logo: ', logo);
    return (
        <View style={styles.containerImage}>
            {/* Usando a imagem importada diretamente */}
            <Image style={styles.image} source={logo} />
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
