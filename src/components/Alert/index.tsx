import React, {Dispatch, SetStateAction} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors, dynamicSize} from '../../config';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
      backgroundColor: Colors.white,
      borderRadius: dynamicSize(20),
      padding: dynamicSize(20),
    },
    headerRow: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    closeButton: {
      width: dynamicSize(36),
      height: dynamicSize(36),
      borderRadius: dynamicSize(18),
      backgroundColor: Colors.gray,
      justifyContent: 'center',
      alignItems: 'center',
    },
    transparent: {
      width: dynamicSize(36),
      height: dynamicSize(36),
      borderRadius: dynamicSize(18),
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: dynamicSize(20),
      fontWeight: '600',
      textAlign: 'center',
      color: isSuccess ? Colors.green : isAviso ? Colors.red : Colors.purple,
    },
    iconContainer: {
      alignItems: 'center',
      marginVertical: dynamicSize(10),
    },
    message: {
      fontSize: dynamicSize(16),
      textAlign: 'center',
      marginTop: dynamicSize(10),
      color: Colors.gray200,
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      paddingHorizontal: dynamicSize(20),
      marginTop: dynamicSize(20),
      marginBottom: dynamicSize(10),
    },
    button: {
      flex: 1,
      borderRadius: dynamicSize(25),
      paddingVertical: dynamicSize(12),
      marginHorizontal: dynamicSize(5),
      justifyContent: 'center',
      alignItems: 'center',
    },
    cancelButton: {
      backgroundColor: Colors.purple,
    },
    confirmButton: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: Colors.purple,
    },
    buttonText: {fontSize: dynamicSize(13)},
    cancelText: {color: Colors.white},
    confirmText: {color: Colors.purple},
  });

  return (
    <Modal visible={!!alert.message} transparent animationType="fade">
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <TouchableOpacity style={styles.closeButton} onPress={handleCancel}>
              <EvilIcons
                name="close"
                size={dynamicSize(28)}
                color={Colors.black}
              />
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
                  size={dynamicSize(40)}
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
