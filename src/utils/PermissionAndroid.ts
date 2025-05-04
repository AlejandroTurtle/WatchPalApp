import {Alert, Linking, PermissionsAndroid} from 'react-native';
import DeviceInfo from 'react-native-device-info';

export async function PermissionAndroid(type: string) {
  let granted = 'granted';
  try {
    let [deviceVersion] = DeviceInfo.getSystemVersion().split('.');

    if (Number(deviceVersion) <= 13 && type === 'POST_NOTIFICATIONS') {
      return granted;
    } else {
      const permission = PermissionsAndroid.PERMISSIONS[type];
      try {
        granted = await PermissionsAndroid.request(permission);
        if (Number(deviceVersion) >= 13) {
          granted = PermissionsAndroid.RESULTS.GRANTED;
        }
      } catch (error) {
        granted = PermissionsAndroid.RESULTS.DENIED;
      }
    }

    if (granted !== 'granted') {
      Alert.alert(
        'Permissão está negada',
        'Você precisa autorizar o acesso. Deseja ir para as configurações do aplicativo?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
            onPress: () => {},
          },
          {
            text: 'Configurações',
            onPress: () => {
              Linking.openSettings();
            },
          },
        ],
        {cancelable: false},
      );
    }
  } catch (error) {
    console.error('error: PermissionStatus ', error);
  }
  return granted;
}
