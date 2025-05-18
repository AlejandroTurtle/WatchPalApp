import React from 'react';

import homeIcon from '@/assets/home.png';
import userIcon from '@/assets/user.png';
import heartIcon from '@/assets/heart.png';
import searchIcon from '@/assets/search.png';
import {CustomTabs, tabsType} from '@/src/libs/Navigation/TabsBar';
import {Home} from './Home/Main';
import {Settings} from './Settings/Main';
import {MapStack} from './Map/MapStack';
import {SettingsStack} from './Settings/SettingsStack';
import {HomeStack} from './Home/HomeStack';
import {SearchStack} from './SearchEvents/SearchStack';
import {TicketsStack} from './Tickets/TicketsStack';

export function Tabs() {
  const tabs: tabsType[] = [
    {
      name: 'Inicio',
      icon: homeIcon,
      component: HomeStack,
    },

    {
      name: 'Explorar',
      icon: heartIcon,
      component: MapStack,
    },
    {
      name: 'Ingressos',
      icon: searchIcon,
      component: TicketsStack,
    },
    {
      name: 'Ajustes',
      icon: userIcon,
      component: SettingsStack,
    },
  ];
  return <CustomTabs tabs={tabs} />;
}
