import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useIndex} from './useIndex';
import {PropsScreen} from '@/src/types/Navigation';
import {Colors, dynamicSize, sizeScreen} from '@/src/config';
import {CustomScreenContainer} from '@/src/components/CustomScreenContainer';
import {CustomHeader} from '@/src/components/CustomHeader';
import {CustomText} from '@/src/components/CustomText';
import {CustomInput} from '@/src/components/CustomInput';
import {CustomTextWithNavigation} from '@/src/components/CustomTextWithNavigation';
import {CustomButton} from '@/src/components/CustomButton';
import TextNavigation from '@/src/components/TextNavigation';
import {CustomAlert} from '@/src/components/Alert';

export const Login = ({navigation, route}: PropsScreen) => {
  const {user, setUser, isLoading, alert, setAlert, nextScreen, texts} =
    useIndex({
      navigation,
      route,
    });

  const styles = StyleSheet.create({
    title: {
      fontSize: dynamicSize(38),
      color: Colors.white,
      textAlign: 'left',
      fontFamily: 'Poppins-SemiBold',
      marginBottom: dynamicSize(20),
    },

    containerImage: {
      alignSelf: 'center',
      height: sizeScreen.height * 0.25,
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
      <CustomHeader />
      <ScrollView
        style={{width: '100%'}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: dynamicSize(20),
        }}>
        <Text children={'Realize\nseu login!'} style={styles.title} />
        <View>
          <CustomInput
            keyboardType="email-address"
            title={texts.inputemail}
            keyName="email"
            value={[user, setUser]}
            icon="mail"
          />
          <CustomInput
            title={texts.inputpassword}
            keyName="senha"
            value={[user, setUser]}
            secureTextEntry
            icon="lock"
          />
        </View>
        <CustomTextWithNavigation
          text={texts.linkforgot}
          customStyle={{
            alignItems: 'flex-end',
            color: Colors.blue,
            marginbottom: dynamicSize(50),
          }}
          onPress={() => {
            navigation.navigate('RecoverLogin1');
          }}
        />

        <CustomButton
          title={texts.button}
          isLoading={isLoading}
          onPress={nextScreen}
          alignItems="flex-end"
          mv={20}
        />
        <TextNavigation
          text1="Criar uma nova conta?"
          text2="Crie"
          onPress={() => navigation.navigate('RegisterForm1')}
        />
      </ScrollView>

      <CustomAlert alert={alert} setAlert={setAlert} />
    </CustomScreenContainer>
  );
};
