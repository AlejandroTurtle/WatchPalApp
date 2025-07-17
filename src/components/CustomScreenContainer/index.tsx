import React from 'react';
import {KeyboardAvoidingView, StyleSheet, View, ViewProps} from 'react-native';
import {LoadingScreen} from './Extends/LoadingScreen';
import {dynamicSize} from '@/src/config';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

type props = {
  children: React.ReactNode;
};

export const CustomScreenContainer = ({children}: props): React.JSX.Element => {
  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      keyboardShouldPersistTaps="handled"
      scrollEnabled={true}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 60,
        paddingHorizontal: dynamicSize(10),
      }}
      showsVerticalScrollIndicator={false}>
      {children}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: dynamicSize(10),
  },
});
