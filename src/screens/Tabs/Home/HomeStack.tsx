// In App.js in a new project

import * as React from 'react';
import {Home} from './Main';
import {CustomScreens} from '@/src/components/CustomScreens';
import {Details} from './Details';
import {Search} from '../Search/Main';

const screens = [
  {name: 'Home', component: Home},
  {name: 'Details', component: Details},
  {name: 'Search', component: Search},
];

export function HomeStack() {
  return <CustomScreens screens={screens} />;
}
