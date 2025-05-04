// In App.js in a new project

import * as React from 'react';

import {CustomScreens} from '@/src/components/CustomScreens';
import {SearchEvents} from './Main';

const screens = [{name: 'SearchEvents', component: SearchEvents}];

export function SearchStack() {
  return <CustomScreens screens={screens} />;
}
