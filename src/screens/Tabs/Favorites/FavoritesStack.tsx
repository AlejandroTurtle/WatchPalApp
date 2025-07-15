// In App.js in a new project

import * as React from 'react';
import {CustomScreens} from '@/src/components/CustomScreens';
import {Favorites} from './Main';
import {Details} from '../Home/Details';

const screens = [
  {name: 'Favorites', component: Favorites},
  {name: 'Details', component: Details},
];

export function FavoritesStack() {
  return <CustomScreens screens={screens} />;
}
