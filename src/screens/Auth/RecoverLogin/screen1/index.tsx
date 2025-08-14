import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useIndex} from './useIndex';
import {CustomScreenContainer} from '@/src/components/CustomScreenContainer';
import {CustomHeader} from '@/src/components/CustomHeader';
import {CustomText} from '@/src/components/CustomText';
import {CustomInput} from '@/src/components/CustomInput';
import {PropsScreen} from '@/src/types/Navigation';
import {CustomButton} from '@/src/components/CustomButton';
import {Colors, dynamicSize, sizeScreen} from '@/src/config';
import TextNavigation from '@/src/components/TextNavigation';
import {CustomAlert} from '@/src/components/Alert';
import {useTheme} from '@react-navigation/native';

export const RecoverLogin1 = ({navigation, route}: PropsScreen) => {
  const {isLoading, alert, setAlert, control, handleSubmit, request, texts} =
    useIndex({
      navigation,
      route,
    });

  const {colors} = useTheme();

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
    },
    titleText: {
      fontSize: dynamicSize(24),
      fontFamily: 'Poppins-Bold',
      fontWeight: '400',
      textAlign: 'left',

      marginBottom: dynamicSize(10),
      color: colors.text,
    },
    subTitleText: {
      fontSize: dynamicSize(14),
      textAlign: 'left',
      color: Colors.white,
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
        <CustomInput
          label="E-mail"
          name="email"
          keyboardType="email-address"
          placeholder="Insira seu e-mail"
          control={control}
        />
        <CustomButton
          title={texts.button}
          isLoading={isLoading}
          onPress={handleSubmit(request)}
          alignItems="flex-end"
          mv={dynamicSize(30)}
        />
        <TextNavigation
          text1="Você lembrou a senha?"
          text2="Login"
          onPress={() => navigation.navigate('Login')}
        />
      </ScrollView>
      <CustomAlert alert={alert} setAlert={setAlert} />
    </CustomScreenContainer>
  );
};
