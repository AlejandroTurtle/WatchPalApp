/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  View,
  TouchableOpacity,
  Keyboard,
  ImageSourcePropType,
} from 'react-native';

import {Colors, dynamicSize} from '@/src/config';
import CustomIcon from '@/src/components/CustomIcon';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export type tabsType = {
  name: string;
  icon: ImageSourcePropType;
  component: React.ComponentType<any>;
};

type Props = {
  tabs: tabsType[];
};

export function CustomTabs({tabs}: Props) {
  const ICON_SIZE = dynamicSize(24);
  const [keyboardVisible, setKeyboardVisible] = React.useState(false);

  const shouldHideTabBar = (route: any) => {
    const parent = route.name;
    const child = getFocusedRouteNameFromRoute(route) ?? '';

    const hide = parent !== 'HomeStack' && child === 'Search';
    return hide;
  };

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () =>
      setKeyboardVisible(true),
    );
    const hide = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardVisible(false),
    );
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false, // remove labels
        tabBarStyle: shouldHideTabBar(route)
          ? {display: 'none'}
          : {
              position: 'absolute',
              bottom: dynamicSize(20),
              left: dynamicSize(16),
              right: dynamicSize(16),
              height: dynamicSize(70),
              marginHorizontal: dynamicSize(30),
              borderTopWidth: 0,
              backgroundColor: Colors.background, // cor escura de fundo
              borderRadius: dynamicSize(30),
              elevation: 5,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 5},
              shadowOpacity: 0.1,
              shadowRadius: 5,
              display: keyboardVisible ? 'none' : 'flex',
            },
      })}>
      {tabs.map(tab => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarButton: props => (
              <TouchableOpacity
                {...props}
                activeOpacity={0.7}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            ),
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  width: dynamicSize(50),
                  height: dynamicSize(50),
                  borderRadius: dynamicSize(25),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CustomIcon
                  iconSource={tab.icon}
                  size={ICON_SIZE}
                  color={focused ? Colors.blue : Colors.gray200}
                />
              </View>
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
