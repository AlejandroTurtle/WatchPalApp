import {Colors, dynamicSize} from '@/src/config';
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {CustomText} from '../CustomText';
import {CustomMaterialIcon} from '@/src/libs/MaterialCommunityIcons';

type props = {
  title?: string;
  icon?: string;
  onPress: () => void;
  backgroundColor?: string;
  color?: string;
  mv?: number;
  isLoading?: boolean;
  width?: number;
  alignItems?: 'center' | 'flex-start' | 'flex-end';
};

export const CustomButton = ({
  title,
  icon,
  onPress,
  backgroundColor,
  color,
  isLoading,
  mv,
  width,
  alignItems = 'center',
}: props): React.JSX.Element => {
  const styles = StyleSheet.create({
    container: {
      justifyContent: 'flex-end',
      alignItems,
      marginVertical: mv ? mv : 0,
    },
    containerTexts: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    Passable: {
      justifyContent: 'center',
      borderRadius: title ? dynamicSize(14) : dynamicSize(99999),
      height: dynamicSize(65),
      backgroundColor: backgroundColor || Colors.blue,
      minWidth: dynamicSize(50),
      paddingHorizontal: dynamicSize(15),
      width: width ? width : '100%',
    },
    titleText: {
      fontSize: dynamicSize(16),
      fontWeight: 'bold',
      color: color || Colors.white,
      fontFamily: 'Poppins-Medium',
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.Passable}
        testID={title}
        onPress={() => !isLoading && onPress()}>
        {!isLoading ? (
          <View style={styles.containerTexts}>
            {title && <CustomText style={styles.titleText}>{title}</CustomText>}
            {icon && (
              <CustomMaterialIcon
                style={{marginBottom: dynamicSize(-2)}}
                name={icon}
                color={Colors.gray200}
                size={dynamicSize(30)}
              />
            )}
          </View>
        ) : (
          <ActivityIndicator color={Colors.white} size={dynamicSize(25)} />
        )}
      </TouchableOpacity>
    </View>
  );
};
