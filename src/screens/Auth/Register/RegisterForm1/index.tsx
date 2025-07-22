/* eslint-disable react/no-unstable-nested-components */
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
import {TextInput} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import {useTheme} from '@react-navigation/native';
export const RegisterForm1 = ({navigation, route}: PropsScreen) => {
  const {
    isLoading,
    alert,
    setAlert,
    createAccount,
    texts,
    errosLength,
    aceito,
    setAceito,
    setPhotoChanged,
    setFoto,
    foto,
    aceitoError,
    control,
    handleSubmit,
  } = useIndex({navigation, route});

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [confirmSecureTextEntry, setConfirmSecureTextEntry] = useState(true);

  const {colors} = useTheme();

  const styles = StyleSheet.create({
    title: {
      fontSize: dynamicSize(30),
      color: colors.text,
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
      <View style={{paddingVertical: dynamicSize(5)}}>
        <CustomText children="Vamos começar!" style={styles.title} />
        <CustomText children="Crie sua conta para continuar." />
      </View>
      <CustomImagePicker
        image={foto}
        onImageSelected={asset => {
          setFoto({
            uri: asset.uri ?? '',
            fileName: asset.fileName,
            type: asset.type,
          });
          setPhotoChanged(true);
        }}
        error={!foto ? 'Selecione uma imagem' : undefined}
      />
      <CustomInput
        label="Nome"
        name="nome"
        placeholder="Digite seu nome"
        control={control}
        maxLength={50}
      />
      <CustomInput
        label="Celular"
        name="celular"
        placeholder="Digite seu celular"
        control={control}
        keyboardType="phone-pad"
        mask="phone"
        maxLength={15}
      />

      <CustomInput
        label="E‑mail"
        name="email"
        keyboardType="email-address"
        placeholder="Digite seu e‑mail"
        control={control}
      />
      <CustomInput
        label="Confirmação de e-mail"
        name="confirmarEmail"
        keyboardType="email-address"
        placeholder="Confirmação de e-mail"
        control={control}
      />
      <CustomInput
        label="Senha"
        name="senha"
        placeholder="Digite sua senha"
        autoCapitalize="none"
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
      <CustomInput
        label="Confirmação de senha"
        name="confirmarSenha"
        placeholder="Confirmação de senha"
        control={control}
        secureTextEntry={confirmSecureTextEntry}
        autoCapitalize="none"
        right={
          <TextInput.Icon
            icon={() => (
              <Feather
                name={confirmSecureTextEntry ? 'eye-off' : 'eye'}
                size={20}
                color={colors.text}
              />
            )}
            onPress={() => setConfirmSecureTextEntry(!confirmSecureTextEntry)}
            forceTextInputFocus={false}
          />
        }
      />
      <CustomTextWithNavigation
        text={'Toque aqui para ler o termo de uso'}
        onPress={() => Linking.openURL('https://google.com.br')}
        customStyle={{
          alignItems: 'flex-start',
        }}
      />
      <CustomRadio aceito={aceito} text="Eu li e aceito" onToggle={setAceito} />
      {aceitoError && <Text style={styles.errorText}>{aceitoError}</Text>}
      <CustomButton
        title={texts.button}
        isLoading={isLoading}
        onPress={handleSubmit(createAccount)}
        alignItems="flex-end"
        backgroundColor={errosLength > 0 ? Colors.black : Colors.purple}
        mv={5}
      />

      <CustomAlert alert={alert} setAlert={setAlert} />
    </CustomScreenContainer>
  );
};
