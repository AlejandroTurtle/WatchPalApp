import React from 'react';

import homeIcon from '@/assets/home.png';
import userIcon from '@/assets/user.png';
import heartIcon from '@/assets/heart.png';
import searchIcon from '@/assets/search.png';
import {CustomTabs, tabsType} from '@/src/libs/Navigation/TabsBar';

import {SettingsStack} from './Settings/SettingsStack';
import {HomeStack} from './Home/HomeStack';

import {FavoritesStack} from './Favorites/FavoritesStack';
import {SearchStack} from './Search/SearchStack';

export function Tabs() {
  const tabs: tabsType[] = [
    {
      name: 'Inicio',
      icon: homeIcon,
      component: HomeStack,
    },

    {
      name: 'Favoritos',
      icon: heartIcon,
      component: FavoritesStack,
    },
    {
      name: 'Buscar',
      icon: searchIcon,
      component: SearchStack,
    },
    {
      name: 'Ajustes',
      icon: userIcon,
      component: SettingsStack,
    },
  ];
  return <CustomTabs tabs={tabs} />;
}
