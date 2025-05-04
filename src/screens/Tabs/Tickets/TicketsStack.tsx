// In App.js in a new project

import * as React from 'react';

import {CustomScreens} from '@/src/components/CustomScreens';
import {TicketsEvents} from './Main';

const screens = [{name: 'TicketsEvents', component: TicketsEvents}];

export function TicketsStack() {
  return <CustomScreens screens={screens} />;
}
