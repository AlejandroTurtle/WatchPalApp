/* eslint-disable react/no-unstable-nested-components */
import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';
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
import {validarEmail} from '@/src/utils/Validators';
import {useTheme} from '@react-navigation/native';
import {TextInput} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export const Login = ({navigation, route}: PropsScreen) => {
  const {
    control,
    handleSubmit,
    isLoading,
    alert,
    setAlert,
    texts,
    requestLogin,
  } = useIndex({
    navigation,
    route,
  });
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const {colors} = useTheme();

  const styles = StyleSheet.create({
    title: {
      fontSize: dynamicSize(38),
      color: colors.text,
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
      <Text children={'Realize\nseu login!'} style={styles.title} />

      <CustomInput
        label="E‑mail"
        name="email"
        keyboardType="email-address"
        placeholder="Digite seu e‑mail"
        control={control}
      />
      <CustomInput
        label="Senha"
        name="password"
        placeholder="Digite sua senha"
        control={control}
        secureTextEntry={secureTextEntry}
        right={
          <TextInput.Icon
            icon={() => (
              <Feather
                name={secureTextEntry ? 'eye-off' : 'eye'}
                size={20}
                color={colors.text}
              />
            )}
            onPress={() => setSecureTextEntry(!secureTextEntry)}
            forceTextInputFocus={false}
          />
        }
      />
      <CustomTextWithNavigation
        text={texts.linkforgot}
        customStyle={{
          alignItems: 'flex-end',
          color: colors.text,
          marginbottom: dynamicSize(50),
        }}
        onPress={() => {
          navigation.navigate('RecoverLogin1');
        }}
      />

      <CustomButton
        title={texts.button}
        isLoading={isLoading}
        onPress={handleSubmit(requestLogin)}
        alignItems="flex-end"
        mv={20}
      />
      <TextNavigation
        text1="Criar uma nova conta?"
        text2="Crie"
        onPress={() => navigation.navigate('RegisterForm1')}
      />
      <CustomAlert alert={alert} setAlert={setAlert} />
    </CustomScreenContainer>
  );
};
