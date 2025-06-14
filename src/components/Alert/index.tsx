import React, {Dispatch, SetStateAction} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../config';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

export type Alert = {
  message: string;
  cancel?: boolean;
  buttonText?: string;
  buttonCancelText?: string;
  onPressCancel?: () => void;
  onPress?: () => void;
  title: 'Sucesso' | 'Alerta' | 'Aviso';
} | null;

type Props = {
  alert: Alert;
  setAlert: Dispatch<SetStateAction<Alert>>;
};

export const CustomAlert = ({alert, setAlert}: Props) => {
  const handleContinue = () => {
    setAlert(null);
    alert?.onPress?.();
  };
  const handleCancel = () => {
    alert?.onPressCancel?.();
    setAlert(null);
  };

  if (!alert) {
    return null;
  }

  const isSuccess = alert.title === 'Sucesso';
  const isAviso = alert.title === 'Aviso';
  const isAlerta = alert.title === 'Alerta';

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    card: {
      width: '90%',
      backgroundColor: Colors.background,
      borderRadius: 20,
      padding: 20,
    },
    headerRow: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    closeButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: Colors.blue,
      justifyContent: 'center',
      alignItems: 'center',
    },
    transparent: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: '600',
      textAlign: 'center',
      color: isSuccess ? Colors.green : isAviso ? Colors.red : Colors.blue,
    },
    iconContainer: {
      alignItems: 'center',
      marginVertical: 10,
    },
    message: {
      fontSize: 16,
      textAlign: 'center',
      marginTop: 10,
      color: Colors.white,
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      paddingHorizontal: 20,
      marginTop: 20,
      marginBottom: 10,
    },
    button: {
      flex: 1,
      borderRadius: 25,
      paddingVertical: 12,
      marginHorizontal: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cancelButton: {
      backgroundColor: Colors.white,
    },
    confirmButton: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: Colors.blue,
    },
    buttonText: {fontSize: 13},
    cancelText: {color: Colors.white},
    confirmText: {color: Colors.blue},
  });

  return (
    <Modal visible={!!alert.message} transparent animationType="fade">
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <TouchableOpacity style={styles.closeButton} onPress={handleCancel}>
              <Feather name="x" size={28} color={Colors.white} />
            </TouchableOpacity>

            {(isSuccess || isAviso) && (
              <Text style={styles.title}>{alert.title}</Text>
            )}

            <View style={styles.transparent} />
          </View>

          {isAlerta && (
            <>
              <View style={styles.iconContainer}>
                <FontAwesome
                  name="exclamation-triangle"
                  size={40}
                  color={Colors.red}
                />
              </View>
              <Text style={[styles.title, {color: Colors.red}]}>
                {alert.title}
              </Text>
            </>
          )}

          <Text style={styles.message}>{alert.message}</Text>

          <View style={styles.buttonRow}>
            {alert.cancel && (
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleCancel}>
                <Text style={[styles.buttonText, styles.cancelText]}>
                  {alert.buttonCancelText || 'Cancelar'}
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={handleContinue}>
              <Text style={[styles.buttonText, styles.confirmText]}>
                {alert.buttonText || 'Continuar'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
