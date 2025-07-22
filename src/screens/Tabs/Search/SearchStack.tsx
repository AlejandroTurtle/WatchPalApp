// In App.js in a new project

import * as React from 'react';
import {CustomScreens} from '@/src/components/CustomScreens';
import {Search} from './Main';
import {Details} from '../Home/Details';

const screens = [
  {name: 'Search', component: Search},
  {name: 'Details', component: Details},
];

export function SearchStack() {
  return <CustomScreens screens={screens} />;
}
