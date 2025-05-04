// In App.js in a new project

import React from 'react';
import {Login} from './Login';

import {screenType} from '@/src/types/Navigation';
import {StartApp} from './StartApp';
import {RegisterForm1} from './Register/RegisterForm1';
import {ConfirmEmail} from './ConfirmEmail';
import {RecoverLogin1} from './RecoverLogin/screen1';
import {RecoverLogin2} from './RecoverLogin/screen2';
import {CustomScreens} from '@/src/components/CustomScreens';

export function AuthStack() {
  const tabs: screenType[] = [
    {
      name: 'StartApp',
      component: StartApp,
    },
    {
      name: 'Login',
      component: Login,
    },
    {
      name: 'RegisterForm1',
      component: RegisterForm1,
    },
    {
      name: 'ConfirmEmail',
      component: ConfirmEmail,
    },
    {
      name: 'RecoverLogin1',
      component: RecoverLogin1,
    },
    {
      name: 'RecoverLogin2',
      component: RecoverLogin2,
    },
  ];

  return <CustomScreens screens={tabs} />;
}
