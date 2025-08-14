import * as React from 'react';
import {Profile} from './Main';
import {CustomScreens} from '@/src/components/CustomScreens';
import {ChangePassword} from './ChangePassword';
import {Adjustments} from './Adjustments';

const screens = [
  {name: 'Profile', component: Profile},
  {name: 'Adjustments', component: Adjustments},
  {name: 'ChangePassword', component: ChangePassword},
];

export function SettingsStack() {
  return <CustomScreens screens={screens} />;
}
