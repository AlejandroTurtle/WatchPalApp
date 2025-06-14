/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';

import {PropsScreen} from '@/src/types/Navigation';
import {useEffect} from 'react';
import {
  ActivityIndicator,
  Alert,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';
import {Logo} from '@/src/components/Logo';
import {Colors, dynamicSize} from '@/src/config';
import React from 'react';
import GetLocation, {Location} from 'react-native-get-location';
import {profileContext} from '../../context/profileContext';

export const Start = ({navigation}: PropsScreen) => {
  const {rememberUser, tokenVerify} = profileContext();

  const req = async () => {
    const validar = await tokenVerify();
    console.log('token verificado: ', validar);
    const profile = await rememberUser();
    console.log('profile: ', profile);
    if (validar && profile) {
      // console.log('profile -------: ', JSON.stringify(profile, null, 2));
      navigation.reset({
        index: 0,
        routes: [{name: 'Tabs'}],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: 'AuthStack'}],
      });
    }
  };

  useEffect(() => {
    req();
    requestNotificationPermission();
    // getCurrentLocation();
  }, []);

  // const requestLocationPermission = async (): Promise<string> => {
  //     if (Platform.OS === 'android') {
  //         const granted = await PermissionsAndroid.request(
  //             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //         );

  //         if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
  //             Alert.alert('Erro', 'Libre a permissão', [
  //                 {text: 'CANCELAR', onPress: () => {}},
  //                 {
  //                     text: 'ACESSE AS CONFIGURAÇÕES',
  //                     onPress: () => {
  //                         GetLocation.openSettings();
  //                     },
  //                 },
  //             ]);
  //         }
  //         return granted;
  //     } else {
  //         const granted = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
  //         if (granted === RESULTS.DENIED) {
  //             Alert.alert('Erro', 'Libre a permissão', [
  //                 {text: 'CANCELAR', onPress: () => {}},
  //                 {
  //                     text: 'ACESSE AS CONFIGURAÇÕES',
  //                     onPress: () => {
  //                         GetLocation.openSettings();
  //                     },
  //                 },
  //             ]);
  //         }
  //         if (granted !== RESULTS.GRANTED) {
  //             Alert.alert('Erro', 'Libre a permissão', [
  //                 {text: 'CANCELAR', onPress: () => {}},
  //                 {
  //                     text: 'ACESSE AS CONFIGURAÇÕES',
  //                     onPress: () => {
  //                         GetLocation.openSettings();
  //                     },
  //                 },
  //             ]);
  //         }
  //         return granted;
  //     }
  // };

  // // Função para obter a localização atual
  // const getCurrentLocation = async (): Promise<
  //     Location | {error: string}
  // > => {
  //     const hasPermission = await requestLocationPermission();

  //     if (hasPermission !== RESULTS.GRANTED) {
  //         return {
  //             error: 'Permissão de localização negada, libere a permissão para podermos encontrar outras pessoas',
  //         };
  //     }

  //     const location = await GetLocation.getCurrentPosition({
  //         enableHighAccuracy: true,
  //         timeout: 60000,
  //     });

  //     // //-----------------------------------------------
  //     // if (__DEV__) {
  //     //     location.latitude = -19.938065153126825;
  //     //     location.longitude = -43.90338937241653;
  //     // }
  //     // //-----------------------------------------------

  //     return location;
  // };

  const requestNotificationPermission = async () => {
    let authorizationStatus;
    let [deviceVersion] = DeviceInfo.getSystemVersion().split('.');
    if (Platform.OS === 'android') {
      try {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
      } catch (error) {
        console.log('error: ', error);
      }
    } else if (Platform.OS === 'ios' && Number(deviceVersion) >= 12) {
      authorizationStatus = await messaging().requestPermission({
        providesAppNotificationSettings: true,
      });
    } else {
      authorizationStatus = await messaging().requestPermission();
    }
  };

  const nextScreen = (name: string, params?: any) => {
    navigation.navigate(name, params);
  };

  return (
    <View style={styles.containerTitle}>
      <Logo />
      <ActivityIndicator color={Colors.blue} size={dynamicSize(60)} />
    </View>
  );
};

const styles = StyleSheet.create({
  containerTitle: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
