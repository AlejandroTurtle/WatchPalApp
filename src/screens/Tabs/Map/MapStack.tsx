// In App.js in a new project

import * as React from 'react';

import {CustomScreens} from '@/src/components/CustomScreens';
import {MapEvents} from './Main';

const screens = [{name: 'MapEvents', component: MapEvents}];

export function MapStack() {
    return <CustomScreens screens={screens} />;
}
