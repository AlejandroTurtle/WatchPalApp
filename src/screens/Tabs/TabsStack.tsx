import React from 'react';

import homeIcon from '@/assets/home.png';
import ticket from '@/assets/ticket.png';
import settings from '@/assets/settings.png';
import search from '@/assets/search.png';
import location from '@/assets/location.png';
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
      label: 'ínicio',
      icon: homeIcon,
      component: HomeStack,
    },

    {
      name: 'Procurar',
      label: 'Procurar',
      icon: search,
      component: SearchStack,
    },
    {
      name: 'Explorar',
      label: 'Explorar',
      icon: location,
      component: MapStack,
    },
    {
      name: 'Ingressos',
      label: 'Ingressos',
      icon: ticket,
      component: TicketsStack,
    },
    {
      name: 'Ajustes',
      label: 'Ajustes',
      icon: settings,
      component: SettingsStack,
    },
  ];
  return <CustomTabs tabs={tabs} />;
}
