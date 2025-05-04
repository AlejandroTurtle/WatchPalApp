import {Colors, dynamicSize} from '@/src/config';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import logo from '@/src/assets/logo.png';

type props = {
  text?: string;
  color?: string;
  fontSize?: number;
  noBack?: boolean;
  absolute?: boolean;
  backgroundColor?: string;
  backScreen?: boolean;
  onPress?: () => void;
};

export const CustomHeader = ({
  text,
  fontSize,
  color,
  noBack,
  absolute,
  backScreen,
  onPress,
}: props): React.JSX.Element => {
  const navigate = useNavigation();

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: dynamicSize(70),
      position: absolute ? 'absolute' : undefined,
      zIndex: absolute ? 1 : undefined,
    },
    containerBack: {
      width: dynamicSize(60),
      height: dynamicSize(50),
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    touchBack: {
      width: dynamicSize(40),
      height: dynamicSize(40),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.blue,
      borderRadius: dynamicSize(10),
      elevation: 10,
      shadowColor: Colors.black,
      shadowOpacity: 0.1,
      shadowOffset: {width: 0, height: dynamicSize(3)},
      shadowRadius: dynamicSize(6),
    },
    titleText: {
      fontWeight: '600',
      width: dynamicSize(240),
      fontFamily: 'Poppins-Medium',
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: dynamicSize(fontSize || 16),
      color: color || Colors.white,
    },
    containerImage: {
      width: dynamicSize(60),
      height: dynamicSize(50),
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    image: {
      width: dynamicSize(70),
      height: dynamicSize(70),
      resizeMode: 'contain',
    },
  });

  return (
    <View style={[styles.container]}>
      <View style={[styles.containerBack]}>
        {!noBack && !backScreen && (
          <TouchableOpacity
            onPress={() => navigate.goBack()}
            style={[styles.touchBack]}>
            <MaterialCommunityIcons
              name={'chevron-left'}
              color={Colors.white}
              size={dynamicSize(30)}
            />
          </TouchableOpacity>
        )}
        {backScreen && (
          <TouchableOpacity onPress={onPress} style={[styles.touchBack]}>
            <MaterialCommunityIcons
              name={'chevron-left'}
              color={Colors.white}
              size={dynamicSize(30)}
            />
          </TouchableOpacity>
        )}
      </View>
      <Text style={[styles.titleText]}>{text}</Text>
      <View style={[styles.containerImage]}>
        <Image style={styles.image} source={logo} />
      </View>
    </View>
  );
};
