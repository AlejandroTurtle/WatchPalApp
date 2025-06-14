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
  gray100: string;
  blue: string;
};

export const Colors: props = {
  purple: '#7B28FF',
  black: '#000000',
  white: '#FFFFFF',
  background: '#242C3B',
  gray: '#7E848D',
  gray200: '#666666',
  gray100: '#A1A1A1',
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
  const px = Math.floor(number);
  return number;
};

export let byPass = true;
byPass = __DEV__ ? byPass : false;

export const baseUrl = 'https://api.themoviedb.org/3/';
export const theMovieKey =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNWE3MTU0ZDViOTY5OGMyZmQyYmNjODVjYjBiY2Y5NiIsIm5iZiI6MTc0NDE0OTM1My40NzQsInN1YiI6IjY3ZjU5YjY5MjQwZTY1OTk2ODk5NDM5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oQNvyXJr11EOpvQAJHOGUzD70FXy6SoxsliEcGPI8eU';
