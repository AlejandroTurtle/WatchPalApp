// In App.js in a new project

import * as React from 'react';
import {Home} from './Main';
import {CustomScreens} from '@/src/components/CustomScreens';

const screens = [{name: 'Home', component: Home}];

export function HomeStack() {
    return <CustomScreens screens={screens} />;
}
