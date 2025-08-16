import {CustomButton} from '@/src/components/CustomButton';
import {CustomScreenContainer} from '@/src/components/CustomScreenContainer';
import {CustomText} from '@/src/components/CustomText';
import TextNavigation from '@/src/components/TextNavigation';
import {Colors, dynamicSize, sizeScreen} from '@/src/config';
import {PropsScreen} from '@/src/types/Navigation';
import React from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import logoPrincipal from '@/src/assets/logoPrincipal.png';
import {useTheme} from '@react-navigation/native';
import logoLight from '@/src/assets/lightLogo.png';
import logoDark from '@/src/assets/darkLogo.png';

export const StartApp = ({navigation, route}: PropsScreen) => {
  const {colors, dark} = useTheme();

  const currentLogo = dark ? logoLight : logoDark;

  const styles = StyleSheet.create({
    containerImage: {
      alignSelf: 'center',
      height: sizeScreen.height * 0.35,
      width: sizeScreen.width - dynamicSize(100),
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
  });

  return (
    <CustomScreenContainer>
      <ScrollView
        style={{width: '100%'}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: sizeScreen.height * 0.1,
        }}>
        <View style={styles.containerImage}>
          <Image style={styles.image} source={logoLight} />
        </View>

        <CustomButton
          title={'Login com e-mail'}
          onPress={() => navigation.navigate('Login')}
          alignItems="flex-end"
          mv={20}
        />

        <TextNavigation
          text1="Não tem uma conta?"
          text2="Registre-se"
          onPress={() => navigation.navigate('RegisterForm1')}
        />
      </ScrollView>
    </CustomScreenContainer>
  );
};
