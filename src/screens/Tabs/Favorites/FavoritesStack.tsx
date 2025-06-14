// In App.js in a new project

import * as React from 'react';
import {CustomScreens} from '@/src/components/CustomScreens';
import {Favorites} from './Main';

const screens = [{name: 'Favorites', component: Favorites}];

export function FavoritesStack() {
  return <CustomScreens screens={screens} />;
}
