import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  DimensionValue,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import {Colors, dynamicSize} from '../../config';
import {formatCEP} from '../../utils/FormatarCEP';
import {FormatarCNPJ} from '../../utils/FormatarCNPJ';
import {formatCPF} from '../../utils/FormatarCPF';
import {FormatarNumero} from '../../utils/FormatarNumero';
import {maskCardNumber} from '../../utils/maskCardNumber';
import {maskExpirationDate} from '../../utils/maskExpirationDate';
import {formatCurrency} from '@/src/utils/formatCurrency';
import {formatAAMMYYYY} from '@/src/utils/formatNumberToDateString';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  title: string;
  keyName: string;
  value: [any, React.Dispatch<React.SetStateAction<any>>];
  borderColor?: string;
  width?: DimensionValue;
  secureTextEntry?: boolean;
  mask?:
    | 'Celular'
    | 'CPF'
    | 'cep'
    | 'numeroCartao'
    | 'expiraCartao'
    | 'CNPJ'
    | 'E-mail'
    | 'Aleatória'
    | 'dd/mm/yyyy';

  color?: string;
  icon?: string;
  clearButton?: boolean;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  ml?: number;
  max?: number;
  locked?: boolean;
  multiline?: boolean;
  autocapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  noShow?: boolean;
  uppercase?: boolean;
  materialIcon?: boolean;
  isCurrency?: boolean;
};

export const normalizeText = (str: string) => {
  try {
    return str
      .toLowerCase()
      .replace(/\s/g, '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  } catch (error) {
    return str;
  }
};

const makeMask = (
  value: string | number,
  mask?: string,
  isCurrency?: boolean,
) => {
  if (!value) {
    return;
  }
  if (isCurrency) {
    return formatCurrency(value);
  }
  const _function = {
    Celular: () => FormatarNumero(value.toString()),
    CPF: () => formatCPF(value),
    cep: () => formatCEP(value),
    numeroCartao: () => maskCardNumber(value),
    expiraCartao: () => maskExpirationDate(value),
    CNPJ: () => FormatarCNPJ(value),
    'dd/mm/yyyy': () => formatAAMMYYYY(value),
  };
  try {
    return _function[mask]();
  } catch (error) {
    return value;
  }
};

export const CustomInput = ({
  title,
  keyName,
  width = '100%',
  value,
  locked,
  secureTextEntry,
  mask,
  color,
  icon,
  clearButton,
  keyboardType,
  ml,
  max,
  multiline,
  autocapitalize,
  noShow,
  uppercase,
  materialIcon,
  isCurrency, // Nova propriedade
}: Props): React.ReactElement => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [inputValue, setInputValue] = value;
  const [isFocused, setIsFocused] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const placeholderAnim = useRef(
    new Animated.Value(inputValue?.[keyName] ? 1 : 0),
  ).current;

  useEffect(() => {
    Animated.timing(placeholderAnim, {
      toValue: isFocused || inputValue?.[keyName] ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, inputValue?.[keyName]]);

  useEffect(() => {
    if (inputValue?.error?.[keyName]) {
      setInputValue((prev: any) => ({
        ...prev,
        error: {...prev.error, [keyName]: undefined},
      }));
    }
  }, [inputValue?.[keyName]]);

  const lengthMax = {
    data: 10,
    cnpj: 18,
    telefone: 16,
    cep: 9,
    cpf: 14,
    numeroCartao: 19,
    expiraCartao: 5,
    'dd/mm/yyyy': 10,
  };

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      width,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerInput: {
      flex: 1,
      width,
      marginLeft: dynamicSize(ml || 0),

      borderWidth: 2,
      borderColor: inputValue?.error?.[keyName]
        ? 'red'
        : isFocused
        ? Colors.blue
        : Colors.white,

      borderRadius: dynamicSize(20),
      backgroundColor: Colors.white,
    },
    containerPassword: {paddingHorizontal: dynamicSize(10)},
    icon: {
      paddingHorizontal: dynamicSize(10),
      color: Colors.gray200,
    },
    input: {
      flex: 1,
      width: '100%',
      fontSize: dynamicSize(16),
      fontFamily: 'Poppins-Regular',
      color: color || Colors.black,
      height: multiline ? undefined : dynamicSize(60),
      minHeight: multiline ? dynamicSize(80) : undefined,
    },
    titleText: {
      marginBottom: dynamicSize(0),
      fontSize: dynamicSize(16),
      fontWeight: '400',
      textAlign: 'left',
      color: color || Colors.black,
      alignSelf: 'flex-start',
    },
    textError: {
      paddingLeft: dynamicSize(15),
      marginTop: dynamicSize(0),
      fontSize: dynamicSize(12),
      fontWeight: '400',
      textAlign: 'left',
      color: 'red',
      alignSelf: 'flex-start',
    },
    containerClose: {
      position: 'absolute',
    },
    close: {
      backgroundColor: Colors.gray,
      color: Colors.gray,
      borderRadius: dynamicSize(20),
    },
  });

  return (
    <View style={[styles.container]}>
      <View style={styles.containerInput}>
        <View style={[styles.inputContainer]}>
          {materialIcon ? (
            <MaterialCommunityIcons
              name={icon || (secureTextEntry ? 'lock' : 'keyboard')}
              color={Colors.black}
              size={dynamicSize(25)}
              style={[styles.icon]}
            />
          ) : (
            <Feather
              name={icon || (secureTextEntry ? 'lock' : 'keyboard')}
              color={Colors.black}
              size={dynamicSize(25)}
              style={[styles.icon]}
            />
          )}
          <Animated.Text
            style={[
              styles.titleText,
              {
                position: 'absolute',
                left: placeholderAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [dynamicSize(40), dynamicSize(30)],
                }),
                top: placeholderAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [dynamicSize(20), dynamicSize(0)],
                }),
                fontSize: placeholderAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [dynamicSize(16), dynamicSize(12)],
                }),
                color: placeholderAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [Colors.gray, Colors.blue],
                }),
              },
            ]}>
            {title}
          </Animated.Text>

          <TextInput
            testID={keyName}
            style={styles.input}
            maxLength={max || (mask ? lengthMax?.[mask] : undefined) || 255}
            placeholder={''}
            placeholderTextColor={Colors.gray200}
            onChangeText={text =>
              setInputValue((e: any) => ({
                ...e,
                [keyName]: makeMask(
                  uppercase ? text.toUpperCase() : text,
                  mask,
                  isCurrency,
                ),
              }))
            }
            keyboardType={keyboardType || 'default'}
            value={inputValue?.[keyName]?.toString() || ''}
            editable={locked === undefined || locked === false ? true : false}
            secureTextEntry={
              !showPassword && secureTextEntry ? secureTextEntry : false
            }
            multiline={multiline}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            autoCapitalize={autocapitalize}
          />
          {(locked || secureTextEntry) && !noShow && (
            <TouchableOpacity
              style={styles.containerPassword}
              onPress={togglePasswordVisibility}>
              <Feather
                name={locked ? 'lock' : showPassword ? 'eye-off' : 'eye'}
                color={Colors.gray200}
                size={dynamicSize(25)}
              />
            </TouchableOpacity>
          )}
          {clearButton && value && (
            <TouchableOpacity
              style={styles.containerClose}
              onPress={() =>
                setInputValue((e: any) => ({
                  ...e,
                  [keyName]: '',
                }))
              }>
              <Feather
                style={styles.close}
                name={'x'}
                color={Colors.blue}
                size={dynamicSize(25)}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Text style={styles.textError}>{inputValue?.error?.[keyName] || ''}</Text>
    </View>
  );
};
