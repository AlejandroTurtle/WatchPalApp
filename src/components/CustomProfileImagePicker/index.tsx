// components/CustomImagePicker.tsx
import React from 'react';
import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  PERMISSIONS,
  request,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export type ImagePickerResult = {
  uri: string;
  fileName?: string;
  type?: string;
};

type Props = {
  image?: string | ImagePickerResult;
  onImageSelected: (image: ImagePickerResult) => void;
  error?: string;
};

const CustomImagePicker = ({image, onImageSelected, error}: Props) => {
  const handlePermission = async () => {
    if (Platform.OS === 'android') {
      const permission =
        Number(Platform.Version) >= 33
          ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
          : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;

      const result = await request(permission);
      return handlePermissionResult(result);
    }

    if (Platform.OS === 'ios') {
      const result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      return handlePermissionResult(result);
    }

    return true;
  };

  const handlePermissionResult = (result: string) => {
    switch (result) {
      case RESULTS.GRANTED:
        return true;
      case RESULTS.DENIED:
        Alert.alert(
          'Permissão necessária',
          'Precisamos acessar suas fotos para selecionar uma imagem',
        );
        return false;
      case RESULTS.BLOCKED:
        Alert.alert(
          'Permissão bloqueada',
          'Vá nas configurações do app para permitir o acesso às fotos',
          [
            {text: 'Cancelar', style: 'cancel'},
            {text: 'Abrir Configurações', onPress: () => openSettings()},
          ],
        );
        return false;
      default:
        return false;
    }
  };

  const selectImage = async () => {
    const hasPermission = await handlePermission();
    if (!hasPermission) {
      return;
    }

    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
      },
      response => {
        if (response.didCancel) {
          return;
        }
        if (response.errorCode) {
          Alert.alert('Erro', response.errorMessage || 'Erro desconhecido');
          return;
        }

        const asset = response.assets?.[0];
        if (!asset) {
          return;
        }

        onImageSelected({
          uri: asset.uri || '',
          fileName: asset.fileName,
          type: asset.type || 'image/jpeg',
        });
      },
    );
  };

  const imageUri = typeof image === 'string' ? image : image?.uri;

  return (
    <View style={styles.container}>
      {/* Wrapper para a imagem + ícone */}
      <View style={styles.imageWrapper}>
        <TouchableOpacity onPress={selectImage} style={styles.button}>
          {imageUri ? (
            <Image source={{uri: imageUri}} style={styles.image} />
          ) : (
            <View style={styles.placeholder}>
              <MaterialCommunityIcons
                name="camera-plus"
                size={32}
                color="#666"
              />
              <Text style={styles.placeholderText}>Adicionar foto</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Ícone edit posicionado parcialmente para fora */}
        {imageUri && (
          <View style={styles.editIconContainer}>
            <Feather name="edit-3" size={16} color="#fff" />
          </View>
        )}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 16,
  },
  imageWrapper: {
    width: 120,
    height: 120,
    position: 'relative', // para que o icon use como referência
  },
  button: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // mantém o recorte circular da imagem
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  placeholder: {
    alignItems: 'center',
    gap: 8,
  },
  placeholderText: {
    color: '#666',
    fontSize: 14,
  },
  errorText: {
    color: 'white',
    marginTop: 8,
    fontSize: 12,
  },
  editIconContainer: {
    position: 'absolute',
    bottom: -6,
    right: 10,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomImagePicker;
