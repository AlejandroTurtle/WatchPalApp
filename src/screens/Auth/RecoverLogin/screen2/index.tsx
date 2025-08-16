import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useIndex} from './useIndex';
import VerificationCodeInput from './Extends/VerificationCodeInput';

import {PropsScreen} from '@/src/types/Navigation';
import {CustomScreenContainer} from '@/src/components/CustomScreenContainer';
import {CustomHeader} from '@/src/components/CustomHeader';
import {CustomText} from '@/src/components/CustomText';
import {CustomInput} from '@/src/components/CustomInput';
import {CustomButton} from '@/src/components/CustomButton';
import {CustomTextWithNavigation} from '@/src/components/CustomTextWithNavigation';
import {Colors, dynamicSize, sizeScreen} from '@/src/config';
import {CustomAlert} from '@/src/components/Alert';
import {TextInput} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';

export const RecoverLogin2 = ({navigation, route}: PropsScreen) => {
  const {
    user,
    setUser,
    isLoading,
    alert,
    setAlert,
    control,
    handleSubmit,
    requestNewPassword,
    texts,
    secureTextEntry,
    setSecureTextEntry,
    resendCode,
    confirmSecureTextEntry,
    setConfirmSecureTextEntry,
  } = useIndex({
    navigation,
    route,
  });

  const handleVerificationCodeComplete = (code: string) => {
    setUser(prevUser => ({
      ...prevUser,
      codigo: code,
    }));
  };

  const styles = StyleSheet.create({
    containerImage: {
      alignSelf: 'center',
      height: sizeScreen.height * 0.5,
      width: sizeScreen.width,
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    containerTable: {
      position: 'absolute',
      top: 30,
      left: 0,
      right: 0,
      zIndex: 1,
    },
    containerCode: {
      padding: dynamicSize(30),
    },
    container: {
      justifyContent: 'center',
    },
    titleText: {
      fontSize: dynamicSize(24),
      fontFamily: 'Poppins-Bold',
      fontWeight: '400',
      textAlign: 'left',
      marginBottom: dynamicSize(10),
      color: Colors.white,
    },
    subTitleText: {
      fontSize: dynamicSize(14),
      textAlign: 'left',
      color: Colors.gray,
      fontFamily: 'Poppins-Medium',
      marginBottom: dynamicSize(10),
    },
  });

  return (
    <CustomScreenContainer>
      <CustomHeader text="" />
      <ScrollView
        style={{width: '100%'}}
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <View style={styles.container}>
          <CustomText style={styles.titleText}>{texts.title}</CustomText>
          <CustomText style={styles.subTitleText}>{texts.subtitle}</CustomText>
        </View>
        <View style={styles.containerCode}>
          <VerificationCodeInput
            length={6}
            keyboardType="numeric"
            onComplete={handleVerificationCodeComplete}
          />
        </View>
        <CustomInput
          label="Senha"
          name="senha"
          placeholder="Insira sua senha"
          right={
            <TextInput.Icon
              icon={() => (
                <Feather
                  name={secureTextEntry ? 'eye-off' : 'eye'}
                  size={20}
                  color={Colors.white}
                />
              )}
              onPress={() => setSecureTextEntry(!secureTextEntry)}
              forceTextInputFocus={false}
            />
          }
          control={control}
        />
        <CustomInput
          label="Confirmar Senha"
          name="confirmarSenha"
          placeholder="Confirme sua senha"
          secureTextEntry
          right={
            <TextInput.Icon
              icon={() => (
                <Feather
                  name={confirmSecureTextEntry ? 'eye-off' : 'eye'}
                  size={20}
                  color={Colors.white}
                />
              )}
              onPress={() => setConfirmSecureTextEntry(!confirmSecureTextEntry)}
              forceTextInputFocus={false}
            />
          }
          control={control}
        />
        <CustomButton
          title={texts.button}
          isLoading={isLoading}
          onPress={handleSubmit(requestNewPassword)}
          alignItems="flex-end"
          mv={20}
        />
        <CustomTextWithNavigation
          text={texts.linkremenberpwd}
          onPress={() =>
            navigation.reset({index: 0, routes: [{name: 'AuthStack'}]})
          }
        />
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Text
            style={{
              fontSize: dynamicSize(16),
              color: Colors.white,
              fontFamily: 'Poppins-Regular',
            }}>
            Ainda não recebeu o código?
          </Text>
          <Text
            style={{
              fontSize: dynamicSize(16),
              color: Colors.blue,
              fontFamily: 'Poppins-Regular',
            }}
            onPress={resendCode}>
            Clique aqui
          </Text>
        </View>
      </ScrollView>
      <CustomAlert alert={alert} setAlert={setAlert} />
    </CustomScreenContainer>
  );
};
