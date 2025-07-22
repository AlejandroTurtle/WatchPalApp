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
    const profile = await rememberUser();
    if (validar && profile) {
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
  }, []);

  const requestNotificationPermission = async () => {
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
