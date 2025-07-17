import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInput, TextInputProps} from 'react-native-paper';
import {Controller, Control} from 'react-hook-form';
import {Colors} from '../../config';
import {useTheme} from '@react-navigation/native';

interface PropsInput extends TextInputProps {
  label: string;
  name: string;
  control: Control<any>;
  placeholder?: string;
  right?: React.ReactNode;
  secureTextEntry?: boolean;
}

export const CustomInput = ({
  label,
  name,
  control,
  placeholder,
  right,
  secureTextEntry,
  ...rest
}: PropsInput) => {
  const {colors} = useTheme();

  return (
    <Controller
      control={control}
      name={name}
      render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
        <View style={styles.container}>
          <TextInput
            label={label}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            mode="outlined"
            secureTextEntry={secureTextEntry}
            right={right}
            error={!!error}
            placeholderTextColor={colors.text}
            placeholder={placeholder}
            theme={{
              colors: {
                primary: Colors.blue,
                background: colors.background,
                text: Colors.red,
                error: Colors.red,
                outline: error ? Colors.red : Colors.gray,
              },
              roundness: 12,
            }}
            {...rest}
          />
          {error && <Text style={styles.errorText}>{error.message}</Text>}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    width: '100%',
  },
  input: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  errorText: {
    color: Colors.red,
    marginTop: 4,
  },
});
