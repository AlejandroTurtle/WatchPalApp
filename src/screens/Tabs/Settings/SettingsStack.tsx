// In App.js in a new project

import * as React from 'react';
import {Settings} from './Main';
import {CustomScreens} from '@/src/components/CustomScreens';
import {Profile} from './Profile';
import {ConfirmEmailProfile} from './Profile/Extends';
import {ChangePassword} from './ChangePassword';

const screens = [
  {name: 'Settings', component: Settings},
  {name: 'Profile', component: Profile},
  {name: 'ConfirmEmailProfile', component: ConfirmEmailProfile},
  {name: 'ChangePassword', component: ChangePassword},
];

export function SettingsStack() {
  return <CustomScreens screens={screens} />;
}
