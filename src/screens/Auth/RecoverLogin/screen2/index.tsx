/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {styles} from '../styles';
import {useIndex} from './useIndex';
import VerificationCodeInput from './Extends/VerificationCodeInput';

import {ThemeContext} from '@react-navigation/native';
import {PropsScreen} from '@/src/types/Navigation';
import {CustomScreenContainer} from '@/src/components/CustomScreenContainer';
import {CustomHeader} from '@/src/components/CustomHeader';
import {CustomText} from '@/src/components/CustomText';
import {CustomInput} from '@/src/components/CustomInput';
import {CustomButton} from '@/src/components/CustomButton';
import {CustomTextWithNavigation} from '@/src/components/CustomTextWithNavigation';
import {Colors, dynamicSize} from '@/src/config';
import {CustomAlert} from '@/src/components/Alert';

export const RecoverLogin2 = ({navigation, route}: PropsScreen) => {
  const {
    user,
    setUser,
    isLoading,
    alert,
    setAlert,
    nextScreen,
    texts,
    resendCode,
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
          title={texts.inputpassword}
          keyName="password"
          value={[user, setUser]}
          icon="lock"
          secureTextEntry
        />
        <CustomInput
          title={texts.inputconfirmpassword}
          keyName="confirmPassword"
          value={[user, setUser]}
          icon="lock"
          secureTextEntry
        />
        <CustomButton
          title={texts.button}
          isLoading={isLoading}
          onPress={nextScreen}
          alignItems="flex-end"
          mv={20}
        />
        <CustomTextWithNavigation
          text={texts.linkremenberpwd}
          onPress={() => navigation.navigate('Login')}
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
