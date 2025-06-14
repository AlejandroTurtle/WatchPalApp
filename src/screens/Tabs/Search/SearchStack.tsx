// In App.js in a new project

import * as React from 'react';
import {CustomScreens} from '@/src/components/CustomScreens';
import {Search} from './Main';

const screens = [{name: 'Search', component: Search}];

export function SearchStack() {
  return <CustomScreens screens={screens} />;
}
