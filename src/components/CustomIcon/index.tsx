import React from 'react';
import {Image, ImageSourcePropType, View} from 'react-native';

type CustomIconProps = {
  iconSource: ImageSourcePropType;
  size?: number;
  color?: string;
};

const CustomIcon = ({
  iconSource,
  size = 24,
  color = 'green',
}: CustomIconProps) => {
  return (
    <View style={{width: size, height: size}}>
      <Image
        source={iconSource}
        style={{
          width: size,
          height: size,
          tintColor: color,
          resizeMode: 'contain',
        }}
        resizeMode="contain"
      />
    </View>
  );
};

export default CustomIcon;
