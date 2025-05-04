import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';
import {LoadingScreen} from './Extends/LoadingScreen';
import {dynamicSize, sizeScreen} from '@/src/config';

type props = {
  children: React.ReactNode;
  loading?: boolean;
  style?: ViewProps['style'];
  mensagemLoading?: string;
};

export const CustomScreenContainer = ({
  children,
  loading = true,
  mensagemLoading = 'Carregando...',
  style,
}: props): React.JSX.Element => {
  const [keyboardHeight, setKeyboardHeight] = React.useState(0);

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        setKeyboardHeight(e.endCoordinates.height);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      e => {
        setKeyboardHeight(0);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return !loading ? (
    <LoadingScreen mensagem={mensagemLoading} />
  ) : (
    <View
      style={[
        styles.container,
        style,
        {
          maxHeight: sizeScreen.height,
          height: sizeScreen.height - keyboardHeight,
        },
      ]}>
      <KeyboardAvoidingView
        behavior={'padding'}
        style={{flex: 1}}
        keyboardVerticalOffset={keyboardHeight > 0 ? dynamicSize(30) : 0}>
        {children}
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: dynamicSize(10),
  },
});
