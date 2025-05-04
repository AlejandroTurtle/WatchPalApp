import messaging from '@react-native-firebase/messaging';
import {useEffect} from 'react';
import {Alert, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';

export function usePushNotification() {
  useEffect(() => {
    (async () => {
      let [deviceVersion] = DeviceInfo.getSystemVersion().split('.');
      let authorizationStatus;
      if (Platform.OS === 'ios' && Number(deviceVersion) >= 12) {
        authorizationStatus = await messaging().requestPermission({
          providesAppNotificationSettings: true,
        });
      } else {
        authorizationStatus = await messaging().requestPermission();
      }
      if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
        console.log('User has notification permissions enabled.');
      } else if (
        authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
      ) {
        console.log('User has provisional notification permissions.');
      } else {
        console.log('User has notification permissions disabled');
      }
    })();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().setOpenSettingsForNotificationsHandler(
      async () => {
        // Set persistent value, using the MMKV package just as an example of how you might do it
        // MMKV.setBool(openSettingsForNotifications, true);
      },
    );
    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('chamou com o app aberto');
      console.log('Foreground Notification', JSON.stringify(remoteMessage));
      Alert.alert(
        String(remoteMessage.notification?.title),
        String(remoteMessage.notification?.body),
      );
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Background Notification', JSON.stringify(remoteMessage));
      Alert.alert(
        String(remoteMessage.notification?.title),
        String(remoteMessage.notification?.body),
      );
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().setBackgroundMessageHandler(
      async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
      },
    );
    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onTokenRefresh(token => {
      console.log('Refresh FCM Token:', token);
    });
    return unsubscribe;
  }, []);
}

export const getToken = async () => {
  const pushToken = await messaging().getToken();
  console.log('>>>>> pushToken: ', pushToken, '<<<<<');
  return pushToken;
};

export const deleteToken = async () => {
  console.log('Remove pushToken: ');
  return await messaging().deleteToken();
};
