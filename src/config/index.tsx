import {Dimensions} from 'react-native';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
console.log('width: ', width, 'height: ', height);

type props = {
  purple: string;
  black: string;
  white: string;
  background: string;
  gray: string;
  gray200: string;
  red: string;
  green: string;
  newgray: string;
  blue: string;
};

export const Colors: props = {
  purple: '#7B28FF',
  black: '#000000',
  white: '#FFFFFF',
  background: '#242C3B',
  gray: '#F2F4F5FF',
  gray200: '#666666',
  red: '#FF0000FF',
  green: '#1FBB0AFF',
  newgray: '#F2F4F5',
  blue: '#3C9EEA',
};

export const sizeScreen = {
  width,
  height,
};

export const dynamicSize = (number: number) => {
  const size = (width < height ? width : height) * (1 / 380);
  const px = Math.floor(size * number);
  return px;
};

export let byPass = true;
byPass = __DEV__ ? byPass : false;
