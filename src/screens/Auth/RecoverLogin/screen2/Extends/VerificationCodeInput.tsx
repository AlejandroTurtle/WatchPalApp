import {Colors} from '@/src/config';
import React, {useRef, useState} from 'react';
import {TextInput, View, StyleSheet} from 'react-native';

interface VerificationCodeInputProps {
  length?: number;
  keyboardType?: 'default' | 'numeric';
  onComplete?: (code: string) => void;
}

const VerificationCodeInput: React.FC<VerificationCodeInputProps> = ({
  length = 4,
  onComplete,
  keyboardType,
}) => {
  const [code, setCode] = useState<string[]>(Array(length).fill(''));
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputsRef = useRef<TextInput[]>([]);

  const handleChange = (text: string, index: number) => {
    if (text.length > 1) {
      return;
    } // Apenas um número por input

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Se todos os campos forem preenchidos, chama a função onComplete
    const finalCode = newCode.join('');
    if (finalCode.length === length && onComplete) {
      onComplete(finalCode);
    }

    // Move para o próximo input
    if (text && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {code.map((digit, index) => (
        <TextInput
          key={index}
          ref={ref => (inputsRef.current[index] = ref!)}
          style={[
            styles.input,
            {
              borderColor:
                focusedIndex === index
                  ? Colors.blue
                  : digit
                  ? Colors.blue
                  : Colors.white,
            },
          ]}
          value={digit}
          onChangeText={text => handleChange(text, index)}
          onKeyPress={e => handleKeyPress(e, index)}
          keyboardType={keyboardType || 'default'}
          maxLength={1}
          autoFocus={index === 0}
          onFocus={() => {
            setFocusedIndex(index);
            inputsRef.current[index].setSelection(0, 1);
          }}
          onBlur={() => setFocusedIndex(null)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#f5f5f5',
  },
});

export default VerificationCodeInput;
