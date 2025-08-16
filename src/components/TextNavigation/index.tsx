import {Colors, dynamicSize} from '@/src/config';
import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';

interface TextNavigationProps {
  text1: string;
  text2: string;
  onPress: () => void;
}

const TextNavigation: React.FC<TextNavigationProps> = ({
  text1,
  text2,
  onPress,
}) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: dynamicSize(20),
      marginHorizontal: dynamicSize(20),
    },
    text: {
      fontSize: dynamicSize(16),
      color: Colors.white,
      fontFamily: 'Poppins-Regular',
    },
    link: {
      fontSize: dynamicSize(16),
      color: Colors.blue,
      fontFamily: 'Poppins-Regular',
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text1} </Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.link}>{text2}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TextNavigation;
