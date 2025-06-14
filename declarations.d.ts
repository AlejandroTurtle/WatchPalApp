declare module '*.png' {
  const value: any;
  export default value;
}

declare module '*.svg' {
  import React from 'react';
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module 'react-native-vector-icons/Feather' {
  import {ComponentType} from 'react';
  import {IconProps} from 'react-native-vector-icons/Icon';
  const Feather: ComponentType<IconProps>;
  export default Feather;
}

declare module 'react-native-vector-icons/EvilIcons' {
  import {ComponentType} from 'react';
  import {IconProps} from 'react-native-vector-icons/Icon';
  const EvilIcons: ComponentType<IconProps>;
  export default EvilIcons;
}

declare module 'react-native-vector-icons/FontAwesome' {
  import {ComponentType} from 'react';
  import {IconProps} from 'react-native-vector-icons/Icon';
  const EvilIcons: ComponentType<IconProps>;
  export default FontAwesome;
}
