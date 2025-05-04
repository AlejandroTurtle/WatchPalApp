import {PermissionsAndroid, Platform} from 'react-native';

/**
 * Solicita permissão de localização no Android.
 * Retorna true se já havia permissão ou se for iOS/outros.
 * Caso negada, retorna false.
 */
export const requestLocationPermission = async (): Promise<boolean> => {
  if (Platform.OS !== 'android') {
    return true;
  }

  const alreadyGranted = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );
  if (alreadyGranted) {
    return true;
  }

  try {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    return result === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn('Erro ao solicitar permissão:', err);
    return false;
  }
};
