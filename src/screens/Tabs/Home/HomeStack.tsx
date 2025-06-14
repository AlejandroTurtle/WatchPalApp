// In App.js in a new project

import * as React from 'react';
import {Home} from './Main';
import {CustomScreens} from '@/src/components/CustomScreens';
import {Details} from './Details';

const screens = [
  {name: 'Home', component: Home},
  {name: 'Details', component: Details},
];

export function HomeStack() {
  return <CustomScreens screens={screens} />;
}
