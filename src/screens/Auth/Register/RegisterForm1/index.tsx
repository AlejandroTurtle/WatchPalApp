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
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {validarEmail} from '@/src/utils/Validators';
import {TextInput} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import {useTheme} from '@react-navigation/native';
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

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [confirmSecureTextEntry, setConfirmSecureTextEntry] = useState(true);

  const {colors} = useTheme();

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

  const SchemaValidation = yup.object({
    nome: yup.string().required('Nome é obrigatório'),
    celular: yup.string().required('Celular é obrigatório'),
    email: yup
      .string()
      .email('E‑mail inválido')
      .required('E‑mail é obrigatório')
      .test(
        'validar-email',
        'Preencha um e‑mail válido',
        value => !!value && validarEmail(value),
      ),
    confirmarEmail: yup
      .string()
      .email('E‑mail inválido')
      .required('Confirmação de e‑mail é obrigatória')
      .oneOf([yup.ref('email')], 'Os e‑mails não coincidem'),
    senha: yup
      .string()
      .min(6, 'Mínimo 6 caracteres')
      .required('Senha é obrigatória'),
    confirmarSenha: yup
      .string()
      .min(6, 'Mínimo 6 caracteres')
      .required('Confirmação de senha é obrigatória')
      .oneOf([yup.ref('senha')], 'As senhas não coincidem'),
  });

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm({
    defaultValues: {
      email: '',
      senha: '',
      nome: '',
      celular: '',
      confirmarEmail: '',
      confirmarSenha: '',
    },
    resolver: yupResolver(SchemaValidation),
  });

  return (
    <CustomScreenContainer>
      <CustomHeader />
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
      <CustomInput
        label="Confirmação de senha"
        name="confirmarSenha"
        placeholder="Confirmação de senha"
        control={control}
        secureTextEntry={confirmSecureTextEntry}
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
      {user.error?.aceito && (
        <Text style={styles.errorText}>{user.error.aceito}</Text>
      )}
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
