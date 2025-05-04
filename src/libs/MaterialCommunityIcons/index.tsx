import {Colors, dynamicSize} from '@/src/config';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';

type props = {
    name: string;
    color?: string;
    size?: number;
    style?: object;
};
export const CustomMaterialIcon = ({name, color, size, style}: props) => (
    <Feather
        name={name}
        color={color ? color : Colors.gray200}
        size={size ? dynamicSize(size) : 24}
        style={style ? style : undefined}
    />
);
