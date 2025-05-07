/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useIndex} from './useIndex';
import {PropsScreen} from '@/src/types/Navigation';
import {Colors, dynamicSize} from '@/src/config';
import {CustomScreenContainer} from '@/src/components/CustomScreenContainer';
import {CustomHeader} from '@/src/components/CustomHeader';
import {CustomText} from '@/src/components/CustomText';
import CustomImagePicker from '@/src/components/CustomProfileImagePicker';
import {CustomInput} from '@/src/components/CustomInput';
import {CustomPicker} from '@/src/components/CustomPicker';
import {CustomTextWithNavigation} from '@/src/components/CustomTextWithNavigation';
import {CustomRadio} from '@/src/components/CustomRadio';
import {CustomButton} from '@/src/components/CustomButton';
import {CustomAlert} from '@/src/components/Alert';

export const RegisterForm1 = ({navigation, route}: PropsScreen) => {
  const {
    user,
    setUser,
    isLoading,
    alert,
    setAlert,
    createAccount,
    texts,
    errosLength,
    aceito,
    setAceito,
    setPhotoChanged,
  } = useIndex({navigation, route});

  const styles = StyleSheet.create({
    title: {
      fontSize: dynamicSize(30),
      color: Colors.white,
      fontWeight: 'bold',
      marginBottom: dynamicSize(5),
    },
    errorText: {
      color: 'red',
      fontSize: dynamicSize(14),
      marginVertical: dynamicSize(5),
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
        }}>
        <View style={{paddingVertical: dynamicSize(5)}}>
          <CustomText children="Vamos começar!" style={styles.title} />
          <CustomText children="Crie sua conta para continuar." />
        </View>
        <CustomImagePicker
          image={user?.foto}
          onImageSelected={uri => {
            setUser(prev => ({
              ...prev,
              foto: uri,
            }));
            setPhotoChanged(true);
          }}
          error={!user?.foto ? 'Selecione uma imagem' : undefined}
        />
        <CustomInput
          keyboardType="default"
          title={texts.inputname}
          keyName="nome"
          value={[user, setUser]}
          icon="user"
          max={50}
        />
        <CustomInput
          keyboardType="numeric"
          title={texts.inputphone}
          keyName="celular"
          mask="Celular"
          value={[user, setUser]}
          icon="phone"
        />

        <CustomInput
          keyboardType="email-address"
          title={texts.inputemail}
          keyName="email"
          value={[user, setUser]}
          icon="mail"
        />
        <CustomInput
          keyboardType="email-address"
          title={texts.inputconfirmemail}
          keyName="confirmarEmail"
          value={[user, setUser]}
          icon="mail"
        />
        <CustomInput
          keyboardType="default"
          title={texts.inputpassword}
          keyName="senha"
          value={[user, setUser]}
          icon="lock"
          secureTextEntry
        />
        <CustomInput
          keyboardType="default"
          title={texts.inputconfirmPassword}
          keyName="confirmarSenha"
          value={[user, setUser]}
          icon="lock"
          secureTextEntry
        />
        <CustomTextWithNavigation
          text={'Toque aqui para ler o termo de uso'}
          onPress={() => Linking.openURL('https://google.com.br')}
          customStyle={{
            alignItems: 'flex-start',
          }}
        />
        <CustomRadio
          aceito={aceito}
          text="Eu li e aceito"
          onToggle={setAceito}
        />
        {user.error?.aceito && (
          <Text style={styles.errorText}>{user.error.aceito}</Text>
        )}
        <CustomButton
          title={texts.button}
          isLoading={isLoading}
          onPress={createAccount}
          alignItems="flex-end"
          backgroundColor={errosLength > 0 ? Colors.black : Colors.purple}
          mv={5}
        />
      </ScrollView>
      <CustomAlert alert={alert} setAlert={setAlert} />
    </CustomScreenContainer>
  );
};
